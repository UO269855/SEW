"use strict";
function leerArchivo(files) {
  $("p").remove();
  $("pre").remove();
  $("h2").remove();
  $("footer").after("<p>Práctica JavaScript</p>");
  var stringDatos = "";
  for (var value = files.length - 1; value >= 0; value--) {
    var file = files[value];
    stringDatos = "<h2> Fichero número " + (value + 1) + "</h2>";
    stringDatos += "<p> Nombre del fichero: " + file.name + "</p>";
    stringDatos += "<p> Tamaño del fichero: " + file.size + " bytes</p>";
    stringDatos += "<p> Tipo del fichero: " + file.type + "</p>";
    stringDatos +=
      "<p> Última vez que se ha modificado el fichero: " +
      file.lastModifiedDate +
      "</p>";
    if (file.type.match(/text.*/) || file.type.match("application/json")) {
      stringDatos += "<p> Contenido del archivo: </p>";
      stringDatos += "<pre></pre>";
      $("input").after(stringDatos);
      var item = document.querySelector("pre");
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
    $("br").replaceWith("\n");
  };
  reader.readAsText(file);
}
