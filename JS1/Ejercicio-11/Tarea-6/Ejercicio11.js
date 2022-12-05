"use strict";
var mapa;

class MapaDinamico {
  constructor() {}
  initMap() {
    var centre = { lat: 43.3672702, lng: -5.8502461 };
    mapa = new google.maps.Map(document.querySelector("section[name='map']"), {
      zoom: 9,
      center: centre,
    });
    var marcador = new google.maps.Marker();
    console.log("test");
    if (navigator.geolocation) {
      $("main").after("<p>Se muestra en el mapa su localizacion actual</p>");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          meteo(position.coords.latitude, position.coords.longitude);
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

function meteo(lat, lng) {
  console.log(this.url);
  $.ajax({
    dataType: "json",
    url:
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      { lat } +
      "&lon=" +
      { lng } +
      "&appid=a6a0ea487e4a8851950da54224c4539b",
    method: "GET",
    success: function (datos) {
      $("pre").text(JSON.stringify(datos, null, 2));

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
      stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li>";
      var pictureUrl =
        "https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png";
      stringDatos +=
        "<img src=" + pictureUrl + " alt='Icono del clima'/> </ul>";
      console.log(stringDatos);
      document.querySelector("aside").innerHTML(stringDatos);
    },
    error: function () {
      console.log("no va");
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
