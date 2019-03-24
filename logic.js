var url = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

var circles = [];
var popUp = [];

d3.json(url, function(response) {
    
    createFeatures(response.features);
  });
  
  function createFeatures(earthquakeData) {
    console.log(earthquakeData);
    // console.log(response)
    for (var i = 0; i < earthquakeData.length; i++) {
      var geometry =earthquakeData[i].geometry;
      var properties = earthquakeData[i].properties;
      var magRadius = properties.mag
      console.log(magRadius)
      if (magRadius < 1){
        var magColor = "green"
      };
      if (magRadius >1 && magRadius<2){
        var magColor= "blue"
      };
      if (magRadius >2 && magRadius<3){
        var magColor= "purple"
      };
      if (magRadius >3 && magRadius<4){
        var magColor= "orange"
      };
      if (magRadius >5 && magRadius<4){
        var magColor= "red"
      };
      if (geometry) {
        circles.push(
          L.circle(([geometry.coordinates[1], geometry.coordinates[0]]), {
            stroke: false,
            fillOpacity: (properties.mag)*.2,
            color: "purple",
            fillColor: magColor,
            radius: (properties.mag)*50000
        }))
    }
    var mag_popUp = L.marker([geometry.coordinates[1], geometry.coordinates[0]])
    .bindPopup("<h3>" + magRadius + "<h3><h3>Capacity: " + properties.place + "<h3>");
    popUp.push(mag_popUp);
  }; 
console.log(popUp);
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});
var magnitude = L.layerGroup(circles);
var popUp1 = L.layerGroup(popUp);
var basemaps = {
  "Street Map" : streetmap,
  "Dark Map" : darkmap
};
var overlaymaps = {
  "Magnitude Radius" : magnitude,
  "Popup" : popUp1
};
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4,
  layers: [streetmap, popUp1, magnitude]
});
L.control.layers(basemaps, overlaymaps, {
  collapsed: false
}).addTo(myMap)};
