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

class ScientificCalculator extends Calculator {
  constructor() {
    super();
    this.measure = "DEG";
    this.shiftPressed = false;
    this.hyperPressed = false;
    this.memory = [];
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

  fe() {}

  mc() {
    this.memory = [];
  }

  mr() {
    super.addNumber(this.memory[this.memory.length - 1]);
  }

  mplus() {
    var value = this.memory.pop() + Number(this.screen);
    this.memory.push(value);
  }

  mminus() {
    var value = this.memory.pop() - Number(this.screen);
    this.memory.push(value);
  }

  ms() {
    this.memory.push(Number(this.screen));
  }

  pow2() {
    this.operand1 = Math.pow(Number(this.screen), 2);
    this.screen = this.operand1;
    this.lastOperand = "^";
    this.operand2 = 2;
    document.getElementById("resultado").value = this.screen;
  }

  pow3() {
    this.operand1 = Math.pow(Number(this.screen), 3);
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
    switch (this.measure) {
      case "DEG":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.asin(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.sinh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.asinh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.sin(
            Number(Number(this.screen) * Number(Math.PI / 180))
          );
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        }
        break;
      case "RAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.asin(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.sinh(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.asinh(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.sin(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        }
        break;
      case "GRAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.asin(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.sinh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.asinh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.sin(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
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
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.cosh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.acosh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.cos(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
          console.log("coseno");
        }
        break;
      case "RAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.acos(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.cosh(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.acosh(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.cos(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        }
        break;
      case "GRAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.acos(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.cosh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.acosh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.cos(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
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
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.tanh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.atanh(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.tan(Number(this.screen) * (Math.PI / 180));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        }
        break;
      case "RAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.atan(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.tanh(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.atanh(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.tan(Number(this.screen));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        }
        break;
      case "GRAD":
        if (this.shiftPressed && !this.hyperPressed) {
          this.operand1 = Math.atan(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (!this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.tanh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else if (this.shiftPressed && this.hyperPressed) {
          this.operand1 = Math.atanh(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        } else {
          this.operand1 = Math.tan(Number(this.screen) * (Math.PI / 200));
          this.screen = this.operand1;
          document.getElementById("resultado").value = this.screen;
        }
        break;
      default:
        break;
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
    this.screen = this.operand1;
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

  dms() {
    this.operand1 = Math.dms(Number(this.screen));
    this.screen = this.operand1;
    document.getElementById("resultado").value = this.screen;
  }

  deg() {}

  exp() {}

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
      button.onclick = "scientificCalculator.pow3()";

      button = document.querySelector('input[type="button"][value="x^y"]');
      button.value = "x√y";
      button.onclick = "scientificCalculator.root()";

      button = document.querySelector('input[type="button"][value="√"]');
      button.value = "1/x";
      button.onclick = "scientificCalculator.inverse()";

      button = document.querySelector('input[type="button"][value="10^x"]');
      button.value = "e^x";
      button.onclick = "scientificCalculator.powe()";

      button = document.querySelector('input[type="button"][value="log"]');
      button.value = "ln";
      button.onclick = "scientificCalculator.ln()";

      button = document.querySelector('input[type="button"][value="Exp"]');
      button.value = "dms";
      button.onclick = "scientificCalculator.dms()";

      button = document.querySelector('input[type="button"][value="Mod"]');
      button.value = "deg";
      button.onclick = "scientificCalculator.deg()";
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
      button.onclick = "scientificCalculator.pow2()";

      button = document.querySelector('input[type="button"][value*="cos"]');
      button.value = "cos";

      button = document.querySelector('input[type="button"][value*="tan"]');
      button.value = "tan";

      button = document.querySelector('input[type="button"][value="x√y"]');
      button.value = "x^y";
      button.onclick = "scientificCalculator.pow()";

      button = document.querySelector('input[type="button"][value="1/x"]');
      button.value = "√";
      button.onclick = "scientificCalculator.sqrt()";

      button = document.querySelector('input[type="button"][value="e^x"]');
      button.value = "10^x";
      button.onclick = "scientificCalculator.pow10()";

      button = document.querySelector('input[type="button"][value="ln"]');
      button.value = "log";
      button.onclick = "scientificCalculator.log()";

      button = document.querySelector('input[type="button"][value="dms"]');
      button.value = "Exp";
      button.onclick = "scientificCalculator.exp()";

      button = document.querySelector('input[type="button"][value="deg"]');
      button.value = "Mod";
      button.onclick = "scientificCalculator.mod()";
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

  PI() {
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
    switch (this.lastOperand) {
      case "^":
        var value = Math.pow(Number(this.operand1), Number(this.operand2));
        this.screen = value;
        this.operand1 = value;
        document.getElementById("resultado").value = this.screen;
        break;
      case "√":
        var value = Math.pow(Number(this.operand1), 1 / Number(this.operand2));
        this.screen = value;
        this.operand1 = value;
        document.getElementById("resultado").value = this.screen;
        break;
      default:
        break;
    }
  }
}

document.addEventListener("click", function () {
  console.log("Screen:" + scientificCalculator.screen);
  console.log("Operand1:" + scientificCalculator.operand1);
  console.log("Operand2:" + scientificCalculator.operand2);
  console.log("Last Expression:" + scientificCalculator.lastOperand);
  console.log("Memory:" + scientificCalculator.memory);
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
