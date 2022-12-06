"use strict";
var mapaDinamico = new Object();
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
          meteo(pos.lat, pos.lng);
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

function meteo(lat, lng) {
  $.ajax({
    dataType: "json",
    url:
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lng +
      "&units=metric&appid=a6a0ea487e4a8851950da54224c4539b",
    method: "GET",
    success: function (datos) {
      $("pre").text(JSON.stringify(datos, null, 2));
      $("main").after("<article></article>");
      $("article").append(
        "<h2>Datos meteorológicos de su ubicación actual</h2>"
      );
      var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
      stringDatos += "<li>Paí­s: " + datos.sys.country + "</li>";
      stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
      stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
      stringDatos +=
        "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
      stringDatos +=
        "<li>Temperatura máxima: " +
        datos.main.temp_max +
        " grados Celsius</li>";
      stringDatos +=
        "<li>Temperatura mínima: " +
        datos.main.temp_min +
        " grados Celsius</li>";
      stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
      stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
      stringDatos +=
        "<li>Amanece a las: " +
        new Date(datos.sys.sunrise * 1000).toLocaleTimeString() +
        "</li>";
      stringDatos +=
        "<li>Oscurece a las: " +
        new Date(datos.sys.sunset * 1000).toLocaleTimeString() +
        "</li>";
      stringDatos +=
        "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
      stringDatos +=
        "<li>Velocidad del viento: " +
        datos.wind.speed +
        " metros/segundo</li>";
      stringDatos +=
        "<li>Hora de la medida: " +
        new Date(datos.dt * 1000).toLocaleTimeString() +
        "</li>";
      stringDatos +=
        "<li>Fecha de la medida: " +
        new Date(datos.dt * 1000).toLocaleDateString() +
        "</li>";
      stringDatos +=
        "<li>Descripción: " + datos.weather[0].description + "</li>";
      stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
      stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
      var pictureUrl =
        "https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png";
      stringDatos += "<img src=" + pictureUrl + " alt='Icono del clima'/> ";
      $("article").append(stringDatos);
    },
    error: function () {
      $("h3").html(
        "Â¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
      );
      $("h4").remove();
      $("pre").remove();
      $("p").remove();
    },
  });
}
function handleLocationError(browserHasGeolocation, marcador, pos) {
  marcador = new google.maps.Marker({
    position: pos,
    map: mapa,
  });
  $("h2").after("<p>No se ha podido indicar su ubicación</p>");
}

var map = new MapaDinamico();
mapaDinamico.initMap = map.initMap;
