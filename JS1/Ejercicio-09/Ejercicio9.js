"use strict";

class PanelMeteo {
  constructor() {
    this.url = "";
  }

  createUrl(city) {
    this.url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&mode=xml&units=metric&lang=es&APPID=a6a0ea487e4a8851950da54224c4539b";
  }
  meteo(desiredCity) {
    this.createUrl(desiredCity);
    console.log(this.url);
    $.ajax({
      dataType: "xml",
      url: this.url,
      method: "GET",
      success: function (datos) {
        var ciudad = $("city", datos).attr("name");
        var longitud = $("coord", datos).attr("lon");
        var latitud = $("coord", datos).attr("lat");
        var pais = $("country", datos).text();
        var amanecer = $("sun", datos).attr("rise");
        var minutosZonaHoraria = new Date().getTimezoneOffset();
        var amanecerMiliSeg1970 = Date.parse(amanecer);
        amanecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
        var amanecerLocal = new Date(amanecerMiliSeg1970).toLocaleTimeString(
          "es-ES"
        );
        var oscurecer = $("sun", datos).attr("set");
        var oscurecerMiliSeg1970 = Date.parse(oscurecer);
        oscurecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
        var oscurecerLocal = new Date(oscurecerMiliSeg1970).toLocaleTimeString(
          "es-ES"
        );
        var temperatura = $("temperature", datos).attr("value");
        var temperaturaMin = $("temperature", datos).attr("min");
        var temperaturaMax = $("temperature", datos).attr("max");
        var temperaturaUnit = $("temperature", datos).attr("unit");
        var humedad = $("humidity", datos).attr("value");
        var humedadUnit = $("humidity", datos).attr("unit");
        var presion = $("pressure", datos).attr("value");
        var presionUnit = $("pressure", datos).attr("unit");
        var velocidadViento = $("speed", datos).attr("value");
        var nombreViento = $("speed", datos).attr("name");
        var direccionViento = $("direction", datos).attr("value");
        var codigoViento = $("direction", datos).attr("code");
        var nombreDireccionViento = $("direction", datos).attr("name");
        var nubosidad = $("clouds", datos).attr("value");
        var nombreNubosidad = $("clouds", datos).attr("name");
        var visibilidad = $("visibility", datos).attr("value");
        var precipitacionValue = $("precipitation", datos).attr("value");
        var precipitacionMode = $("precipitation", datos).attr("mode");
        var descripcion = $("weather", datos).attr("value");
        var icon = $("weather", datos).attr("icon");
        var horaMedida = $("lastupdate", datos).attr("value");
        var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
        horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
        var horaMedidaLocal = new Date(
          horaMedidaMiliSeg1970
        ).toLocaleTimeString("es-ES");
        var fechaMedidaLocal = new Date(
          horaMedidaMiliSeg1970
        ).toLocaleDateString("es-ES");

        var stringDatos = "<ul>";
        stringDatos += "<li>Ciudad: " + ciudad + "</li>";
        stringDatos += "<li>Longitud: " + longitud + " grados</li>";
        stringDatos += "<li>Latitud: " + latitud + " grados</li>";
        stringDatos += "<li>PaÃ­s: " + pais + "</li>";
        stringDatos += "<li>Amanece a las: " + amanecerLocal + "</li>";
        stringDatos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
        stringDatos +=
          "<li>Temperatura: " + temperatura + " grados Celsius</li>";
        stringDatos +=
          "<li>Temperatura mÃ­nima: " + temperaturaMin + " grados Celsius</li>";
        stringDatos +=
          "<li>Temperatura mÃ¡xima: " + temperaturaMax + " grados Celsius</li>";
        stringDatos +=
          "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
        stringDatos += "<li>Humedad: " + humedad + " " + humedadUnit + "</li>";
        stringDatos += "<li>PresiÃ³n: " + presion + " " + presionUnit + "</li>";
        stringDatos +=
          "<li>Velocidad del viento: " +
          velocidadViento +
          " metros/segundo</li>";
        stringDatos += "<li>Nombre del viento: " + nombreViento + "</li>";
        stringDatos +=
          "<li>DirecciÃ³n del viento: " + direccionViento + " grados</li>";
        stringDatos += "<li>CÃ³digo del viento: " + codigoViento + "</li>";
        stringDatos +=
          "<li>Nombre del viento: " + nombreDireccionViento + "</li>";
        stringDatos += "<li>Nubosidad: " + nubosidad + "</li>";
        stringDatos += "<li>Nombre nubosidad: " + nombreNubosidad + "</li>";
        stringDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
        stringDatos +=
          "<li>PrecipitaciÃ³n valor: " + precipitacionValue + "</li>";
        stringDatos +=
          "<li>PrecipitaciÃ³n modo: " + precipitacionMode + "</li>";
        stringDatos += "<li>DescripciÃ³n: " + descripcion + "</li>";
        stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
        stringDatos +=
          "<li>Fecha de la medida: " + fechaMedidaLocal + "</li></ul>";
        var pictureUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        stringDatos += "<img src=" + pictureUrl + " alt='Icono del clima'/>";
        $("input:last").after(stringDatos);
      },
      error: function () {
        $("h3").html("No se puede obtener el JSON");
        $("h4").remove();
        $("h5").remove();
        $("p").remove();
      },
    });
  }
}
var panel = new PanelMeteo();
