"use strict";
class Calculator {
  constructor() {
    this.screen = "";
    this.operand1 = 0;
    this.operand2 = 0;
    this.lastOperand = "";
    this.memory = 0;
  }

  clearAll() {
    this.screen = "";
    document.getElementById("resultado").value = this.screen.toString();
    this.screen = "";
    this.operand1 = 0;
    this.operand2 = 0;
    this.lastOperand = "";
  }

  ce() {
    if (!document.getElementById("resultado").value == "") {
      this.screen = this.screen
        .toString()
        .substring(
          0,
          this.screen.length -
            document.getElementById("resultado").value.toString().length
        );
      document.getElementById("resultado").value = "";
    }
  }

  changeSign() {
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
    var text = document.getElementById("resultado").value + "%";
    this.screen = text.toString();
    this.operand2 = text;
    document.getElementById("resultado").value = this.screen.toString();
  }

  addNumber(number) {
    var text = document.getElementById("resultado").value;
    if (this.lastOperand != "") {
      this.operand2 = Number(text + number);
    }
    this.screen = this.screen + number;
    document.getElementById("resultado").value = text + number;
  }

  multiply() {
    this.operand1 = Number(eval(this.screen));
    this.screen = this.operand1 + "*";
    this.lastOperand = "*";
    document.getElementById("resultado").value = "";
  }

  divide() {
    this.operand1 = Number(eval(this.screen));
    this.screen = this.operand1 + "/";
    this.lastOperand = "/";
    document.getElementById("resultado").value = "";
  }

  substract() {
    this.operand1 = Number(eval(this.screen));
    this.screen = this.operand1 + "-";
    this.lastOperand = "-";
    document.getElementById("resultado").value = "";
  }

  add() {
    this.operand1 = Number(eval(this.screen));
    this.screen = this.operand1 + "+";
    this.lastOperand = "+";
    document.getElementById("resultado").value = "";
  }

  mrc() {
    document.getElementById("resultado").value = "";
    this.addNumber(this.memory);
    if (this.lastOperand == "") {
      this.screen = document.getElementById("resultado").value;
    }
  }

  mminus() {
    try {
      this.memory = eval(this.memory + "-" + this.screen);
    } catch (err) {
      this.screen = "Error = " + err;
      this.memory = 0;
    }
  }

  mplus() {
    try {
      this.memory = eval(this.memory + "+" + this.screen);
    } catch (err) {
      this.screen = "Error = " + err;
      this.memory = 0;
    }
  }

  point() {
    var text = document.getElementById("resultado").value;
    this.screen = this.screen + ".";
    document.getElementById("resultado").value = text + ".";
  }

  equals() {
    try {
      if (this.operand2.toString().includes("%")) {
        switch (this.lastOperand) {
          case "*":
            var temp =
              (this.operand1 *
                this.operand2
                  .toString()
                  .substring(0, this.operand2.toString().length - 1)) /
              100;
            var operation = temp;
            break;
          case "/":
            var temp =
              (this.operand1 /
                this.operand2
                  .toString()
                  .substring(0, this.operand2.toString().length - 1)) *
              100;
            var operation = temp;
            break;
          default:
            var temp =
              (this.operand1 *
                this.operand2
                  .toString()
                  .substring(0, this.operand2.toString().length - 1)) /
              100;
            var operation = this.operand1 + this.lastOperand + temp;
            break;
        }
        this.screen = eval(operation);
      } else {
        var operation =
          Number(this.operand1) + this.lastOperand + Number(this.operand2);
      }
      if (this.lastOperand != "") {
        this.screen = eval(operation);
      }
      this.operand1 = Number(this.screen);
    } catch (err) {
      this.screen = "Syntax Error";
      alert(err);
    }
    document.getElementById("resultado").value = this.screen;
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
