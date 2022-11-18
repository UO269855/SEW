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

class ScientificCalculator extends Calculator {
  constructor() {
    super();
  }

  deg() {}

  hyp() {}

  fe() {}

  mc() {}

  mr() {}

  mplus() {
    super.mplus();
  }

  mminus() {
    super.mminus();
  }

  ms() {}

  pow2() {
    this.operand1 = Math.pow(Number(this.screen), 2);
    this.screen = this.operand1;
    this.lastOperand = "^";
    this.operand2 = 2;
    document.getElementById("resultado").value = this.screen;
  }

  pow() {
    this.operand1 = Number(this.screen);
    this.screen = this.operand1 + "^";
    this.lastOperand = "^";
    document.getElementById("resultado").value = "^";
  }

  sin() {
    if (this.lastOperand == "shift") {
      this.operand1 = Math.asin(Number(this.screen));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    } else {
      this.operand1 = Math.sin(Number(this.screen));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    }
  }

  cos() {
    if (this.lastOperand == "shift") {
      this.operand1 = Math.acos(Number(this.screen));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    } else {
      this.operand1 = Math.cos(Number(this.screen));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    }
  }

  tan() {
    if (this.lastOperand == "shift") {
      this.operand1 = Math.atan(Number(this.screen));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    } else {
      this.operand1 = Math.tan(Number(this.screen));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    }
  }

  sqrt() {
    super.sqrt();
  }

  ce() {
    super.ce();
  }

  c() {
    super.clearAll();
  }

  del() {
    this.screen = this.screen.toString().substring(0, this.screen.length - 1);
    document.getElementById("resultado").value = this.screen;
  }

  divide() {
    super.divide();
  }

  pi() {
    super.addNumber(Math.PI);
  }

  addNumber(number) {
    super.addNumber(number);
  }

  multiply() {
    super.multiply();
  }

  fact() {
    var value = 1;
    for (var i = 1; i <= this.operand1; i++) {
      this.value * i;
    }
    this.operand1 = value;
    this.screen = this.operand1;
    document.getElementById("resultado").value = this.screen;
  }

  substract() {
    super.substract();
  }

  changeSign() {
    super.changeSign();
  }

  add() {
    super.add();
  }

  leftPar() {
    this.screen = this.screen + "(";
    document.getElementById("resultado").value = this.screen;
  }

  rightPar() {
    this.screen = this.screen + ")";
    document.getElementById("resultado").value = this.screen;
  }

  point() {
    super.point();
  }

  equals() {
    super.equals();
  }
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "1":
      scientificCalculator.addNumber(1);
      break;
    case "2":
      scientificCalculator.addNumber(2);
      break;
    case "3":
      scientificCalculator.addNumber(3);
      break;
    case "4":
      scientificCalculator.addNumber(4);
      break;
    case "5":
      scientificCalculator.addNumber(5);
      break;
    case "6":
      scientificCalculator.addNumber(6);
      break;
    case "7":
      scientificCalculator.addNumber(7);
      break;
    case "8":
      scientificCalculator.addNumber(8);
      break;
    case "9":
      scientificCalculator.addNumber(9);
      break;
    case "0":
      scientificCalculator.addNumber(0);
      break;
    case "+":
      scientificCalculator.add();
      break;
    case "-":
      scientificCalculator.substract();
      break;
    case "*":
      scientificCalculator.multiply();
      break;
    case "/":
      scientificCalculator.divide();
      break;
    case "%":
      scientificCalculator.porcentaje();
      break;
    case ".":
      scientificCalculator.point();
      break;
    case "Enter":
      scientificCalculator.equals();
      break;
    default:
      console.log(event.key);
      break;
  }
});

var scientificCalculator = new ScientificCalculator();
