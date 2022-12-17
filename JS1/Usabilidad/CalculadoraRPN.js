"use strict";
class RPNCalculator {
  constructor() {
    this.screen = "";
    this.shiftPressed = false;
    this.values = [];

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
      case ".":
        this.point();
        break;
      case "Enter":
        this.enter();
        break;
      case "Backspace":
        this.del();
        break;
      case "Delete":
        this.ce();
        break;
      case "Tab":
        this.shift();
        break;
      case "b":
        this.pow10();
        break;
      case "l":
        this.log();
        break;
      case "m":
        this.mod();
        break;
      case "s":
        this.sin();
        break;
      case "c":
        this.cos();
        break;
      case "t":
        this.tan();
        break;
      case "p":
        this.pow2();
        break;
      case "h":
        this.changeSign();
        break;
      default:
        break;
    }
  }

  pow2() {
    if (this.values.length >= 1) {
      var op1 = Number(this.values.pop());
      op1 = Math.pow(op1, 2);
      this.values.push(op1);
      this.screen = "";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
      this.printStack();
    } else {
      this.screen = "Syntax Error";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    }
  }

  pow10() {
    if (this.values.length >= 1) {
      var op1 = Number(this.values.pop());
      op1 = Math.pow(10, op1);
      this.values.push(op1);
      this.screen = "";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
      this.printStack();
    } else {
      this.screen = "Syntax Error";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    }
  }

  sin() {
    if (this.shiftPressed) {
      if (this.values.length >= 1) {
        var op1 = Number(this.values.pop());
        op1 = Math.asin(Number(op1) * Number(Math.PI / 180));
        this.values.push(op1);
        this.screen = "";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
        this.printStack();
      } else {
        this.screen = "Syntax Error";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      }
    } else if (!this.shiftPressed) {
      if (this.values.length >= 1) {
        var op1 = Number(this.values.pop());
        op1 = Math.sin(Number(op1) * Number(Math.PI / 180));
        this.values.push(op1);
        this.screen = "";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
        this.printStack();
      } else {
        this.screen = "Syntax Error";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      }
    }
  }

  cos() {
    if (this.shiftPressed) {
      if (this.values.length >= 1) {
        var op1 = Number(this.values.pop());
        op1 = Math.acos(Number(op1) * Number(Math.PI / 180));
        this.values.push(op1);
        this.screen = "";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
        this.printStack();
      } else {
        this.screen = "Syntax Error";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      }
    } else if (!this.shiftPressed) {
      if (this.values.length >= 1) {
        var op1 = Number(this.values.pop());
        op1 = Math.cos(Number(op1) * Number(Math.PI / 180));
        this.values.push(op1);
        this.screen = "";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
        this.printStack();
      } else {
        this.screen = "Syntax Error";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      }
    }
  }

  tan() {
    if (this.shiftPressed) {
      if (this.values.length >= 1) {
        var op1 = Number(this.values.pop());
        op1 = Math.atan(Number(op1) * Number(Math.PI / 180));
        this.values.push(op1);
        this.screen = "";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
        this.printStack();
      } else {
        this.screen = "Syntax Error";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      }
    } else if (!this.shiftPressed) {
      if (this.values.length >= 1) {
        var op1 = Number(this.values.pop());
        op1 = Math.tan(Number(op1) * Number(Math.PI / 180));
        this.values.push(op1);
        this.screen = "";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
        this.printStack();
      } else {
        this.screen = "Syntax Error";
        document.querySelector('input[type="text"][title="Pantalla:"]').value =
          this.screen;
      }
    }
  }

  log() {
    if (this.values.length >= 1) {
      var op1 = Number(this.values.pop());
      op1 = Math.log10(Number(op1));
      this.values.push(op1);
      this.screen = "";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
      this.printStack();
    } else {
      this.screen = "Syntax Error";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    }
  }

  mod() {
    if (this.values.length >= 2) {
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      this.values.push(op2 % op1);
      this.screen = "";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
      this.printStack();
    } else {
      this.screen = "Syntax Error";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    }
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
    if (this.values.length >= 1) {
      var op1 = Number(this.values.pop());
      this.values.push(Number(Math.sqrt(op1)));
      this.screen = "";

      this.printStack();
    } else {
      this.screen = "Syntax Error";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    }
  }

  ce() {
    this.screen = "";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen.toString();
    this.values = [];
    this.printStack();
  }

  del() {
    this.screen = this.screen.toString().substring(0, this.screen.length - 1);
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  divide() {
    if (this.values.length >= 2) {
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op2 / op1;
      this.values.push(value);
      this.printStack();
    } else {
      this.screen = "Syntax Error";
    }
  }

  addNumber(number) {
    if (this.screen.toString() == "Syntax Error") {
      this.screen = "";
    }
    this.screen = this.screen + number;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  multiply() {
    if (this.values.length >= 2) {
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op2 * op1;
      this.values.push(value);
      this.printStack();
    } else {
      this.screen = "Syntax Error";
    }
  }

  substract() {
    if (this.values.length >= 2) {
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op2 - op1;
      this.values.push(value);
      this.printStack();
    } else {
      this.screen = "Syntax Error";
    }
  }

  add() {
    if (this.values.length >= 2) {
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op2 + op1;
      this.values.push(value);
      this.printStack();
    } else {
      this.screen = "Syntax Error";
    }
  }

  changeSign() {
    if (this.values.length >= 1) {
      var op1 = Number(this.values.pop());
      var value = op1 * -1;
      this.values.push(value);
      this.printStack();
    } else {
      this.screen = "Syntax Error";
    }
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  point() {
    if (this.screen.toString() == "Syntax Error") {
      this.screen = "0";
    }
    this.screen = this.screen + ".";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  enter() {
    if (this.screen.length >= 1) {
      this.values.push(Number(this.screen));
      this.screen = "";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
      this.printStack();
    }
  }

  printStack() {
    var stackValues = "";
    for (var i = 0; i < this.values.length; i++) {
      stackValues = stackValues + "\n " + this.values[i];
    }
    document.querySelector('textarea[title="Stack"]').innerHTML = stackValues;
  }
}

var rpnCalculator = new RPNCalculator();
