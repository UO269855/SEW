"use strict";
class Calculator {
  constructor() {
    this.screen = "";
    this.operand1 = 0;
    this.operand2 = "";
    this.lastOperand = "";
    this.memory = 0;

    document.addEventListener("keydown", this.addListener.bind(this));
  }

  addListener(event) {
    switch (event.key) {
      case "1":
        this.addNumber(1);
        break;
      case "2":
        this.addNumber(2);
        break;
      case "3":
        this.addNumber(3);
        break;
      case "4":
        this.addNumber(4);
        break;
      case "5":
        this.addNumber(5);
        break;
      case "6":
        this.addNumber(6);
        break;
      case "7":
        this.addNumber(7);
        break;
      case "8":
        this.addNumber(8);
        break;
      case "9":
        this.addNumber(9);
        break;
      case "0":
        this.addNumber(0);
        break;
      case "+":
        this.add();
        break;
      case "-":
        this.substract();
        break;
      case "*":
        this.multiply();
        break;
      case "/":
        this.divide();
        break;
      case "%":
        this.porcentaje();
        break;
      case ".":
        this.point();
        break;
      case "Enter":
        this.equals();
        break;
      case "=":
        this.equals();
        break;
      case "Backspace":
        this.ce();
        break;
      case "Delete":
        this.clearAll();
        break;
      case "m":
        this.masmenos();
        break;
      case "r":
        this.raiz();
        break;
      case "q":
        this.mplus();
        break;
      case "w":
        this.mminus();
        break;
      case "e":
        this.mrc();
        break;
      default:
        break;
    }
  }

  clearAll() {
    this.screen = "";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen.toString();
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
    if (!(this.lastOperand == "") && startindex > 0) {
      this.screen = this.screen.toString().substring(0, startindex + 1);
      this.operand2 = "";
    } else {
      this.screen = "";
      this.operand2 = "";
    }
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  changeSign() {
    try {
      this.screen = eval(
        document.querySelector('input[type="text"][title="Pantalla:"]').value +
          "*-1"
      ).toString();
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen.toString();
  }

  raiz() {
    try {
      this.screen = Math.sqrt(Number(eval(this.screen)));
      this.operand1 = this.screen;
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen.toString();
    } catch (err) {
      this.screen = "Error = " + err;
      alert(err);
    }

    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen.toString();
  }

  porcentaje() {
    var text =
      document.querySelector('input[type="text"][title="Pantalla:"]').value +
      "%";
    this.screen = text.toString();
    this.operand2 = this.operand2 + "%";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen.toString();
  }

  addNumber(number) {
    this.screen = this.screen.toString() + number;
    if (this.operand1 == this.operand2) {
      this.operand2 = "";
    }
    this.operand2 = this.operand2.toString() + number;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  multiply() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "*";
    this.lastOperand = "*";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  divide() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "/";
    this.lastOperand = "/";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  substract() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "-";
    this.lastOperand = "-";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  add() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "+";
    this.lastOperand = "+";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  mrc() {
    document.querySelector('input[type="text"][title="Pantalla:"]').value = "";
    this.addNumber(this.memory);
    if (this.lastOperand == "") {
      this.screen = document.querySelector(
        'input[type="text"][title="Pantalla:"]'
      ).value;
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
    var text = document.querySelector(
      'input[type="text"][title="Pantalla:"]'
    ).value;
    this.screen = this.screen + ".";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      text + ".";
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
            event.preventDefault();
            break;
        }
        this.screen = eval(operation);
        this.operand1 = Number(this.screen);
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      } else if (this.checkSelf()) {
        var result = eval(this.operand1 + this.lastOperand + this.operand2);
        this.operand1 = result;
        this.screen = result;
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
        this.screen = this.screen + this.lastOperand;
      } else if (this.screen.toString() === this.operand1.toString()) {
        if (this.lastOperand == "√") {
          var result = Math.pow(
            Number(this.operand1),
            1 / Number(this.operand2)
          );
          this.operand1 = result;
          this.screen = result;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
          this.screen = this.screen + this.lastOperand;
        } else if (this.lastOperand == "^") {
          var result = Math.pow(Number(this.operand1), Number(this.operand2));
          this.operand1 = result;
          this.screen = result;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
          this.screen = this.screen + this.lastOperand;
        } else {
          var result = eval(
            Number(this.operand1) + this.lastOperand + Number(this.operand2)
          );
          this.operand1 = result;
          this.screen = result;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
          this.screen = this.screen + this.lastOperand;
        }
      } else {
        console.log("Normal");
        var result = eval(this.screen);
        this.operand1 = result;
        this.screen = result;
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      }
    } catch (err) {
      this.screen = "";
      console.log(err);
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        "Syntax Error";
    }
  }

  checkSelf() {
    if (
      !isNaN(
        Number(
          this.screen.toString().substring(0, this.operand1.toString().length)
        )
      ) &&
      this.screen.toString().substring(this.operand1.toString().length) ==
        this.lastOperand
    ) {
      return true;
    } else {
      return false;
    }
  }
}

var calculator = new Calculator();
