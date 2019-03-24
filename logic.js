var url = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";


 
  
  
  
   var circles = [];
  d3.json(url, function(response) {
    
    createFeatures(response.features);
  });
  
  function createFeatures(earthquakeData) {
    console.log(earthquakeData);
    // console.log(response)
  
   
  
    for (var i = 0; i < earthquakeData.length; i++) {
      var geometry =earthquakeData[i].geometry;
      var properties = earthquakeData[i].properties;
      
      if (geometry) {
        circles.push(
          L.circle(([geometry.coordinates[1], geometry.coordinates[0]]), {
            stroke: false,
            fillOpacity: (properties.mag)*.1,
            color: "purple",
            fillColor: "purple",
            radius: (properties.mag)*50000}).addTo(myMap));
        
      }
    }
  console.log(circles);
  
  }; 
  
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  
   
  
    for (var i = 0; i < earthquakeData.length; i++) {
      var geometry =earthquakeData[i].geometry;
      
      if (geometry) {
        circles.push(
          L.circle(([geometry.coordinates[1], geometry.coordinates[0]]), {}
            radius: (properties.mag)*1000)
        
      }
    }
  console.log(circles);
  
  };

  