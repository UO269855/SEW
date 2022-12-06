"use strict";
class Geolocation {
  constructor() {
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
  }
  getPosicion(posicion) {
    this.longitud = posicion.coords.longitude;
    this.latitud = posicion.coords.latitude;
    this.altitud = posicion.coords.altitude;
    this.speed = posicion.coords.speed;
    this.heading = posicion.coords.heading;
  }
  mostrarDatos() {
    var datos = "";
    datos += "<ul><li>Longitud: " + this.longitud + " grados</li>";
    datos += "<li>Latitud: " + this.latitud + " grados</li>";
    datos += "<li>Altitud: " + this.altitude + " metros</li>";
    datos += "<li>Velocidad: " + this.speed + " grados</li>";
    datos += "<li>Dirección: " + this.heading + " metros</li></ul>";
    $("input:last").after(datos);
  }
}
var geo = new Geolocation();
