<!DOCTYPE html>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />

    <meta name="author" content="Álex Caso Díaz" />
    <meta name="description" content="Página web del Ejercicio 2 de PHP" />

    <title>Ejercicio 2</title>

    <link rel="stylesheet" type="text/css" href="CalculadoraCientifica.css" />
</head>

<body>
    <header>
        <h1>Calculadora Científica</h1>
    </header>
    <main>
        <?php
        class CalculadoraMilan
        {

            public $screen;
            protected $hiddenScreen;
            protected $operand1;
            protected $operand2;
            protected $lastOperand;
            protected $memory;

            public function __construct($screen, $hiddenScreen, $operand1, $operand2, $lastOperand, $memory)
            {
                $this->screen = $screen;
                $this->hiddenScreen = $hiddenScreen;
                $this->operand1 = $operand1;
                $this->operand2 = $operand2;
                $this->lastOperand = $lastOperand;
                $this->memory = $memory;
            }

            public function clearAll()
            {
                $this->screen = "";
                $this->hiddenScreen = "";
                $this->operand1 = "";
                $this->operand2 = "";
                $this->lastOperand = "";
            }

            public function ce()
            {
                if (substr($this->hiddenScreen, (strlen($this->hiddenScreen) - strlen($this->operand2)), strlen($this->operand2)) == $this->operand2 && $this->operand2 != $this->operand1) {
                    $this->hiddenScreen = substr($this->hiddenScreen, 0, (strlen($this->hiddenScreen) - strlen($this->operand2)));
                    $this->screen = "";
                    $this->operand2 = "";
                }

            }

            public function changeSign()
            {
                try {
                    $value = eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        );
                    $value = ((float) $value) * -1;
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            public function raiz()
            {
                try {
                    $value = sqrt(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            public function porcentaje()
            {
                $this->screen .= "%";
                $this->hiddenScreen .= "%";
                $this->operand2 = $this->screen;
            }

            public function addNumber($value)
            {
                if (str_ends_with(strval($this->hiddenScreen), "^") || str_ends_with(strval($this->hiddenScreen), "+") || str_ends_with(strval($this->hiddenScreen), "-") || str_ends_with(strval($this->hiddenScreen), "*") || str_ends_with(strval($this->hiddenScreen), "/")) {
                    $this->screen = "";
                }
                $this->screen .= $value;
                $this->hiddenScreen .= $value;
                $this->operand2 = $this->screen;

            }
            public function add()
            {
                try {
                    $this->operand1 = (float) eval("return $this->hiddenScreen;");

                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
                if (strlen(strval($this->lastOperand)) > 0) {
                    $this->screen = $this->operand1;
                } else {
                    $this->screen = "";
                }
                $this->operand2 = "";
                $this->hiddenScreen .= "+";
                $this->lastOperand = "+";
            }

            public function multiply()
            {
                try {
                    $this->operand1 = (float) eval("return $this->hiddenScreen;");

                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
                if (strlen(strval($this->lastOperand)) > 0) {
                    $this->screen = $this->operand1;
                } else {
                    $this->screen = "";
                }
                $this->operand2 = "";
                $this->hiddenScreen .= "*";
                $this->lastOperand = "*";
            }

            public function divide()
            {
                try {
                    $this->operand1 = (float) eval("return $this->hiddenScreen;");

                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
                if (strlen(strval($this->lastOperand)) > 0) {
                    $this->screen = $this->operand1;
                } else {
                    $this->screen = "";
                }
                $this->operand2 = "";
                $this->hiddenScreen .= "/";
                $this->lastOperand = "/";

            }

            public function substract()
            {
                try {
                    $this->operand1 = (float) eval("return $this->hiddenScreen;");

                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
                if (strlen(strval($this->lastOperand)) > 0) {
                    $this->screen = $this->operand1;
                } else {
                    $this->screen = "";
                }
                $this->operand2 = "";
                $this->hiddenScreen .= "-";
                $this->lastOperand = "-";

            }



            public function mrc()
            {
                $this->ce();
                $this->addNumber($this->memory);
            }

            public function mminus()
            {
                try {
                    $this->memory = eval("return " . $this->memory . "-" . $this->screen . ";");
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                    $this->memory = 0;
                }
            }

            public function mplus()
            {
                try {

                    $this->memory = eval("return " . $this->memory . "+" . $this->screen . ";");
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                    $this->memory = 0;
                }
            }

            public function point()
            {
                $this->screen .= ".";
                $this->hiddenScreen .= ".";
                $this->operand2 = $this->screen;
            }

            public function equals()
            {
                if (str_ends_with($this->hiddenScreen, "%")) {
                    switch ($this->lastOperand) {
                        case "*":
                            $operation =
                                (float) $this->operand1 *
                                (float) 
                                substr(strval($this->operand2), 0, strlen(strval($this->operand2))) / 100;

                            $this->operand1 = $operation;
                            $this->screen = $operation;
                            $this->hiddenScreen = $operation;
                            break;
                        case "/":
                            $operation =
                                (float) $this->operand1 /
                                (float) 
                                substr(strval($this->operand2), 0, strlen(strval($this->operand2))) * 100;
                            $this->operand1 = $operation;
                            $this->screen = $operation;
                            $this->hiddenScreen = $operation;
                            break;
                        case "+":
                            $operation =
                                (float) $this->operand1 +
                                ((float) 
                                    substr($this->operand2, 0, strlen($this->operand2)) * (float) $this->operand1 / 100);
                            $this->operand1 = $operation;
                            $this->screen = $operation;
                            $this->hiddenScreen = $operation;
                            break;
                        case "-":
                            $operation =
                                (float) $this->operand1 -
                                ((float) 
                                    substr($this->operand2, 0, strlen($this->operand2)) * (float) $this->operand1 / 100);
                            $this->operand1 = $operation;
                            $this->screen = $operation;
                            $this->hiddenScreen = $operation;
                            break;
                        default:
                            break;
                    }
                    try {
                        $this->screen = eval("return $operation;");
                        $this->operand1 = (float) $this->screen;
                    } catch (Error | Exception $e) {
                        $this->screen = "Error = " . $e->getMessage();
                    }
                } else if (strval($this->hiddenScreen) === strval($this->operand1)) {
                    try {
                        $result = eval(
                            "return " . $this->operand1 . $this->lastOperand . $this->operand2 . ";")
                        ;
                        $this->operand1 = $result;
                        $this->screen = $result;
                        $this->hiddenScreen = $result;
                    } catch (Error | Exception $e) {
                        $this->screen = "Error = " . $e->getMessage();
                    }

                } else if ($this->checkSelf()) {

                    $result = eval("return " . $this->operand1 . $this->lastOperand . $this->operand1 . ";");

                    $this->operand2 = $this->operand1;
                    $this->operand1 = $result;
                    $this->screen = $result;
                    $this->hiddenScreen = $result;

                } else {
                    try {
                        $result = eval("return $this->hiddenScreen;");
                        $this->operand1 = $result;
                        $this->screen = $result;
                        $this->hiddenScreen = $result;
                    } catch (Error | Exception $e) {
                        $this->screen = "Error = " . $e->getMessage();
                    }
                }
            }

            public function getScreen()
            {
                return $this->screen;
            }

            public function checkSelf()
            {
                if ($this->hiddenScreen == ($this->operand1 . $this->lastOperand)) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        class CalculadoraCientifica extends CalculadoraMilan
        {
            function __construct($screen, $hiddenScreen, $operand1, $operand2, $lastOperand, $memory)
            {
                parent::__construct($screen, $hiddenScreen, $operand1, $operand2, $lastOperand, $memory);
            }

            function mc()
            {
                $this->memory = "";
            }

            function ms()
            {
                $this->memory = eval("return " . $this->hiddenScreen . ";");
            }

            function mr()
            {
                parent::addNumber($this->memory);
            }

            function log()
            {
                try {
                    $value = log(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            function log10()
            {

                try {
                    $value = log10(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            function sin()
            {
                try {
                    $value = sin(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            function cos()
            {
                try {
                    $value = cos(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            function tan()
            {
                try {
                    $value = tan(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }
            function pow2()
            {
                try {
                    $value = pow(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ), 2);
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }
            function pow10()
            {
                try {
                    $value = pow(10, eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }
            function pow()
            {
                try {
                    $this->enter();
                    $this->operand1 = (float) eval("return $this->hiddenScreen;");

                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
                if (strlen(strval($this->lastOperand)) > 0) {
                    $this->screen = $this->operand1;
                } else {
                    $this->screen = "";
                }
                $this->operand2 = "";
                $this->hiddenScreen .= "^";
                $this->lastOperand = "^";
            }

            function exp()
            {
                try {
                    $value = exp(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ));
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            function root3()
            {
                try {
                    $value = pow(eval(
                        "return " . $this->hiddenScreen .
                        ";"
                        ), 1 / 3);
                    $this->screen = $value;
                    $this->hiddenScreen = $value;
                    $this->operand1 = $value;
                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
            }

            function del()
            {
                $this->hiddenScreen = substr($this->hiddenScreen, 0, strlen($this->hiddenScreen) - 1);
                $this->screen = substr($this->screen, 0, strlen($this->screen) - 1);

            }

            function pi()
            {
                $this->screen .= pi();
                $this->hiddenScreen .= pi();
                $this->operand2 = $this->screen;
            }

            function mod()
            {
                try {
                    $this->enter();
                    $this->operand1 = (float) eval("return $this->hiddenScreen;");

                } catch (Error | Exception $e) {
                    $this->screen = "Error = " . $e->getMessage();
                }
                if (strlen(strval($this->lastOperand)) > 0) {
                    $this->screen = $this->operand1;
                } else {
                    $this->screen = "";
                }
                $this->operand2 = "";
                $this->hiddenScreen .= "%";
                $this->lastOperand = "%";
            }

            function leftPar()
            {
                $this->screen .= "(";
                $this->hiddenScreen .= "(";
                $this->operand2 = $this->screen;
            }

            function rightPar()
            {
                $this->screen .= ")";
                $this->hiddenScreen .= ")";
                $this->operand2 = $this->screen;
            }

            public function add()
            {
                $this->enter();
                parent::add();
            }

            public function multiply()
            {
                $this->enter();
                parent::multiply();
            }

            public function substract()
            {
                $this->enter();
                parent::substract();
            }

            public function divide()
            {
                $this->enter();
                parent::divide();
            }

            function enter()
            {
                while (str_contains($this->hiddenScreen, "^")) {
                    $base = "";
                    $exponente = "";
                    for ($j = strpos($this->hiddenScreen, "^") - 1; $j >= 0; $j--) {
                        if (is_numeric($this->hiddenScreen[$j])) {
                            $base .= $this->hiddenScreen[$j];
                        } else {
                            break;
                        }
                    }

                    for ($i = strpos($this->hiddenScreen, "^") + 1; $i < strlen($this->hiddenScreen); $i++) {
                        if (is_numeric($this->hiddenScreen[$i])) {
                            $exponente .= $this->hiddenScreen[$i];
                        } else {
                            break;
                        }
                    }

                    $operation = pow((float) $base, (float) $exponente);

                    $part1 = substr($this->hiddenScreen, 0, strpos($this->hiddenScreen, "^") - strlen($base));
                    $part2 = substr($this->hiddenScreen, strpos($this->hiddenScreen, "^") + strlen($exponente) + 1);

                    $this->hiddenScreen = $part1 . $operation . $part2;
                }
                parent::equals();
            }
        }

        session_start();


        if (!isset($_SESSION['calculadora'])) {
            $_SESSION['calculadora'] = new CalculadoraCientifica("", "", "", "", "", "");
        }

        $calculadora = $_SESSION['calculadora'];

        if (count($_POST) > 0) {
            if (isset($_POST['clearAll']))
                $calculadora->clearAll();
            if (isset($_POST['ce']))
                $calculadora->ce();
            if (isset($_POST['changeSign']))
                $calculadora->changeSign();
            if (isset($_POST['raiz']))
                $calculadora->raiz();
            if (isset($_POST['porcentaje']))
                $calculadora->porcentaje();
            if (isset($_POST['addNumber1']))
                $calculadora->addNumber(1);
            if (isset($_POST['addNumber2']))
                $calculadora->addNumber(2);
            if (isset($_POST['addNumber3']))
                $calculadora->addNumber(3);
            if (isset($_POST['addNumber4']))
                $calculadora->addNumber(4);
            if (isset($_POST['addNumber5']))
                $calculadora->addNumber(5);
            if (isset($_POST['addNumber6']))
                $calculadora->addNumber(6);
            if (isset($_POST['addNumber7']))
                $calculadora->addNumber(7);
            if (isset($_POST['addNumber8']))
                $calculadora->addNumber(8);
            if (isset($_POST['addNumber9']))
                $calculadora->addNumber(9);
            if (isset($_POST['multiply']))
                $calculadora->multiply();
            if (isset($_POST['divide']))
                $calculadora->divide();
            if (isset($_POST['substract']))
                $calculadora->substract();
            if (isset($_POST['mrc']))
                $calculadora->mrc();
            if (isset($_POST['add']))
                $calculadora->add();
            if (isset($_POST['mminus']))
                $calculadora->mminus();
            if (isset($_POST['addNumber0']))
                $calculadora->addNumber(0);
            if (isset($_POST['point']))
                $calculadora->point();
            if (isset($_POST['equals']))
                $calculadora->enter();
            if (isset($_POST['mplus']))
                $calculadora->mplus();
            if (isset($_POST['mc']))
                $calculadora->mc();
            if (isset($_POST['mr']))
                $calculadora->mr();
            if (isset($_POST['ms']))
                $calculadora->ms();
            if (isset($_POST['log']))
                $calculadora->log();
            if (isset($_POST['log10']))
                $calculadora->log10();
            if (isset($_POST['sin']))
                $calculadora->sin();
            if (isset($_POST['cos']))
                $calculadora->cos();
            if (isset($_POST['tan']))
                $calculadora->tan();
            if (isset($_POST['pow10']))
                $calculadora->pow10();
            if (isset($_POST['pow2']))
                $calculadora->pow2();
            if (isset($_POST['pow']))
                $calculadora->pow();
            if (isset($_POST['exp']))
                $calculadora->exp();
            if (isset($_POST['3root']))
                $calculadora->root3();
            if (isset($_POST['del']))
                $calculadora->del();
            if (isset($_POST['pi']))
                $calculadora->del();
            if (isset($_POST['mod']))
                $calculadora->mod();
            if (isset($_POST['leftPar']))
                $calculadora->leftPar();
            if (isset($_POST['rightPar']))
                $calculadora->rightPar();
        }


        $screen = $calculadora->getScreen();

        echo "<label for='resultado'>Pantalla:</label>
              <input type='text' id='resultado' value='$screen' readonly />";
        ?>

        <form action='#' method='post' name='botones'>
            <input type="submit" class='button' value="MC" name="mc" />
            <input type="submit" class='button' value="MR" name="mr" />
            <input type="submit" class='button' value="M+" name="mplus" />
            <input type="submit" class='button' value="M-" name="mminus" />
            <input type="submit" class='button' value="MS" name="ms" />

            <input type="submit" class='button' value="log" name="log" />
            <input type="submit" class='button' value="log10" name="log10" />
            <input type="submit" class='button' value="sin" name="sin" />
            <input type="submit" class='button' value="cos" name="cos" />
            <input type="submit" class='button' value="tan" name="tan" />

            <input type="submit" class='button' value="√" name="raiz" />
            <input type="submit" class='button' value="10^x" name="pow10" />
            <input type="submit" class='button' value="x^2" name="pow2" />
            <input type="submit" class='button' value="x^y" name="pow" />
            <input type="submit" class='button' value="Exp" name="exp" />


            <input type="submit" class='button' value="3√" name="3root" />
            <input type="submit" class='button' value="CE" name="ce" />
            <input type="submit" class='button' value="C" name="clearAll" />
            <input type="submit" class='button' value="Del" name="del" />
            <input type="submit" class='button' value="/" name="divide" />


            <input type="submit" class='button' value="pi" name="pi" />
            <input type="submit" class='button' value="7" name="addNumber7" />
            <input type="submit" class='button' value="8" name="addNumber8" />
            <input type="submit" class='button' value="9" name="addNumber9" />
            <input type="submit" class='button' value="X" name="multiply" />

            <input type="submit" class='button' value="Mod" name="mod" />
            <input type="submit" class='button' value="4" name="addNumber4" />
            <input type="submit" class='button' value="5" name="addNumber5" />
            <input type="submit" class='button' value="6" name="addNumber6" />
            <input type="submit" class='button' value="-" name="substract" />

            <input type="submit" class='button' value="+/-" name="changeSign" />
            <input type="submit" class='button' value="1" name="addNumber1" />
            <input type="submit" class='button' value="2" name="addNumber2" />
            <input type="submit" class='button' value="3" name="addNumber3" />
            <input type="submit" class='button' value="+" name="add" />

            <input type="submit" class='button' value="(" name="leftPar" />
            <input type="submit" class='button' value=")" name="rightPar" />
            <input type="submit" class='button' value="0" name="addNumber0" />
            <input type="submit" class='button' value="." name="point" />
            <input type="submit" class='button' value="=" name="equals" />

        </form>
    </main>
    <footer>
        <p>Práctica PHP</p>
    </footer>
</body>

</html>

</html>

</html>

</html>