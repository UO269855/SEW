"use strict";
class Calculator {
  constructor() {
    this.screen = "";
    this.memory = 0;
    this.pressed = false;
  }

  clearAll() {
    this.pressed = false;
    var text = "";
    this.screen = text;
    document.getElementById("resultado").value = this.screen.toString();
  }

  ce() {
    this.pressed = false;
    console.log();
    var text = this.screen.substring(0, this.screen.length - 1);
    this.screen = text;
    document.getElementById("resultado").value = this.screen.toString();
  }

  changeSign() {
    this.pressed = false;
    try {
      this.screen = eval(
        document.getElementById("resultado").value + "*-1"
      ).toString();
      document.getElementById("resultado").value = this.screen.toString();
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.getElementById("resultado").value = this.screen.toString();
  }

  raiz() {
    this.pressed = false;
    try {
      this.screen = Math.sqrt(
        eval(document.getElementById("resultado").value)
      ).toString();

      document.getElementById("resultado").value = this.screen.toString();
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.getElementById("resultado").value = this.screen.toString();
  }

  porcentaje() {
    this.pressed = false;
    var text = this.screen + "%";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  addNumber(number) {
    this.pressed = false;
    var text = this.screen + number;
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  multiply() {
    this.pressed = false;
    var text = this.screen + "*";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  divide() {
    this.pressed = false;
    var text = this.screen + "/";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  substract() {
    this.pressed = false;
    var text = this.screen + "-";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  add() {
    this.pressed = false;
    var text = this.screen + "+";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  mrc() {
    if (this.pressed) {
      this.memory = 0;
      this.screen = this.memory.toString();
      this.pressed = false;
    } else {
      this.screen = this.memory.toString();
      document.getElementById("resultado").value = this.memory.toString();
      this.pressed = true;
    }
  }

  mminus() {
    this.pressed = false;
    try {
      this.memory = eval(this.memory + "-" + this.screen);
      this.screen = this.memory.toString();
      document.getElementById("resultado").value = this.screen.toString();
    } catch (err) {
      this.screen = "Error = " + err;
      this.memory = 0;
    }

    this.screen = this.memory.toString();
  }

  mplus() {
    this.pressed = false;
    try {
      this.memory = eval(this.memory + "+" + this.screen);
      this.screen = this.memory.toString();
      document.getElementById("resultado").value = this.screen.toString();
    } catch (err) {
      this.screen = "Error = " + err;
      this.memory = 0;
    }

    this.screen = this.memory.toString();
  }

  point() {
    this.pressed = false;
    var text = this.screen + ".";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  equals() {
    this.pressed = false;
    try {
      this.screen = eval(document.getElementById("resultado").value).toString();
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.getElementById("resultado").value = this.screen.toString();
  }
}

class ScientificCalculator extends Calculator {}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "1":
      calculadora.addNumber(1);
      break;
    case "2":
      calculadora.addNumber(2);
      break;
    case "3":
      calculadora.addNumber(3);
      break;
    case "4":
      calculadora.addNumber(4);
      break;
    case "5":
      calculadora.addNumber(5);
      break;
    case "6":
      calculadora.addNumber(6);
      break;
    case "7":
      calculadora.addNumber(7);
      break;
    case "8":
      calculadora.addNumber(8);
      break;
    case "9":
      calculadora.addNumber(9);
      break;
    case "0":
      calculadora.addNumber(0);
      break;
    case "+":
      calculadora.add();
      break;
    case "-":
      calculadora.substract();
      break;
    case "*":
      calculadora.multiply();
      break;
    case "/":
      calculadora.divide();
      break;
    case "%":
      calculadora.porcentaje();
      break;
    case ".":
      calculadora.point();
      break;
    case "Enter":
      calculadora.equals();
      break;
    default:
      console.log(event.key);
      break;
  }
});

var scientificCalculator = new ScientificCalculator();
