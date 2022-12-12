<!DOCTYPE html>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />

    <meta name="author" content="Álex Caso Díaz" />
    <meta name="description" content="Página web del Ejercicio 3 de PHP" />

    <title>Ejercicio 3</title>

    <link rel="stylesheet" type="text/css" href="CalculadoraRPN.css" />
</head>

<body>
    <header>
        <h1>Calculadora RPN</h1>
    </header>
    <main>
        <?php
        class CalculadoraRPN
        {

            public $screen;
            protected $stack;
            protected $values = array();

            public function __construct($screen, $stack, $values)
            {
                $this->screen = $screen;
                $this->stack = $stack;
                $this->values = $values;
            }

            public function ce()
            {
                $this->screen = "";
                $this->stack = "";
                $this->values = array();

            }

            public function del()
            {
                $this->screen = substr($this->screen, 0, strlen($this->screen) - 1);

            }

            public function changeSign()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = $op1 * -1;
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }

            }

            public function raiz()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = sqrt($op1);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }

            public function addNumber($value)
            {
                $this->screen .= $value;
            }
            public function add()
            {
                if (sizeof($this->values) > 1) {
                    $op1 = (float) array_pop($this->values);
                    $op2 = (float) array_pop($this->values);
                    $value = $op1 + $op2;
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }

            public function multiply()
            {
                if (sizeof($this->values) > 1) {
                    $op1 = (float) array_pop($this->values);
                    $op2 = (float) array_pop($this->values);
                    $value = $op1 * $op2;
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }

            public function divide()
            {
                if (sizeof($this->values) > 1) {
                    $op1 = (float) array_pop($this->values);
                    $op2 = (float) array_pop($this->values);
                    $value = $op1 / $op2;
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }

            }

            public function substract()
            {
                if (sizeof($this->values) > 1) {
                    $op2 = (float) array_pop($this->values);
                    $op1 = (float) array_pop($this->values);
                    $value = $op1 - $op2;
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }

            }

            public function point()
            {
                $this->screen .= ".";
            }

            public function enter()
            {
                try {
                    array_push($this->values, $this->screen);
                    $this->screen = "";
                    $this->printStack();
                } catch (Error | Exception $e) {
                    $this->screen = "Syntax Error";
                }
            }

            public function getScreen()
            {
                return $this->screen;
            }

            public function printStack()
            {
                $toPrint = "";
                for ($i = 0; $i < sizeof($this->values); $i++) {
                    $toPrint .= ("\n" . $this->values[$i]);
                }
                return $toPrint;
            }

            function log()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = log($op1);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }

            function log10()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = log10($op1);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }
            function sin()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = sin($op1);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }

            function cos()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = cos($op1);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }

            function tan()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = tan($op1);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }
            function pow2()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = pow($op1, 2);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }
            function pow10()
            {
                if (sizeof($this->values) > 0) {
                    $op1 = (float) array_pop($this->values);
                    $value = pow(10, $op1);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }
            function pow()
            {
                if (sizeof($this->values) > 1) {
                    $op2 = (float) array_pop($this->values);
                    $op1 = (float) array_pop($this->values);
                    $value = pow($op1, $op2);
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }

            function mod()
            {
                if (sizeof($this->values) > 1) {
                    $op2 = (float) array_pop($this->values);
                    $op1 = (float) array_pop($this->values);
                    $value = $op1 % $op2;
                    array_push($this->values, $value);
                    $this->printStack();
                } else {
                    $this->screen = "Syntax Error";
                }
            }
        }

        session_start();


        if (!isset($_SESSION['calculadora'])) {
            $_SESSION['calculadora'] = new CalculadoraRPN("", "", array());
        }

        $calculadora = $_SESSION['calculadora'];

        if (count($_POST) > 0) {
            if (isset($_POST['ce']))
                $calculadora->ce();
            if (isset($_POST['changeSign']))
                $calculadora->changeSign();
            if (isset($_POST['raiz']))
                $calculadora->raiz();
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
            if (isset($_POST['add']))
                $calculadora->add();
            if (isset($_POST['addNumber0']))
                $calculadora->addNumber(0);
            if (isset($_POST['point']))
                $calculadora->point();
            if (isset($_POST['enter']))
                $calculadora->enter();
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
            if (isset($_POST['del']))
                $calculadora->del();
            if (isset($_POST['mod']))
                $calculadora->mod();
        }

        $screen = $calculadora->getScreen();


        echo "<label for='Stack'>Stack:</label>
              <textarea id='Stack' name='Stack' disabled>" . $calculadora->printStack() . "</textarea>
              <label for='resultado'>Pantalla:</label>
              <input type='text' id='resultado' value='$screen' readonly />";
        ?>

        <form action='#' method='post' name='botones'>
            <input type="submit" class='button' value="x^2" name="pow2" />
            <input type="submit" class='button' value="sin" name="sin" />
            <input type="submit" class='button' value="cos" name="cos" />
            <input type="submit" class='button' value="tan" name="tan" />

            <input type="submit" class='button' value="√" name="sqrt" />
            <input type="submit" class='button' value="10^x" name="pow10" />
            <input type="submit" class='button' value="log" name="log" />
            <input type="submit" class='button' value="Mod" name="mod" />

            <input type="submit" class='button' value="log10" name="log10" />
            <input type="submit" class='button' value="CE" name="ce" />
            <input type="submit" class='button' value="Del" name="del" />
            <input type="submit" class='button' value="Enter" name="enter" />

            <input type="submit" class='button' value="7" name="addNumber7" />
            <input type="submit" class='button' value="8" name="addNumber8" />
            <input type="submit" class='button' value="9" name="addNumber9" />
            <input type="submit" class='button' value="/" name="divide" />

            <input type="submit" class='button' value="4" name="addNumber4" />
            <input type="submit" class='button' value="5" name="addNumber5" />
            <input type="submit" class='button' value="6" name="addNumber6" />
            <input type="submit" class='button' value="X" name="multiply" />

            <input type="submit" class='button' value="1" name="addNumber1" />
            <input type="submit" class='button' value="2" name="addNumber2" />
            <input type="submit" class='button' value="3" name="addNumber3" />
            <input type="submit" class='button' value="-" name="substract" />

            <input type="submit" class='button' value="+/-" name="changeSign" />
            <input type="submit" class='button' value="0" name="addNumber0" />
            <input type="submit" class='button' value="." name="point" />
            <input type="submit" class='button' value="+" name="add" />

        </form>
    </main>
    <footer>
        <p>Práctica JavaScript</p>
    </footer>
</body>

</html>