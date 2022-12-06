"use strict";
var mapa;

class MapaDinamico {
  constructor() {
    navigator.geolocation.getCurrentPosition(
      this.getPosicion.bind(this),
      this.getErrors.bind(this)
    );
  }
  initMap() {
    var centre = { lat: 43.3672702, lng: -5.8502461 };
    mapa = new google.maps.Map($("main")[0], {
      zoom: 9,
      center: centre,
    });
    var marcador = new google.maps.Marker();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          $("h2").after("<p>Se ha realizado correctamente la petición</p>");
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
      handleLocationError(false, marcador, mapa.getCenter());
    }
  }
  getErrors(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.mensaje = "El usuario no permite acceso a su ubicación";
        break;
      case error.POSITION_UNAVAILABLE:
        this.mensaje = "La posición del usuario no está disponible";
        break;
      case error.TIMEOUT:
        this.mensaje = "Ha caducado la petición de geolocalización";
        break;
      case error.UNKNOWN_ERROR:
        this.mensaje = "Se ha producido un error desconocido";
        break;
    }
    $("h2").after("<p>" + this.mensaje + "</p>");
  }
  getPosicion(posicion) {
    this.mensaje = "Se ha realizado correctamente la petición";
    this.longitud = posicion.coords.longitude;
    this.latitud = posicion.coords.latitude;
    this.altitud = posicion.coords.altitude;
    this.speed = posicion.coords.speed;
    this.heading = posicion.coords.heading;
  }
}

function handleLocationError(browserHasGeolocation, marcador, pos) {
  marcador = new google.maps.Marker({
    position: pos,
    map: mapa,
  });
  $("h2").after("<p>No se ha podido indicar su ubicación</p>");
}
var map = new MapaDinamico();
