"use strict";
function leerArchivo(files) {
  for (var value = 0; value < files.length; value++) {
    var file = files[value];

    if (file.type.match(/video.*/)) {
      var stringDatos =
        "<p> Fichero número " + (value + 1) + " Nombre: " + file.name + "</p>";
      stringDatos +=
        "<video controls> <source src='" +
        file.name +
        "' type='" +
        file.type +
        "' /></video>";
      $("main").append(stringDatos);
    } else if (file.type.match(/image.*/)) {
      var stringDatos =
        "<p> Fichero número " + (value + 1) + " Nombre: " + file.name + "</p>";
      stringDatos +=
        "<img alt='Foto " +
        (value + 1) +
        "-" +
        file.name +
        "' src='" +
        file.name +
        "' />";
      $("main").append(stringDatos);
    } else {
      $("input").after(stringDatos);
      stringDatos += "<p>Archivo no válido </p>";
    }
  }
}

function dropHandler(ev) {
  var files = [];
  ev.preventDefault();
  for (var i = 0; i < ev.dataTransfer.items.length; i++) {
    files[i] = ev.dataTransfer.items[i].getAsFile();
  }
  leerArchivo(files);
}

function dragOverHandler(ev) {
  ev.preventDefault();
}

document.onpaste = function (event) {
  var check = event.clipboardData.files;
  leerArchivo(check);
};
