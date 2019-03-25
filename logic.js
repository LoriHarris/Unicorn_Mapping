var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

var circles = [];
var popUp = [];
function getColor(d) {
  return d < 1 ? '#ffffcc' :
         d < 2  ? '#ffeda0' :
         d < 3  ? '#fed976' :
         d < 4  ? '#feb24c' :
         d < 5   ? '#fd8d3c' :
         d < 6   ? '#fc4e2a' :
         d < 7   ? '#e31a1c' :
         d < 8   ? '#bd0026' :
                    '#800026';
}
d3.json(url, function(response) {
    
    createFeatures(response.features);
  });
  
  function createFeatures(earthquakeData) {
    console.log(earthquakeData);
    // console.log(response)
    for (var i = 0; i < earthquakeData.length; i++) {
      var geometry =earthquakeData[i].geometry;
      var properties = earthquakeData[i].properties;
      var magRadius = properties.mag;
   
      
      if (geometry) {
        popUp.push(
          L.circleMarker(([geometry.coordinates[1], geometry.coordinates[0]]))
          .bindPopup("<h3>" + magRadius + "<h3><h3>Capacity: " + properties.place + "<h3>")
        );
        circles.push(
          L.circle(([geometry.coordinates[1], geometry.coordinates[0]]), {
            stroke: false,
            fillOpacity: (properties.mag)*.2,
            color: "black",
            fillColor: getColor(properties.mag),
            radius: (properties.mag)*30000
        })
            .bindPopup("<h3>Magnitude: " + magRadius + "<h3><h3>Location: " + properties.place + "<h3>")
            .on('click'));    
    }
    
  }; 
// console.log(cityList);
var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});
var magnitude = L.featureGroup(circles);
var popUp1 = L.layerGroup(popUp);

var basemaps = {
  "Satellite Map" : satellite,
  "Dark Map" : darkmap
};
var overlaymaps = {
  "Magnitude Radius" : magnitude,
  // "Popup" : popUp1
};
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4,
  layers: [satellite, magnitude]
});var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        magRange = [0,1,2,3,4,5,6,7,8],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magRange.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(magRange[i] + 1) + '"></i> ' +
            magRange[i] + (magRange[i + 1] ? '&ndash;' + magRange[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);
L.control.layers(basemaps, overlaymaps, {
  collapsed: false
}).addTo(myMap)};

