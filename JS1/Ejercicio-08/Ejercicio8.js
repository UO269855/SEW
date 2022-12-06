"use strict";

class PanelMeteo {
  constructor() {
    this.url = "";
  }

  createUrl(city) {
    this.url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&lang=es&APPID=a6a0ea487e4a8851950da54224c4539b";
  }
  meteo(desiredCity) {
    this.createUrl(desiredCity);
    $("ul").remove();
    $("img").remove();
    $.ajax({
      dataType: "json",
      url: this.url,
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
        stringDatos +=
          "<li>Presión: " + datos.main.pressure + " milibares</li>";
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

        $("input:last").after(stringDatos);
      },
      error: function () {
        $("h3").html("No se puede obtener el JSON");
        $("h4").remove();
        $("p").remove();
      },
    });
  }
}
var panel = new PanelMeteo();
