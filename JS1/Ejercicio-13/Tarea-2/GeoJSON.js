"use strict";
var mapa;
var markers = [];

class MapaDinamico {
  constructor() {}
  initMap() {
    var centre = { lat: 43.3672702, lng: -5.8502461 };
    mapa = new google.maps.Map($("main")[0], {
      zoom: 9,
      center: centre,
    });
  }
  leerArchivo(files) {
    var file = files[0];
    if (file.name.includes(".GeoJSON")) {
      var reader = new FileReader();

      reader.onload = function (event) {
        var geoJSON = JSON.parse(reader.result);
        $.each(geoJSON.features, function (i, json) {
          var coordinates = json.geometry.coordinates;
          for (var i = 0; i < coordinates.length; i++) {
            markers[i] = new google.maps.Marker({
              position: {
                lat: Number(coordinates[0]),
                lng: Number(coordinates[1]),
              },
              map: mapa,
            });
          }
        });
      };
      reader.readAsText(file);
    }
  }
}

var map = new MapaDinamico();
