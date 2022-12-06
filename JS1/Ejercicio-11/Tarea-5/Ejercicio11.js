"use strict";
var mapa;

class MapaDinamico {
  constructor() {}
  initMap() {
    var centre = { lat: 43.3672702, lng: -5.8502461 };
    mapa = new google.maps.Map($("article")[0], {
      zoom: 9,
      center: centre,
    });
    var marcador = new google.maps.Marker({
      position: centre,
      map: mapa,
    });
    if (navigator.geolocation) {
      $("h2").after("<p>Se muestra en el mapa su localización actual</p>");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          marcador = new google.maps.Marker({
            position: pos,
            map: mapa,
          });
          mapa.setCenter(pos);
        },
        function () {
          handleLocationError(true, marcador, mapa.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, marcador, mapa.getCenter());
    }
  }
}
var map = new MapaDinamico();
