"use strict";
class Calculator {
  constructor() {
    this.screen = "";
    this.operand1 = 0;
    this.operand2 = "";
    this.lastOperand = "";
    this.memory = 0;
  }

  clearAll() {
    this.screen = "";
    document.getElementById("resultado").value = this.screen.toString();
    this.screen = "";
    this.operand1 = 0;
    this.operand2 = "";
    this.lastOperand = "";
  }

  ce() {
    var startindex = 0;
    for (var i = this.screen.length - 1; i > 0; i--) {
      if (this.screen[i] == this.lastOperand) {
        startindex = i;
      }
    }
    if (!this.lastOperand == "" && startindex) {
      this.screen = this.screen.toString().substring(0, startindex + 1);
      this.operand2 = "";
    } else if (startindex) {
      this.screen = this.screen.toString().substring(0, startindex + 1);
      this.operand2 = "";
    } else {
      console.log("2");
      this.screen = "";
      this.operand2 = "";
    }
    document.getElementById("resultado").value = this.screen;
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
      this.screen = Math.sqrt(Number(eval(this.screen)));
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
    this.operand2 = this.operand2 + "%";
    document.getElementById("resultado").value = this.screen.toString();
  }

  addNumber(number) {
    this.screen = this.screen + number;
    if (this.operand1 == this.operand2) {
      this.operand2 = "";
    }
    this.operand2 = this.operand2.toString() + number;
    document.getElementById("resultado").value = this.screen;
  }

  multiply() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "*";
    this.lastOperand = "*";
    document.getElementById("resultado").value = this.screen;
  }

  divide() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "/";
    this.lastOperand = "/";
    document.getElementById("resultado").value = this.screen;
  }

  substract() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "-";
    this.lastOperand = "-";
    document.getElementById("resultado").value = this.screen;
  }

  add() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "+";
    this.lastOperand = "+";
    document.getElementById("resultado").value = this.screen;
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
        document.getElementById("resultado").value = this.screen;
      } else if (
        (Number(this.screen).toString() != NaN.toString() ||
          Number(this.screen[this.screen.length - 1]) != NaN.toString()) &&
        this.lastOperand != ""
      ) {
        console.log("fdsfsd");
        var result = eval(this.operand1 + this.lastOperand + this.operand2);
        this.operand1 = result;
        this.screen = result;
        document.getElementById("resultado").value = this.screen;
      } else {
        console.log("normal");
        var result = eval(this.screen);
        this.operand1 = result;
        this.screen = result;
        document.getElementById("resultado").value = this.screen;
      }
    } catch (err) {
      this.screen = "";
      document.getElementById("resultado").value = "Syntax Error";
    }
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
    case "=":
      calculator.equals();
      break;
    case "Backspace":
      calculator.ce();
      break;
    case "c":
      calculator.clearAll();
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
