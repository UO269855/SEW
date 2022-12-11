<!DOCTYPE html>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />

    <meta name="author" content="Álex Caso Díaz" />
    <meta name="description" content="Página web del Ejercicio 1 de PHP" />

    <title>Ejercicio 1</title>

    <link rel="stylesheet" type="text/css" href="CalculadoraMilan.css" />
</head>

<body>
    <header>
        <h1>Calculadora Milán</h1>
    </header>
    <main>
        <?php
        class CalculadoraMilan
        {
            public $screen;
            protected $operand1;
            protected $operand2;
            protected $lastOperand;
            protected $memory;

            public function __construct($screen, $operand1, $operand2, $lastOperand, $memory)
            {
                $this->screen = $screen;
                $this->operand1 = $operand1;
                $this->operand2 = $operand2;
                $this->lastOperand = $lastOperand;
                $this->memory = $memory;
            }

            public function clearAll()
            {
                $this->screen = "";
                $_SESSION['screen'] = $this->screen;
                $this->screen = "";
                $this->operand1 = 0;
                $this->operand2 = "";
                $this->lastOperand = "";

                $_SESSION['screen'] = $this->screen;
                $_SESSION['operand1'] = $this->operand1;
                $_SESSION['operand2'] = $this->operand2;
                $_SESSION['lastOperand'] = $this->lastOperand;
            }

            public function ce()
            {
                $startindex = 0;
                for ($i = strlen($this->screen) - 1; $i > 0; $i--) {
                    //   if ($this->screen,$i == $this->lastOperand) {
                    //     $startindex = $i;
                    //   }
                }
                if (!($this->lastOperand == "") && $startindex > 0) {
                    $this->screen = substr($this->screen, 0, $startindex + 1);
                    $this->operand2 = "";
                } else {
                    $this->screen = "";
                    $this->operand2 = "";
                }
                $_SESSION['screen'] =
                    $this->screen;
            }

            public function changeSign()
            {
                try {
                    $this->screen = eval(
                        $_SESSION['screen'] +
                        "*-1"
                        );
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " + $e;
                    alert($e);
                }

                $_SESSION['screen'] = $this->screen;
            }

            public function raiz()
            {
                try {
                    $this->screen = sqrt(eval($this->screen));
                    $this->operand1 = $this->screen;
                    $_SESSION['screen'] =
                        strval($this->screen);
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " + $e;
                    alert($e);
                }

                $_SESSION['screen'] = $this->screen;
            }

            public function porcentaje()
            {
                $text =
                    $_SESSION['screen'] +
                    "%";
                $this->screen = strval($text);
                $this->operand2 = $this->operand2 + "%";
                $_SESSION['screen'] = $this->screen;
            }

            public function addNumber($value)
            {
                $this->screen = strval($this->screen) + $value;
                if ($this->operand1 == $this->operand2) {
                    $this->operand2 = "";
                }
                $this->operand2 = strval($this->operand2) + $value;
                $_SESSION['screen'] =
                    $this->screen;
            }

            public function multiply()
            {
                $this->operand1 = (int) eval($this->screen);
                $this->operand2 = $this->operand1;
                $this->screen = $this->screen + "*";
                $this->lastOperand = "*";
                $_SESSION['screen'] =
                    $this->screen;
            }

            public function divide()
            {
                $this->operand1 = (int) eval($this->screen);
                $this->operand2 = $this->operand1;
                $this->screen = $this->screen + "/";
                $this->lastOperand = "/";
                $_SESSION['screen'] =
                    $this->screen;
            }

            public function substract()
            {
                $this->operand1 = (int) eval($this->screen);
                $this->operand2 = $this->operand1;
                $this->screen = $this->screen + "-";
                $this->lastOperand = "-";
                $_SESSION['screen'] =
                    $this->screen;
            }

            public function add()
            {
                $this->operand1 = (int) eval($this->screen);
                $this->operand2 = $this->operand1;
                $this->screen = $this->screen + "+";
                $this->lastOperand = "+";
                $_SESSION['screen'] =
                    $this->screen;
            }

            public function mrc()
            {
                $_SESSION['screen'] = "";
                $this->addNumber($this->memory);
                if ($this->lastOperand == "") {
                    $this->screen = document . querySelector(
                        'input[type="text"][title="Pantalla:"]'
                    ) . value;
                }
            }

            public function mminus()
            {
                try {
                    $this->memory = eval($this->memory + "-" + $this->screen);
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " + $e;
                    $this->memory = 0;
                }
            }

            public function mplus()
            {
                try {
                    $this->memory = eval($this->memory + "+" + $this->screen);
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " + $e;
                    $this->memory = 0;
                }
            }

            public function point()
            {
                $text = document . querySelector(
                    'input[type="text"][title="Pantalla:"]'
                ) . value;
                $this->screen = $this->screen + ".";
                $_SESSION['screen'] =
                text + ".";
            }

            //   public function equals() {
            //     try {
            //       if ($this->operand2.toString().includes("%")) {
            //         switch ($this->lastOperand) {
            //           case "*":
            //             $operation =
            //               (int)$this->operand1) *
            //               (int)
            //                 $this->operand2
            //                   .toString()
            //                   .substring(0, strlen($this->operand2) - 1) / 100
            //               );
            //             $this->screen = operation;
            //             $this->operand1 = (int)$this->screen);
            //             break;
            //           case "/":
            //             $operation =
            //               (int)$this->operand1) /
            //               (int)
            //                 $this->operand2
            //                   .toString()
            //                   .substring(0, strlen($this->operand2) - 1) / 100
            //               );
            //             $this->screen = operation;
            //             $this->operand1 = (int)$this->screen);
            //             break;
            //           case "+":
            //             $value =
            //               (int)$this->operand1) *
            //               (int)
            //                 $this->operand2
            //                   .toString()
            //                   .substring(0, strlen($this->operand2) - 1) / 100
            //               );
        
            //             $operation = (int)$this->operand1) + value;
            //             $this->screen = operation;
            //             $this->operand1 = (int)$this->screen);
            //             break;
            //           case "-":
            //             $value =
            //               (int)$this->operand1) *
            //               (int)
            //                 $this->operand2
            //                   .toString()
            //                   .substring(0, strlen($this->operand2) - 1) / 100
            //               );
        
            //             $operation = (int)$this->operand1) - value;
            //             $this->screen = operation;
            //             $this->operand1 = (int)$this->screen);
            //             break;
            //           default:
            //             event.preventDefault();
            //             break;
            //         }
            //         $this->screen = eval(operation);
            //         $this->operand1 = (int)$this->screen);
            //         $_SESSION['screen'] =
            //           $this->screen;
            //       } else if ($this->checkSelf()) {
            //         $result = eval($this->operand1 + $this->lastOperand + $this->operand2);
            //         $this->operand1 = result;
            //         $this->screen = result;
            //         $_SESSION['screen'] =
            //           $this->screen;
            //         $this->screen = $this->screen + $this->lastOperand;
            //       } else if ($this->screen.toString() === $this->operand1.toString()) {
            //         if ($this->lastOperand == "√") {
            //           $result = Math.pow(
            //             (int)$this->operand1),
            //             1 / (int)$this->operand2)
            //           );
            //           $this->operand1 = result;
            //           $this->screen = result;
            //           document.querySelector(
            //             'input[type="text"][title="Pantalla:"]'
            //           ).value = $this->screen;
            //           $this->screen = $this->screen + $this->lastOperand;
            //         } else if ($this->lastOperand == "^") {
            //           $result = Math.pow((int)$this->operand1), (int)$this->operand2));
            //           $this->operand1 = result;
            //           $this->screen = result;
            //           document.querySelector(
            //             'input[type="text"][title="Pantalla:"]'
            //           ).value = $this->screen;
            //           $this->screen = $this->screen + $this->lastOperand;
            //         } else {
            //           $result = eval(
            //             (int)$this->operand1) + $this->lastOperand + (int)$this->operand2)
            //           );
            //           $this->operand1 = result;
            //           $this->screen = result;
            //           document.querySelector(
            //             'input[type="text"][title="Pantalla:"]'
            //           ).value = $this->screen;
            //           $this->screen = $this->screen + $this->lastOperand;
            //         }
            //       } else {
            //         console.log("Normal");
            //         $result = eval($this->screen);
            //         $this->operand1 = result;
            //         $this->screen = result;
            //         $_SESSION['screen'] =
            //           $this->screen;
            //       }
            //     } catch (Error | Exception $e) {
            //       $this->screen = "";
            //       console.log($e);
            //       $_SESSION['screen'] =
            //         "Syntax Error";
            //     }
            //   }
        
            public function checkSelf()
            {
                if (
                    !is_null(
                        (
                            (int) 
                            substr(
                                srtval(
                                    $this->screen
                                ),
                                0,
                                strlen($this->operand1)
                            )

                        ) &&
                        substr(
                            srtval(
                                $this->screen,
                                strlen($this->operand1)
                            ) ==
                            $this->lastOperand
                        )
                    )
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        session_start();

        echo "
  <label for='resultado'>Pantalla:</label>
  <input type='text' id='resultado' value='$screen' readonly />
";
        ?>

        <input type="button" value="C" onclick="calculator.clearAll()" />
        <input type="button" value="CE" onclick="calculator.ce()" />
        <input type="button" value="+/-" onclick="calculator.changeSign()" />
        <input type="button" value="√" onclick="calculator.raiz()" />
        <input type="button" value="%" onclick="calculator.porcentaje()" />

        <input type="button" value="7" onclick="calculator.addNumber(7)" />
        <input type="button" value="8" onclick="calculator.addNumber(8)" />
        <input type="button" value="9" onclick="calculator.addNumber(9)" />
        <input type="button" value="X" onclick="calculator.multiply()" />
        <input type="button" value="/" onclick="calculator.divide()" />

        <input type="button" value="4" onclick="calculator.addNumber(4)" />
        <input type="button" value="5" onclick="calculator.addNumber(5)" />
        <input type="button" value="6" onclick="calculator.addNumber(6)" />
        <input type="button" value="-" onclick="calculator.substract()" />
        <input type="button" value="MRC" onclick="calculator.mrc()" />

        <input type="button" value="1" onclick="calculator.addNumber(1)" />
        <input type="button" value="2" onclick="calculator.addNumber(2)" />
        <input type="button" value="3" onclick="calculator.addNumber(3)" />
        <input type="button" value="+" onclick="calculator.add()" />
        <input type="button" value="M-" onclick="calculator.mminus()" />

        <input type="button" value="0" onclick="calculator.addNumber(0)" />
        <input type="button" value="." onclick="calculator.point()" />
        <input type="button" value="=" onclick="calculator.equals()" />
        <input type="button" value="M+" onclick="calculator.mplus()" />
    </main>
    <footer>
        <p>Práctica JavaScript</p>
    </footer>
</body>

</html>