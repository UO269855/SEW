"use strict";
class RPNCalculator {
  constructor() {
    this.screen = "";
    this.shiftPressed = false;
    this.values = [];
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
      this.values.push(Math.mod(op2, op1));
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
    } else {
      this.screen = "Syntax Error";
    }
  }

  point() {
    if (this.screen.toString() == "Syntax Error") {
      this.screen = "0";
    }
    this.screen = this.screen + number;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  enter() {
    this.values.push(Number(this.screen));
    this.screen = "";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
    this.printStack();
  }

  printStack() {
    var stackValues = "";
    for (var i = 0; i < this.values.length; i++) {
      stackValues = stackValues + "\n " + this.values[i];
    }
    document.querySelector('textarea[title="Stack"]').innerHTML = stackValues;
  }
}

class CaloriesCalculator extends RPNCalculator {
  constructor() {
    super();
  }

  pow2() {
    super.pow2();
  }

  pow10() {
    super.pow10();
  }

  sin() {
    super.sin();
  }

  cos() {
    super.cos();
  }

  tan() {
    super.tan();
  }

  log() {
    super.log();
  }

  mod() {
    super.mod();
  }

  shift() {
    super.shift();
  }

  sqrt() {
    super.sqrt();
  }

  ce() {
    super.ce();
  }

  del() {
    super.del();
  }

  divide() {
    super.divide();
  }

  addNumber(number) {
    super.addNumber(number);
  }

  multiply() {
    super.multiply();
  }

  substract() {
    super.substract();
  }

  add() {
    super.add();
  }

  changeSign() {
    super.changeSign();
  }

  point() {
    super.changeSign();
  }

  enter() {
    super.enter();
  }

  printStack() {
    super.printStack();
  }

  calculateIMC() {
    if (this.values.length >= 2) {
      var op1 = Number(this.values.pop());
      var op2 = Number(this.values.pop());
      var value = op2 / (op1 * 0.01) ** 2;
      this.values.push(value);
      this.printStack();
    } else {
      this.screen = "Syntax Error";
    }
  }
  comida(food) {
    var op2 = 1;
    console.log(food.toString());
    if (this.values.length >= 1) {
      switch (food.toString()) {
        case "arroz":
          op2 = 1.3;
          break;
        case "pollo":
          op2 = 1.95;
          break;
        case "pasta":
          op2 = 3.5;
          break;
        default:
          op2 = 1;
          break;
      }
      console.log(food.toString());
      var op1 = Number(this.values.pop());
      this.values.push(op1 * op2);
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

  calculoQuemar(exercise) {
    var op2 = 1;
    if (this.values.length >= 1) {
      switch (exercise) {
        case "correr":
          op2 = 9.2;
          break;
        case "caminar":
          op2 = 5;
          break;
        case "nadar":
          op2 = 8.3;
          break;
        default:
          op2 = 5;
          break;
      }
      var op1 = Number(this.values.pop());
      this.values.push(op1 * op2);
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

  calcularCalorias() {
    if (this.values.length >= 3) {
      var actividad = Number(this.values.pop());
      var peso = Number(this.values.pop());
      var altura = Number(this.values.pop());
      var result = peso * 24 * (altura / 100) * (1 + actividad / 10);
      this.values.push(Number(result));
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

var caloriesCalculator = new CaloriesCalculator();
