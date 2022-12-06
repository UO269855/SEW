"use strict";
function leerArchivo(files) {
  for (var value = files.length - 1; value >= 0; value--) {
    var file = files[value];

    if (file.type.match(/video.*/)) {
      var stringDatos =
        "<p> Fichero número " + (value + 1) + " Nombre: " + file.name + "</p>";
      stringDatos +=
        "<video controls> <source src='" +
        file.name +
        "' type='video/mp4;' /></video>";
      $("article").after(stringDatos);
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
      $("article").after(stringDatos);
    } else {
      $("input").after(stringDatos);
      stringDatos += "<p>Archivo no válido </p>";
    }
  }
}

function textOver(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  $("p:first").hide();
}

function drop(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  leerArchivo(ev.dataTransfer.files);
}

document.onpaste = function (event) {
  var check = event.clipboardData.files;
  leerArchivo(check);
};
