<!DOCTYPE html>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />

    <meta name="author" content="Álex Caso Díaz" />
    <meta name="description" content="Página web del Ejercicio 4 de PHP" />

    <title>Ejercicio 4</title>

    <link rel="stylesheet" type="text/css" href="Ejercicio4.css" />
</head>

<body>
    <header>
        <h1>Calculadora RPN</h1>
    </header>
    <main>
        <?php
        class CalculadoraGas
        {
            public function __construct()
            {
            }

            public function createURL()
            {
                $url =
                    "https://commodities-api.com/api/latest?access_key=1zzg3xowgsegelj0exlt6vlt45emw67s36ra14z58vuwujpklaw253wmexvx&base=EUR&symbols=NG";

                $respuesta = file_get_contents($url);
                $json = json_decode($respuesta);
                echo "<p name='moneda'>Para la fecha: " .
                    $json->data->date .
                    " el precio del gas natural por " .
                    substr($json->data->unit, 4) .
                    " es de " .
                    $json->data->rates->NG .
                    " " .
                    $json->data->base .
                    "</p>";
            }
        }

        session_start();


        if (!isset($_SESSION['calculadora'])) {
            $_SESSION['calculadora'] = new CalculadoraGas();
        }

        $calculadora = $_SESSION['calculadora'];

        if (count($_POST) > 0) {
            if (isset($_POST['calculate']))
                $calculadora->createURL();
        }
        ?>

        <form action='#' method='post' name='botones'>
            <input type="submit" class='button' value="Obtener Datos" name="calculate" />
        </form>
    </main>
    <footer>
        <p>Práctica PHP</p>
    </footer>
</body>

</html>