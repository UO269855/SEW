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
  }

  ce() {
    this.screen = this.screen.substring(0, this.screen.length - 1);
    document.getElementById("resultado").value = this.screen.toString();
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
    var text = this.screen + "%";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  addNumber(number) {
    var text = document.getElementById("resultado").value;
    if(this.lastOperand != ""){
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
    this.addNumber(this.memory);
  }

  mminus() {
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
    var text = this.screen + ".";
    this.screen = text.toString();
    document.getElementById("resultado").value = this.screen.toString();
  }

  equals() {
    try {
      var operation = this.operand1 + this.lastOperand + this.operand2;
      this.screen = eval(operation);
      this.operand1 = Number(this.screen);
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.getElementById("resultado").value = this.screen.toString();
  }
}

document.addEventListener("click", function(){    
      console.log("Screen:" + calculator.screen);
      console.log("Operand1:" + calculator.operand1);
      console.log("Operand2:" + calculator.operand2);});

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
