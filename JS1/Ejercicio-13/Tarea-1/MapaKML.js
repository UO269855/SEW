"use strict";
var mapa;
var markers = [];

class MapaDinamico {
  constructor() {}
  initMap() {
    var centre = { lat: 43.3672702, lng: -5.8502461 };
    mapa = new google.maps.Map($("article")[0], {
      zoom: 9,
      center: centre,
    });
  }
  leerArchivo(files) {
    var file = files[0];
    if (file.name.includes(".kml")) {
      var reader = new FileReader();

      reader.onload = function (event) {
        var kml = $(reader.result);
        $("coordinates", kml).each(function () {
          var value = $(this).text();
          var coordinates = value.split("\n");
          for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i].split(",");
            markers[i] = new google.maps.Marker({
              position: {
                lat: Number(coordinate[1]),
                lng: Number(coordinate[0]),
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
