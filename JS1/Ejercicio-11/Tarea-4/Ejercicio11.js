"use strict";
var mapaOviedo;

class MapaDinamico {
  constructor() {}
  initMap() {
    var oviedo = { lat: 43.3672702, lng: -5.8502461 };
    mapaOviedo = new google.maps.Map($("main")[0], {
      zoom: 11,
      center: oviedo,
    });
    var marcador = new google.maps.Marker({
      position: oviedo,
      map: mapaOviedo,
    });
  }
}

var map = new MapaDinamico();
