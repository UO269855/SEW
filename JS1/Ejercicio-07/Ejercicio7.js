"use strict";
class Panel {
  constructor() {}
  ocultarElemento() {
    $("p").hide();
  }
  mostrarElemento() {
    $("p").show();
  }
  modificarElemento() {
    $("p").text("Se ha modificado el texto de todos los párrafos");
  }
  addElemento() {
    $("h3").after(
      "<h4> Se han añadido elementos h4 debajo de los elementos h3 </h4>"
    );
  }
  eliminarElemento() {
    $("h4").remove();
  }
  identificarElementos() {
    $("table").after("<article></article>");
    $("*", document.body).each(function () {
      var padre = $(this).parent().get(0).tagName;
      $("article").append(
        "<p> El elemento " +
          $(this).text() +
          " es del tipo " +
          $(this).get(0).tagName +
          " y su padre es del tipo " +
          padre.tagName +
          "<p>"
      );
    });
  }
  sumaTabla() {
    var rows = 0;
    var columns = 0;
    $("table tr").each(function () {
      rows = rows + 1;
    });
    $("table thead tr th").each(function () {
      columns = columns + 1;
    });
    $("table").after(
      "<p>La tabla tiene " +
        columns +
        " columnas, " +
        rows +
        " filas, y suman un total de " +
        (rows + columns) +
        " filas y columnas</p>"
    );
  }
}
var panel = new Panel();
