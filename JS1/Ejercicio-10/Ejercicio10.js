"use strict";

class PanelGas {
  constructor() {
    this.url = "";
  }

  createUrl() {
    var values = [];
    $("input", document.body).each(function () {
      var element = $(this).get(0);
      console.log(element.type);
      if (element.type.toString() == "text") {
        values.push($(this).get(0).value);
      }
    });
    var coin = values.pop();
    var date = values.pop();
    this.url =
      "https://commodities-api.com/api/" +
      date +
      "?access_key=1zzg3xowgsegelj0exlt6vlt45emw67s36ra14z58vuwujpklaw253wmexvx&base=" +
      coin +
      "&symbols=NG";
  }
  calculateGas() {
    this.createUrl();
    console.log(this.url);
    $.ajax({
      dataType: "json",
      url: this.url,
      method: "GET",
      success: function (datos) {
        $("pre").text(JSON.stringify(datos, null, 2));
        console.log(datos.date);
        var stringDatos =
          "<p>Para la fecha: " +
          datos.data.date +
          " el precio del gas natural por " +
          datos.data.unit.substring(4) +
          " es de " +
          datos.data.rates["NG"] +
          datos.data.base +
          "</p>";

        $("p").html(stringDatos);
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
}
var gas = new PanelGas();
