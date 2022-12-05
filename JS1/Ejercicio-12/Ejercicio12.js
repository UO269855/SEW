"use strict";
function leerArchivo(files) {
  $("p").remove();
  $("pre").remove();
  $("h3").remove();
  $("footer").after("<p>Práctica JavaScript</p>");
  for (var value = files.length - 1; value >= 0; value--) {
    var file = files[value];

    var stringDatos = "";
    stringDatos += "<h3> Fichero número " + (value + 1) + "</h3>";
    stringDatos += "<p> Nombre del fichero: " + file.name + "</p>";
    stringDatos += "<p> Tamaño del fichero: " + file.size + " bytes</p>";
    stringDatos += "<p> Tipo del fichero: " + file.type + "</p>";
    stringDatos +=
      "<p> Última vez que se ha modificado el fichero: " +
      file.lastModifiedDate +
      "</p>";

    if (file.type.match(/text.*/) || file.type.match("application/json")) {
      stringDatos +=
        "<p name='file" + file.name + "'> Contenido del archivo: </p>";
      $("input").after(stringDatos);
      $("p[name='file" + file.name + "']").after(
        "<p name='file" + (value + 1) + "'></p>"
      );
      var item = document.querySelector("p[name='file" + (value + 1) + "']");
      printText(file, item);
    } else {
      $("input").after(stringDatos);
      stringDatos += "<p>Archivo no válido </p>";
    }
  }
}

function printText(file, item) {
  var reader = new FileReader();
  reader.onload = function (event) {
    item.innerText = reader.result;
  };
  reader.readAsText(file);
}
