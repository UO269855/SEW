"use strict";
class Calculator {
  constructor() {
    this.screen = "";
    this.memory = 0;
    this.usingMemory = false;
  }

  clearAll() {
    this.usingMemory = false;
    this.screen = "";
    document.getElementById("resultado").value = this.screen.toString();
  }

  ce() {
    this.usingMemory = false;
    this.screen = this.screen.substring(0, this.screen.length - 1);
    document.getElementById("resultado").value = this.screen.toString();
  }

  changeSign() {
    this.usingMemory = false;
    try {
      this.screen = eval(
        document.getElementById("resultado").value + "*-1"
      ).toString();
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.getElementById("resultado").value = this.screen.toString();
  }

  raiz() {
    this.usingMemory = false;
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
    this.usingMemory = false;
    var text = this.screen + "%";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  addNumber(number) {
    this.usingMemory = false;
    var text = this.screen + number;
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  multiply() {
    this.usingMemory = false;
    var text = this.screen + "*";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  divide() {
    this.usingMemory = false;
    var text = this.screen + "/";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  substract() {
    this.usingMemory = false;
    var text = this.screen + "-";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  add() {
    this.usingMemory = false;
    var text = this.screen + "+";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  mrc() {
    if (this.usingMemory) {
      this.memory = 0;
      this.screen = this.memory.toString();
      this.usingMemory = false;
    } else {
      this.screen = this.memory.toString();
      document.getElementById("resultado").value = this.memory.toString();
      this.usingMemory = true;
    }
  }

  mminus() {
    this.usingMemory = false;
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
    this.usingMemory = false;
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
    this.usingMemory = false;
    var text = this.screen + ".";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  equals() {
    this.usingMemory = false;
    try {
      this.screen = eval(document.getElementById("resultado").value).toString();
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.getElementById("resultado").value = this.screen.toString();
  }
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "1":
      calculator.addNumber(1);
      break;
    case "2":
      calculator.addNumber(2);
      break;
    case "3":
      calculator.addNumber(3);
      break;
    case "4":
      calculator.addNumber(4);
      break;
    case "5":
      calculator.addNumber(5);
      break;
    case "6":
      calculator.addNumber(6);
      break;
    case "7":
      calculator.addNumber(7);
      break;
    case "8":
      calculator.addNumber(8);
      break;
    case "9":
      calculator.addNumber(9);
      break;
    case "0":
      calculator.addNumber(0);
      break;
    case "+":
      calculator.add();
      break;
    case "-":
      calculator.substract();
      break;
    case "*":
      calculator.multiply();
      break;
    case "/":
      calculator.divide();
      break;
    case "%":
      calculator.porcentaje();
      break;
    case ".":
      calculator.point();
      break;
    case "Enter":
      calculator.equals();
      break;
    default:
      console.log(event.key);
      break;
  }
});

var calculator = new Calculator();
