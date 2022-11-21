"use strict";
class RPNCalculator {
  constructor() {
    this.screen = "";
    this.shiftPressed = false;
    this.values = [];
  }

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
    document.getElementById("resultado").value = "";
  }

  root() {
    this.operand1 = Number(this.screen);
    this.screen = this.operand1 + "√";
    this.lastOperand = "√";
    document.getElementById("resultado").value = "";
  }

  sin() {
    if (this.shiftPressed) {
      this.operand1 = Math.asin(Number(this.screen) * Number(Math.PI / 180));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    } else if (!this.shiftPressed && this.hyperPressed) {
      this.operand1 = Math.sin(Number(this.screen) * Number(Math.PI / 180));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    }
  }

  cos() {
    if (this.shiftPressed) {
      this.operand1 = Math.acos(Number(this.screen) * Number(Math.PI / 180));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    } else if (!this.shiftPressed && this.hyperPressed) {
      this.operand1 = Math.cos(Number(this.screen) * Number(Math.PI / 180));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    }
  }

  tan() {
    if (this.shiftPressed) {
      this.operand1 = Math.atan(Number(this.screen) * Number(Math.PI / 180));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    } else if (!this.shiftPressed && this.hyperPressed) {
      this.operand1 = Math.tan(Number(this.screen) * Number(Math.PI / 180));
      this.screen = this.operand1;
      document.getElementById("resultado").value = this.screen;
    }
  }

  pow10() {
    this.operand1 = 10;
    this.operand2 = Math.pow(this.operand1, Number(this.screen));
    console.log(Math.pow(this.operand1, Number(this.screen)));
    this.screen = this.operand2;
    this.lastOperand = "^";
    document.getElementById("resultado").value = this.screen;
  }

  powe() {
    this.operand1 = Math.E;
    this.operand2 = Math.pow(operand1, Number(this.screen));
    this.screen = this.operand2;
    this.lastOperand = "^";
    document.getElementById("resultado").value = this.screen;
  }

  log() {
    this.operand2 = Math.log10(Number(this.screen));
    this.screen = this.operand2;
    this.operand1 = 10;
    document.getElementById("resultado").value = this.screen;
  }

  ln() {
    this.operand1 = Math.log(Number(this.screen));
    this.screen = this.operand1;
    document.getElementById("resultado").value = this.screen;
  }

  inverse() {
    this.operand1 = 1 - Number(this.screen);
    this.screen = this.operand1;
    document.getElementById("resultado").value = this.screen;
  }

  mod() {
    this.equals();
    this.operand1 = Number(this.screen);
    this.screen = this.operand1 + "%";
    this.lastOperand = "%";
    document.getElementById("resultado").value = "";
  }

  shift() {
    this.shiftPressed = !this.shiftPressed;
    var button;
    if (this.shiftPressed) {
      button = document.querySelector('input[type="button"][value*="sin"]');
      button.value = "asin";

      button = document.querySelector('input[type="button"][value*="cos"]');
      button.value = "acos";

      button = document.querySelector('input[type="button"][value*="tan"]');
      button.value = "atan";

    } else {
      var button = document.querySelector('input[type="button"][value*="sin"]');
      button.value = "sin";

      button = document.querySelector('input[type="button"][value*="cos"]');
      button.value = "cos";

      button = document.querySelector('input[type="button"][value*="tan"]');
      button.value = "tan";
    }
  }

  sqrt() {
    if(this.values.length >= 1){
      var op1 = Number(values.pop());
      this.screen = Math.sqrt(op1);
      this.values.push(Number(this.screen));
    }
    else {
      this.screen = "Syntax Error";
    }

    document.getElementById("resultado").value = this.screen.toString();
  }

  ce() {
    this.screen = "";
    document.getElementById("resultado").value = this.screen.toString();
  }

  del() {
    this.screen = this.screen.toString().substring(0, this.screen.length - 1);
    document.getElementById("resultado").value = this.screen;
  }

  divide() {
    if(this.values.length >=2){
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op1 / op2;
      this.values.push(value);
    }
    else {
      this.screen = "Syntax Error";
    }
  }

  addNumber(number) {
    if(this.screen.toString() == "Syntax Error"){
      this.screen = "";
    }
    this.screen = this.screen + number;
    document.getElementById("resultado").value = this.screen;
  }

  multiply() {
    if(this.values.length >=2){
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op1 * op2;
      this.values.push(value);
    }
    else {
      this.screen = "Syntax Error";
    }
  }

  substract() {
    if(this.values.length >=2){
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op1 - op2;
      this.values.push(value);
    }
    else {
      this.screen = "Syntax Error";
    }
  }

  changeSign() {
    if(this.values.length >=1){
      var op1 = Number(this.values.pop());
      var value = op1 * (-1);
      this.values.push(value);
    }
    else {
      this.screen = "Syntax Error";
    }
  }

  add() {
    if(this.values.length >=2){
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op1 - op2;
      this.values.push(value);
    }
    else {
      this.screen = "Syntax Error";
    }
  }

  point() {
    if(this.screen.toString() == "Syntax Error"){
      this.screen = "0";
    }
    this.screen = this.screen + number;
    document.getElementById("resultado").value = this.screen;
  }
}

document.addEventListener("click", function () {
  console.log("Screen:" + rpnCalculator.screen);
  console.log("Operand1:" + rpnCalculator.operand1);
  console.log("Operand2:" + rpnCalculator.operand2);
  console.log("Last Expression:" + rpnCalculator.lastOperand);
  console.log("Memory: [" + rpnCalculator.printMemory() + "]");
  console.log("");
});

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "1":
      rpnCalculator.addNumber(1);
      break;
    case "2":
      rpnCalculator.addNumber(2);
      break;
    case "3":
      rpnCalculator.addNumber(3);
      break;
    case "4":
      rpnCalculator.addNumber(4);
      break;
    case "5":
      rpnCalculator.addNumber(5);
      break;
    case "6":
      rpnCalculator.addNumber(6);
      break;
    case "7":
      rpnCalculator.addNumber(7);
      break;
    case "8":
      rpnCalculator.addNumber(8);
      break;
    case "9":
      rpnCalculator.addNumber(9);
      break;
    case "0":
      rpnCalculator.addNumber(0);
      break;
    case "+":
      rpnCalculator.add();
      break;
    case "-":
      rpnCalculator.substract();
      break;
    case "*":
      rpnCalculator.multiply();
      break;
    case "/":
      rpnCalculator.divide();
      break;
    case "%":
      rpnCalculator.porcentaje();
      break;
    case ".":
      rpnCalculator.point();
      break;
    case "Enter":
      rpnCalculator.equals();
      break;
    default:
      console.log(event.key);
      break;
  }
});

var rpnCalculator = new RPNCalculator();
