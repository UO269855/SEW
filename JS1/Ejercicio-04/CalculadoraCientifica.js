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
    this.operand2 = this.operand1;
    this.screen = this.screen + "*";
    this.lastOperand = "*";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  divide() {
    this.operand2 = this.operand1;
    this.screen = this.screen + "/";
    this.lastOperand = "/";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  substract() {
    this.operand2 = this.operand1;
    this.screen = this.screen + "-";
    this.lastOperand = "-";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  add() {
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

class ScientificCalculator extends Calculator {
  constructor() {
    super();
    this.measure = "DEG";
    this.shiftPressed = false;
    this.hyperPressed = false;
    this.memory = 0;
  }

  swapMeasure() {
    var measureButton;
    if (this.measure == "DEG") {
      measureButton = document.querySelector(
        'input[type="button"][value*="DEG "]'
      );
      measureButton.value = "RAD ";
      this.measure = "RAD";
    } else if (this.measure == "RAD") {
      measureButton = document.querySelector(
        'input[type="button"][value*="RAD "]'
      );
      measureButton.value = "GRAD";
      this.measure = "GRAD";
    } else if (this.measure == "GRAD") {
      measureButton = document.querySelector(
        'input[type="button"][value*="GRAD"]'
      );
      measureButton.value = "DEG ";
      this.measure = "DEG";
    }
  }

  hyp() {
    this.hyperPressed = !this.hyperPressed;
    if (this.hyperPressed && !this.shiftPressed) {
      var button = document.querySelector('input[type="button"][value*=sin]');
      button.value = "sinh";

      var button = document.querySelector('input[type="button"][value*=cos]');
      button.value = "cosh";

      var button = document.querySelector('input[type="button"][value*=tan]');
      button.value = "tanh";
    } else if (this.hyperPressed && this.shiftPressed) {
      var button = document.querySelector('input[type="button"][value*=sin]');
      button.value = "asinh";

      var button = document.querySelector('input[type="button"][value*=cos]');
      button.value = "acosh";

      var button = document.querySelector('input[type="button"][value*=tan]');
      button.value = "atanh";
    } else if (!this.hyperPressed && this.shiftPressed) {
      var button = document.querySelector('input[type="button"][value*=sin]');
      button.value = "asin";

      var button = document.querySelector('input[type="button"][value*=cos]');
      button.value = "acos";

      var button = document.querySelector('input[type="button"][value*=tan]');
      button.value = "atan";
    } else {
      var button = document.querySelector('input[type="button"][value*=sin]');
      button.value = "sin";

      var button = document.querySelector('input[type="button"][value*=cos]');
      button.value = "cos";

      var button = document.querySelector('input[type="button"][value*=tan]');
      button.value = "tan";
    }
  }

  fe() {
    if (this.screen.toString().includes("e")) {
      this.screen = parseFloat(this.screen);
    } else {
      this.screen = parseFloat(this.screen).toExponential();
    }
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  mc() {
    this.memory = 0;
  }

  mr() {
    super.addNumber(this.memory);
  }

  mplus() {
    this.equals();
    this.memory = Number(this.memory) + Number(this.screen);
  }

  mminus() {
    this.equals();
    this.memory = Number(this.memory) - Number(this.screen);
  }

  ms() {
    this.equals();
    this.memory = Number(this.screen);
  }

  pow2() {
    if (!this.shiftPressed) {
      this.operand1 = Math.pow(Number(this.screen), 2);
      this.screen = this.operand1;
      this.lastOperand = "^";
      this.operand2 = 2;
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    } else {
      this.pow3();
    }
  }

  pow3() {
    this.operand1 = Math.pow(Number(this.screen), 3);
    this.screen = this.operand1;
    this.lastOperand = "^";
    this.operand2 = 2;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  pow() {
    if (!this.shiftPressed) {
      this.operand1 = Number(eval(this.screen));
      this.operand2 = this.operand1;
      this.screen = this.screen + "^";
      this.lastOperand = "^";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    } else {
      this.root();
    }
  }

  root() {
    this.operand1 = Number(eval(this.screen));
    this.operand2 = this.operand1;
    this.screen = this.screen + "√";
    this.lastOperand = "√";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  sin() {
    switch (this.measure) {
      case "DEG":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.asin(
            Number(this.screen) * Number(Math.PI / 180)
          );
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.sinh(
            Number(this.screen) * Number(Math.PI / 180)
          );
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.asinh(
            Number(this.screen) * Number(Math.PI / 180)
          );
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.sin(
            Number(Number(this.screen) * Number(Math.PI / 180))
          );
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      case "RAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.asin(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.sinh(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.asinh(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.sin(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      case "GRAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.asin(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.sinh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.asinh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.sin(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      default:
        break;
    }
  }

  cos() {
    switch (this.measure) {
      case "DEG":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.acos(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.cosh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.acosh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.cos(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      case "RAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.acos(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.cosh(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.acosh(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.cos(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      case "GRAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.acos(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.cosh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.acosh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.cos(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      default:
        break;
    }
  }

  tan() {
    switch (this.measure) {
      case "DEG":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.atan(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.tanh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.atanh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.tan(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      case "RAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.atan(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.tanh(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.atanh(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.tan(Number(this.screen));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      case "GRAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.atan(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.tanh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.atanh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        } else {
          this.operand1 = Math.tan(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.querySelector(
            'input[type="text"][title="Pantalla:"]'
          ).value = this.screen;
        }
        break;
      default:
        break;
    }
  }

  pow10() {
    if (!this.shiftPressed) {
      this.operand1 = 10;
      this.operand2 = Math.pow(this.operand1, Number(this.screen));
      console.log(Math.pow(this.operand1, Number(this.screen)));
      this.screen = this.operand2;
      this.lastOperand = "^";
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    } else {
      this.powe();
    }
  }

  powe() {
    this.operand1 = Math.E;
    this.operand2 = Math.pow(operand1, Number(this.screen));
    this.screen = this.operand2;
    this.lastOperand = "^";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  log() {
    if (!this.shiftPressed) {
      this.operand2 = Math.log10(Number(this.screen));
      this.screen = this.operand2;
      this.operand1 = 10;
      document.querySelector('input[type="text"][title="Pantalla:"]').value =
        this.screen;
    } else {
      this.ln;
    }
  }

  ln() {
    this.operand1 = Math.log(Number(this.screen));
    this.screen = this.operand1;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  inverse() {
    this.operand1 = 1 - Number(this.screen);
    this.screen = this.operand1;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  dms() {
    this.operand1 = Math.dms(Number(this.screen));
    this.screen = this.operand1;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  exp() {
    this.screen = this.screen + ",e+0";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  mod() {
    this.equals();
    this.operand1 = Number(this.screen);
    this.screen = this.operand1 + "%";
    this.lastOperand = "%";
    document.querySelector('input[type="text"][title="Pantalla:"]').value = "";
  }

  shift() {
    this.shiftPressed = !this.shiftPressed;
    var button;

    if (this.shiftPressed && !this.hyperPressed) {
      button = document.querySelector('input[type="button"][value*="sin"]');
      button.value = "asin";

      button = document.querySelector('input[type="button"][value*="cos"]');
      button.value = "acos";

      button = document.querySelector('input[type="button"][value*="tan"]');
      button.value = "atan";

      button = document.querySelector('input[type="button"][value="x^2"]');
      button.value = "x^3";

      button = document.querySelector('input[type="button"][value="x^y"]');
      button.value = "x√y";

      button = document.querySelector('input[type="button"][value="√"]');
      button.value = "1/x";

      button = document.querySelector('input[type="button"][value="10^x"]');
      button.value = "e^x";

      button = document.querySelector('input[type="button"][value="log"]');
      button.value = "ln";

      button = document.querySelector('input[type="button"][value="Exp"]');
      button.value = "dms";
    } else if (this.shiftPressed && this.hyperPressed) {
      var button = document.querySelector('input[type="button"][value="sinh"]');
      button.value = "asinh";

      button = document.querySelector('input[type="button"][value="cosh"]');
      button.value = "acosh";

      button = document.querySelector('input[type="button"][value="tanh"]');
      button.value = "atanh";
    } else if (!this.shiftPressed && this.hyperPressed) {
      button = document.querySelector('input[type="button"][value*="sin"]');
      button.value = "sinh";

      button = document.querySelector('input[type="button"][value*="cos"]');
      button.value = "cosh";

      button = document.querySelector('input[type="button"][value*="tan"]');
      button.value = "tanh";
    } else {
      var button = document.querySelector('input[type="button"][value*="sin"]');
      button.value = "sin";

      button = document.querySelector('input[type="button"][value="x^3"]');
      button.value = "x^2";

      button = document.querySelector('input[type="button"][value*="cos"]');
      button.value = "cos";

      button = document.querySelector('input[type="button"][value*="tan"]');
      button.value = "tan";

      button = document.querySelector('input[type="button"][value="x√y"]');
      button.value = "x^y";

      button = document.querySelector('input[type="button"][value="1/x"]');
      button.value = "√";

      button = document.querySelector('input[type="button"][value="e^x"]');
      button.value = "10^x";

      button = document.querySelector('input[type="button"][value="ln"]');
      button.value = "log";

      button = document.querySelector('input[type="button"][value="dms"]');
      button.value = "Exp";
    }
  }

  sqrt() {
    if (!this.shiftPressed) {
      super.raiz();
      this.lastOperand = "√";
      this.operand2 = Number(2);
    } else {
      this.inverse();
    }
  }

  ce() {
    super.ce();
  }

  c() {
    super.clearAll();
  }

  del() {
    this.screen = this.screen.toString().substring(0, this.screen.length - 1);
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
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
    var number = Number(eval(this.screen()));

    var value = 1;
    for (var i = 1; i <= number; i++) {
      value = Number(value) * Number(i);
    }
    this.operand1 = value;
    this.screen = this.operand1;
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
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
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  rightPar() {
    this.screen = this.screen + ")";
    document.querySelector('input[type="text"][title="Pantalla:"]').value =
      this.screen;
  }

  point() {
    super.point();
  }

  equals() {
    while (this.screen.toString().includes("^")) {
      var base = "";
      var exponente = "";
      for (var j = this.screen.indexOf("^") - 1; j >= 0; j--) {
        if (isNaN(Number(this.screen[j]))) {
          break;
        } else {
          base = this.screen[j] + base;
        }
      }
      for (var i = this.screen.indexOf("^") + 1; i < this.screen.length; i++) {
        if (isNaN(Number(this.screen[i]))) {
          break;
        } else {
          exponente = exponente + this.screen[i];
        }
      }

      var operation = Math.pow(Number(base), Number(exponente));
      var part1 = this.screen
        .toString()
        .substring(0, this.screen.indexOf("^") - base.length);
      var part2 = this.screen
        .toString()
        .substring(this.screen.indexOf("^") + 1 + exponente.length);
      this.screen = part1 + operation + part2;
    }

    while (this.screen.toString().includes("√")) {
      var base = "";
      var exponente = "";
      for (var j = this.screen.indexOf("√") - 1; j >= 0; j--) {
        if (isNaN(Number(this.screen[j]))) {
          break;
        } else {
          base = this.screen[j] + base;
        }
      }
      for (var i = this.screen.indexOf("√") + 1; i < this.screen.length; i++) {
        if (isNaN(Number(this.screen[i]))) {
          break;
        } else {
          exponente = exponente + this.screen[i];
        }
      }

      var operation = Math.pow(Number(base), 1 / Number(exponente));
      var part1 = this.screen
        .toString()
        .substring(0, this.screen.indexOf("√") - base.length);
      var part2 = this.screen
        .toString()
        .substring(this.screen.indexOf("√") + 1 + exponente.length);
      this.screen = part1 + operation + part2;
    }
    super.equals();
    //super.equals();
    // switch (this.lastOperand) {
    //   case "^":
    //     var value = Math.pow(Number(this.operand1), Number(this.operand2));
    //     this.screen = value;
    //     this.operand1 = value;
    //     document.querySelector('input[type="text"][title="Pantalla:"]').value = this.screen;
    //     break;
    //   case "√":
    //     var value = Math.pow(Number(this.operand1), 1 / Number(this.operand2));
    //     this.screen = value;
    //     this.operand1 = value;
    //     document.querySelector('input[type="text"][title="Pantalla:"]').value = this.screen;
    //     break;
    //   case "%":
    //     var value = Number(this.operand1) % Number(this.operand2);
    //     this.screen = Number(value);
    //     this.operand1 = value;
    //     document.querySelector('input[type="text"][title="Pantalla:"]').value = this.screen;
    //     break;
    //   default:
    //     break;
    // }
  }
}

document.addEventListener("click", function () {
  console.log("Screen:" + scientificCalculator.screen);
  console.log("Operand1:" + scientificCalculator.operand1);
  console.log("Operand2:" + scientificCalculator.operand2);
  console.log("Last Expression:" + scientificCalculator.lastOperand);
  console.log("");
});

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
