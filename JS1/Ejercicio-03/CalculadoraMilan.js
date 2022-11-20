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
        Number(document.getElementById("resultado").value)
      );
      this.operand1 = this.screen;
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
            var operation =
              Number(this.operand1) *
              Number(
                this.operand2
                  .toString()
                  .substring(0, this.operand2.toString().length - 1) / 100
              );
            this.screen = operation;
            this.operand1 = Number(this.screen);
            break;
          case "/":
            var operation =
              Number(this.operand1) /
              Number(
                this.operand2
                  .toString()
                  .substring(0, this.operand2.toString().length - 1) / 100
              );
            this.screen = operation;
            this.operand1 = Number(this.screen);
            break;
          case "+":
            var value =
              Number(this.operand1) *
              Number(
                this.operand2
                  .toString()
                  .substring(0, this.operand2.toString().length - 1) / 100
              );

            var operation = Number(this.operand1) + value;
            this.screen = operation;
            this.operand1 = Number(this.screen);
            break;
          case "-":
            var value =
              Number(this.operand1) *
              Number(
                this.operand2
                  .toString()
                  .substring(0, this.operand2.toString().length - 1) / 100
              );

            var operation = Number(this.operand1) - value;
            this.screen = operation;
            this.operand1 = Number(this.screen);
            break;
          default:
            break;
        }
        this.screen = eval(operation);
        this.operand1 = Number(this.screen);
      } else {
        switch (this.lastOperand) {
          case "+":
            var operation = Number(this.operand1) + Number(this.operand2);
            this.screen = eval(operation);
            this.operand1 = Number(this.screen);
            break;
          case "-":
            var operation = Number(this.operand1) - Number(this.operand2);
            this.screen = eval(operation);
            this.operand1 = Number(this.screen);
            break;
          case "*":
            var operation = Number(this.operand1) * Number(this.operand2);
            this.screen = eval(operation);
            this.operand1 = Number(this.screen);
            break;
          case "/":
            var operation = Number(this.operand1) / Number(this.operand2);
            this.screen = eval(operation);
            this.operand1 = Number(this.screen);
            break;
          default:
            break;
        }
      }
    } catch (err) {
      this.screen = "Syntax Error";
      alert(err);
    }
    document.getElementById("resultado").value = this.screen;
  }
}

document.addEventListener("click", function () {
  console.log("Screen:" + calculator.screen);
  console.log("Operand1:" + calculator.operand1);
  console.log("Operand2:" + calculator.operand2);
  console.log("Last Expression:" + calculator.lastOperand);
  console.log("Memory:" + calculator.memory);
  console.log("");
});

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

  console.log("Screen:" + calculator.screen);
  console.log("Operand1:" + calculator.operand1);
  console.log("Operand2:" + calculator.operand2);
  console.log("Last Expression:" + calculator.lastOperand);
  console.log("Memory:" + calculator.memory);
  console.log("");
});

var calculator = new Calculator();
