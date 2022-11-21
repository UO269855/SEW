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
    if (!this.lastOperand == "" && startindex) {
      this.screen = this.screen.toString().substring(0, startindex + 1);
      this.operand2 = "";
    } else if (startindex) {
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
    this.screen = this.screen + number;
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
      break;
  }
});

var calculator = new Calculator();
