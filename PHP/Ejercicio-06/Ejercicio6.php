<!DOCTYPE html>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />

    <meta name="author" content="Álex Caso Díaz" />
    <meta name="description" content="Página web del Ejercicio 6 de PHP" />

    <title>Ejercicio 6</title>

    <link rel="stylesheet" type="text/css" href="Ejercicio6.css" />
</head>

<body>
    <header>
        <h1>Base de Datos</h1>
    </header>
    <main>
        <?php
        class BaseDatos
        {
            private $servername;
            private $username;
            private $password;
            private $database;

            public function __construct()
            {
                $this->servername = "localhost";
                $this->username = "DBUSER2022";
                $this->password = "DBPSWD2022";
                $this->database = "PruebasUsabilidad";
            }

            public function createdb()
            {
                $db = new mysqli($this->servername, $this->username, $this->password);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $databaseName = "PruebasUsabilidad";
                $SQLQuery = "CREATE DATABASE IF NOT EXISTS " . $databaseName . " COLLATE utf8_spanish_ci";

                if (!($db->query($SQLQuery) === TRUE)) {
                    echo "<p>No se ha podido crear la Base de Datos " . $databaseName . " Error: " . $db->error . "</p>";
                    exit();
                }
                $this->database = $databaseName;
                $db->close();
            }

            public function createtable()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = "CREATE TABLE IF NOT EXISTS PruebasUsabilidad (
                    Id VARCHAR(9) NOT NULL,
                    Nombre VARCHAR(255) NOT NULL, 
                    Apellidos VARCHAR(255) NOT NULL,
                    Correo VARCHAR(255) NOT NULL,
                    Telefono INT(9) NOT NULL,
                    Edad INT(3) NOT NULL,
                    Sexo VARCHAR(255) NOT NULL,
                    Habilidad INT(2) NOT NULL,
                    Tiempo INT NOT NULL,
                    Superada VARCHAR(2) NOT NULL,
                    Comentarios VARCHAR(255) NOT NULL,
                    Propuestas VARCHAR(255) NOT NULL,
                    Valoracion INT(2) NOT NULL,
                    PRIMARY KEY (Id))";

                if (!($db->query($SQLQuery) === TRUE)) {
                    echo "<p>No se ha podido crear la Tabla Persona. Error: " . $db->error . "</p>";
                    exit();
                }
                $db->close();
            }

            public function insertarDatosForm()
            {
                echo "<section>
                <h2>Insertar datos en una tabla</h2>
                <h3>Rellene los siguientes datos para introducir datos en la tabla PruebaUsabilidad</h3>
                <form name='datos' method='post' action='#'>
                <p>
                    <label for='ident'>Identificador:</label>
                    <input id='ident' name='id' type='text' placeholder='DNI/NIE' required/>
                </p>
                <p>
                    <label for='name'>Nombre:</label>
                    <input id='name' name='nombre' type='text' placeholder='Nombre' required/>
                </p>
                <p>
                    <label for='surname'>Apellidos:</label>
                    <input id='surname' name='apellido' type='text' placeholder='Apellidos' required/>
                </p>  
                <p>
                    <label for='email'>Email:</label>
                    <input id='email' name='correo' type='text' placeholder='Email' required/>
                </p>
                <p>
                    <label for='phone'>Telefono:</label>
                    <input id='phone' name='telefono' type='text' placeholder='Telefono' required/>
                </p>    
                <p>
                    <label for='age'>Edad:</label>
                    <input id='age' name='edad' type='text' placeholder='Edad' required/>
                </p>    
                <fieldset name='genero'>
                    <legend>Por favor, indique su género</legend>
                    <input id='genero-hombre' type='radio' name='genero' value='Hombre' required/>
                    <label for='genero-hombre'>Hombre</label>

                    <input id='genero-mujer' type='radio' name='genero' value='Mujer' />
                    <label for='genero-mujer'>Mujer</label>
                
                    <input id='genero-nobinario' type='radio' name='genero' value='No Binario'  />
                    <label for='genero-nobinario'>No binario</label>
                </fieldset> 
                <p>
                    <label for='skill'>Habilidad:</label>
                    <input id='skill' name='habilidad' type='text' placeholder='Habilidad' required/>
                </p>    
                <p>
                    <label for='time'>Tiempo:</label>
                    <input id='time' name='tiempo' type='text' placeholder='Tiempo' required/>
                </p>   
                <fieldset name='superado'>
                    <legend>¿Ha superado la prueba?</legend>
                    <input id='superado-si' type='radio' name='superado' value='Si' required/>
                    <label for='superado-si'>Si</label>

                    <input id='superado-no' type='radio' name='superado' value='No' />
                    <label for='superado-no'>No</label>
                </fieldset>      
                <p>
                    <label for='comment'>Comentario:</label>
                    <input id='comment' name='comentario' type='text' placeholder='Comentario' required/>
                </p>    
                <p>
                    <label for='help'>Propuesta:</label>
                    <input id='help' name='propuesta' type='text' placeholder='Propuesta' required/>
                </p>    
                <p>
                    <label for='value'>Valoracion:</label>
                    <input id='value' name='valor' type='text' placeholder='Valoracion' required/>
                </p>                      
                <input type='submit' class='button' value='Insertar Datos' name='InsertarDatos' />
                </form>
                </section>";
            }
            public function insertarDatos()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare("INSERT INTO PruebasUsabilidad (Id, Nombre, Apellidos, Correo, Telefono, Edad, Sexo, Habilidad, Tiempo, Superada, Comentarios, Propuestas, Valoracion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");

                $id = $_POST["id"];
                $nombre = $_POST["nombre"];
                $apellidos = $_POST["apellido"];
                $email = $_POST["correo"];
                $telefono = intval($_POST["telefono"]);
                $edad = intval($_POST["edad"]);
                $genero = $_POST["genero"];
                $habilidad = intval($_POST["habilidad"]);
                $superada = $_POST["superado"];
                $tiempo = intval($_POST["tiempo"]);
                $comentarios = $_POST["comentario"];
                $propuesta = $_POST["propuesta"];
                $valor = intval($_POST["valor"]);

                $SQLQuery->bind_param(
                    'ssssiisiisssi',
                    $id,
                    $nombre,
                    $apellidos,
                    $email,
                    $telefono,
                    $edad,
                    $genero,
                    $habilidad,
                    $tiempo,
                    $superada,
                    $comentarios,
                    $propuesta,
                    $valor
                );

                $SQLQuery->execute();
                $SQLQuery->close();
                $db->close();
            }

            public function buscarDatosForm()
            {
                echo "<section>
                        <h2>Buscar datos en la tabla</h2>  
                        <form method='post' action='#'> 
                            <p>
                                <label for='search'>Dato:</label>
                                <input id='search' type='text' name='data' /> 
                            </p> 
                            <input type='submit' class='button' value='Buscar Datos' name='Buscar' />
                        </form>
                      </section>";
            }

            public function buscarDatos()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare('SELECT * FROM PruebasUsabilidad WHERE nombre= ?');
                $SQLQuery->bind_param('s', $_POST["data"]);
                $SQLQuery->execute();
                $result = $SQLQuery->get_result();

                if ($result->num_rows > 0) {
                    echo "<section>
                    <h2>Los resultados de la búsqueda en la tabla 'PruebasUsabilidad' son: </h2>
                    <table>
                        <tr>
                         <th>Id</th>
                         <th>Nombre</th>
                         <th>Apellidos</th>
                         <th>Correo</th>
                         <th>Telefono</th>
                         <th>Edad</th>
                         <th>Sexo</th>
                         <th>Habilidad</th>
                         <th>Tiempo</th>
                         <th>Superada</th>
                         <th>Comentarios</th>
                         <th>Propuestas</th>
                         <th>Valoracion</th>
                        </tr>";

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                        <td>" . $row['Id'] . "</td>
                        <td>" . $row['Nombre'] . "</td>
                        <td>" . $row['Apellidos'] . "</td>
                        <td>" . $row['Correo'] . "</td>
                        <td>" . $row['Telefono'] . "</td>
                        <td>" . $row['Edad'] . "</td>
                        <td>" . $row['Sexo'] . "</td>
                        <td>" . $row['Habilidad'] . "</td>
                        <td>" . $row['Tiempo'] . "</td>
                        <td>" . $row['Superada'] . "</td>
                        <td>" . $row['Comentarios'] . "</td>
                        <td>" . $row['Propuestas'] . "</td>
                        <td>" . $row['Valoracion'] . "</td>
                       </tr>";
                    }
                    echo "</table>
                    </section>";
                } else {
                    echo "<section><p>No se han encontrado resultados. Número de filas = " . $result->num_rows . "</p></section>";
                }

                $db->close();
            }

            public function modificarDatosForm()
            {
                echo "<section>
                <h2>Insertar datos en una tabla</h2>
                <h3>Rellene los siguientes datos para introducir datos en la tabla PruebaUsabilidad</h3>
                <form name='datos' method='post' action='#'>
                <p>
                    <label for='ident'>Identificador:</label>
                    <input id='ident' name='id' type='text' placeholder='DNI/NIE' required/>
                </p>
                <p>
                    <label for='name'>Nombre:</label>
                    <input id='name' name='nombre' type='text' placeholder='Nombre' required/>
                </p>
                <p>
                    <label for='surname'>Apellidos:</label>
                    <input id='surname' name='apellido' type='text' placeholder='Apellidos' required/>
                </p>  
                <p>
                    <label for='email'>Email:</label>
                    <input id='email' name='correo' type='text' placeholder='Email' required/>
                </p>
                <p>
                    <label for='phone'>Telefono:</label>
                    <input id='phone' name='telefono' type='text' placeholder='Telefono' required/>
                </p>    
                <p>
                    <label for='age'>Edad:</label>
                    <input id='age' name='edad' type='text' placeholder='Edad' required/>
                </p>    
                <fieldset name='genero'>
                    <legend>Por favor, indique su género</legend>
                    <input id='genero-hombre' type='radio' name='genero' value='Hombre' required/>
                    <label for='genero-hombre'>Hombre</label>

                    <input id='genero-mujer' type='radio' name='genero' value='Mujer' />
                    <label for='genero-mujer'>Mujer</label>
                
                    <input id='genero-nobinario' type='radio' name='genero' value='No Binario'  />
                    <label for='genero-nobinario'>No binario</label>
                </fieldset> 
                <p>
                    <label for='skill'>Habilidad:</label>
                    <input id='skill' name='habilidad' type='text' placeholder='Habilidad' required/>
                </p>    
                <p>
                    <label for='time'>Tiempo:</label>
                    <input id='time' name='tiempo' type='text' placeholder='Tiempo' required/>
                </p>   
                <fieldset name='superado'>
                    <legend>¿Ha superado la prueba?</legend>
                    <input id='superado-si' type='radio' name='superado' value='Si' required/>
                    <label for='superado-si'>Si</label>

                    <input id='superado-no' type='radio' name='superado' value='No' />
                    <label for='superado-no'>No</label>
                </fieldset>      
                <p>
                    <label for='comment'>Comentario:</label>
                    <input id='comment' name='comentario' type='text' placeholder='Comentario' required/>
                </p>    
                <p>
                    <label for='help'>Propuesta:</label>
                    <input id='help' name='propuesta' type='text' placeholder='Propuesta' required/>
                </p>    
                <p>
                    <label for='value'>Valoracion:</label>
                    <input id='value' name='valor' type='text' placeholder='Valoracion' required/>
                </p>                      
                <input type='submit' class='button' value='Insertar Datos' name='ModificarDatos' />
                </form>
                </section>";
            }

            public function modificarDatos()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare("UPDATE PruebasUsabilidad SET 
                Nombre = ?, Apellidos = ?, Correo = ?, 
                Telefono = ?, Edad = ?, Sexo = ?, Habilidad = ?, 
                Tiempo = ?, Superada = ?, Comentarios = ?, 
                Propuestas = ?, Valoracion = ? WHERE Id = ?");

                $id = $_POST["id"];
                $nombre = $_POST["nombre"];
                $apellidos = $_POST["apellido"];
                $email = $_POST["correo"];
                $telefono = intval($_POST["telefono"]);
                $edad = intval($_POST["edad"]);
                $genero = $_POST["genero"];
                $habilidad = intval($_POST["habilidad"]);
                $superada = $_POST["superado"];
                $tiempo = intval($_POST["tiempo"]);
                $comentarios = $_POST["comentario"];
                $propuesta = $_POST["propuesta"];
                $valor = intval($_POST["valor"]);

                $SQLQuery->bind_param(
                    'sssiisiisssis',
                    $nombre,
                    $apellidos,
                    $email,
                    $telefono,
                    $edad,
                    $genero,
                    $habilidad,
                    $tiempo,
                    $superada,
                    $comentarios,
                    $propuesta,
                    $valor,
                    $id
                );

                $SQLQuery->execute();
                $SQLQuery->close();
                $db->close();
            }

            public function eliminarDatosForm()
            {
                echo "<section>
                        <h2>Indique el ID de la fila a eliminar la tabla</h2>  
                        <form method='post' action='#'> 
                            <p>
                                <label for='search'>ID:</label>
                                <input id='search' type='text' name='d' /> 
                            </p> 
                            <input type='submit' class='button' value='Buscar Datos' name='NombreEliminar' />
                        </form>
                      </section>";
            }

            public function eliminarDatos()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare('DELETE FROM PruebasUsabilidad WHERE Id = ?');
                $SQLQuery->bind_param('s', $_POST["data"]);
                $SQLQuery->execute();
                $result = $SQLQuery->get_result();

                if ($result === true) {
                    echo "<section><p>Se ha eliminado correctamente la fila con id " . $_POST["data"] . "</p></section>";
                } else {
                    echo "<section><p>No se ha podido eliminar correctamente la fila con id " . $_POST["data"] . "</p></section>";
                }

                $db->close();
            }
            public function generarInforme()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $medias = $db->query('SELECT sum(Edad)/count(*) as edadMedia, 
                sum(Habilidad)/count(*) as habilidadMedia, 
                sum(Tiempo)/count(*) as tiempoMedio, 
                sum(Valoracion)/count(*) as valoracionMedia 
                FROM PruebasUsabilidad');

                $numHombres = $db->query("SELECT count(*) as numHombres 
                FROM PruebasUsabilidad WHERE sexo = 'H'");
                $numMujeres = $db->query("SELECT count(*) as numMujeres 
                FROM PruebasUsabilidad WHERE sexo = 'M'");
                $numOtro = $db->query("SELECT count(*) as numOtro 
                FROM PruebasUsabilidad WHERE sexo = 'O'");

                $superados = $db->query("SELECT count(*) as superados 
                FROM PruebasUsabilidad WHERE superada = 'Si'");

                $todos = $db->query("SELECT * FROM PruebasUsabilidad");
                $numeroFilas = $todos->num_rows;

                if ($numeroFilas > 0) {
                    echo "<section><h2>Informe de datos</h2>";

                    while ($row = $medias->fetch_assoc()) {
                        echo "<h3>Medias de los datos obtenidos: </h3>
                        <li> Edad media de los usuarios: " . $row['edadMedia'] . " años</li>
                        <li> Habilidad informática media de los usuarios:" . $row['habilidadMedia'] . "</li>
                        <li> Tiempo medio para realizar la tarea: " . $row['tiempoMedio'] . "</li>
                        <li> Puntuación media de la aplicación:" . $row['valoracionMedia'] . "</li>";
                    }

                    while ($row = $numHombres->fetch_assoc()) {
                        echo "<li> Media de Hombres:" . $row['numHombres'] * 100 / $numeroFilas . "%</li>";
                    }

                    while ($row = $numMujeres->fetch_assoc()) {
                        echo "<li> Media de Mujeres:" . $row['numMujeres'] * 100 / $numeroFilas . "%</li>";
                    }

                    while ($row = $numOtro->fetch_assoc()) {
                        echo "<li> Media de Otros géneros:" . $row['numOtro'] * 100 / $numeroFilas . "%</li>";
                    }

                    while ($row = $superados->fetch_assoc()) {
                        echo "<li> Porcentaje de usuarios que han completado la tarea:" . $row['superados'] * 100 / $numeroFilas . "%</li>";
                    }

                    echo "</ul></section>";
                } else {
                    echo "<section><p>Tabla vacía. Número de filas = " . $numeroFilas . "</p></section>";
                }

                $db->close();
            }

            public function cargarCSVForm()
            {
                echo "<section>
                <h2>Buscar datos en la tabla</h2>  
                <form method='post' enctype='multipart/form-data' action='#'> 
                    <label for='fileUpload'>Archivo CSV:</label>
                    <input type='file' name='file' id='fileUpload' accept='.csv'> 
                    <label for='boton'>
                    <input type='submit' class='button' id='boton' value='Cargar Datos' name='loadFile' />
                    </label>
                </form>
              </section>";
            }

            public function cargarCSV()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }
                $fileName = $_FILES["file"]["tmp_name"];

                if ($_FILES["file"]["size"] > 0) {
                    $file = fopen($fileName, "r");
                    while (($column = fgetcsv($file, 10000, ",")) !== FALSE) {
                        $id = "";
                        $nombre = "";
                        $apellidos = "";
                        $email = "";
                        $telefono = 0;
                        $edad = 0;
                        $sexo = "";
                        $habilidad = 0;
                        $tiempo = 0;
                        $superada = "";
                        $comentarios = "";
                        $propuestas = "";
                        $valoracion = 0;

                        if ($column[0] != 'Id') {
                            if (isset($column[0]))
                                $id = $column[0];
                            if (isset($column[1]))
                                $nombre = $column[1];
                            if (isset($column[2]))
                                $apellidos = $column[2];
                            if (isset($column[3]))
                                $email = $column[3];
                            if (isset($column[4]))
                                $telefono = intval($column[4]);
                            if (isset($column[5]))
                                $edad = intval($column[5]);
                            if (isset($column[6]))
                                $sexo = $column[6];
                            if (isset($column[7]))
                                $habilidad = intval($column[7]);
                            if (isset($column[8]))
                                $tiempo = intval($column[8]);
                            if (isset($column[9]))
                                $superada = $column[9];
                            if (isset($column[10]))
                                $comentarios = $column[10];
                            if (isset($column[11]))
                                $propuestas = $column[11];
                            if (isset($column[12]))
                                $valoracion = intval($column[12]);

                            $SQLQuery = $db->prepare("INSERT INTO PruebasUsabilidad (Id, Nombre, Apellidos, Correo, Telefono, Edad, Sexo, Habilidad, Tiempo, Superada, Comentarios, Propuestas, Valoracion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");

                            $SQLQuery->bind_param(
                                'ssssiisiisssi',
                                $id,
                                $nombre,
                                $apellidos,
                                $email,
                                $telefono,
                                $edad,
                                $sexo,
                                $habilidad,
                                $tiempo,
                                $superada,
                                $comentarios,
                                $propuestas,
                                $valoracion
                            );

                            $SQLQuery->execute();
                            $SQLQuery->close();

                        }
                    }
                }

                $db->close();
            }

            public function exportarCSV()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->query("SELECT * FROM PruebasUsabilidad");

                if ($SQLQuery->num_rows > 0) {
                    $filename = "PruebasUsabilidad.csv";
                    $f = fopen($filename, 'w');

                    $fields = 'Id, Nombre, Apellidos, Correo, Telefono, Edad, Sexo, Habilidad, Tiempo, Superada, Comentarios, Propuestas, Valoración' . PHP_EOL;

                    fwrite($f, utf8_decode($fields));

                    while ($row = $SQLQuery->fetch_assoc()) {
                        $lineData = $row['Id'] . ', ' . $row['Nombre'] . ', ' . $row['Apellidos'] . ', ' . $row['Correo'] . ', ' . $row['Telefono'] . ', ' . $row['Edad'] . ', ' . $row['Sexo'] . ', ' . $row['Habilidad'] . ', ' . $row['Tiempo'] . ', ' . $row['Superada'] . ', ' . $row['Comentarios'] . ', ' . $row['Propuestas'] . ', ' . $row['Valoracion'] . PHP_EOL;
                        fwrite($f, utf8_decode($lineData));
                    }

                    fclose($f);
                }
            }
        }

        session_start();
        $baseDatos = new BaseDatos();
        if (count($_POST) > 0) {
            if (isset($_POST['createdb']))
                $baseDatos->createdb();
            if (isset($_POST['createtable']))
                $baseDatos->createtable();
            if (isset($_POST['insert']))
                $baseDatos->insertarDatosForm();
            if (isset($_POST['InsertarDatos']))
                $baseDatos->insertarDatos();
            if (isset($_POST['select']))
                $baseDatos->buscarDatosForm();
            if (isset($_POST['Buscar']))
                $baseDatos->buscarDatos();
            if (isset($_POST['update']))
                $baseDatos->modificarDatosForm();
            if (isset($_POST['ModificarDatos']))
                $baseDatos->modificarDatos();
            if (isset($_POST['delete']))
                $baseDatos->eliminarDatosForm();
            if (isset($_POST['NombreEliminar']))
                $baseDatos->eliminarDatos();
            if (isset($_POST['generate']))
                $baseDatos->generarInforme();
            if (isset($_POST['loadData']))
                $baseDatos->cargarCSVForm();
            if (isset($_POST['loadFile']))
                $baseDatos->cargarCSV();
            if (isset($_POST['exportData']))
                $baseDatos->exportarCSV();
        }
        ?>
        <article>
            <h2>Acciones posibles de la base de datos</h2>
            <form action='#' method='post' name='botones'>
                <input type="submit" class='button' value="Crear Base de Datos" name="createdb" />
                <input type="submit" class='button' value="Crear Tabla" name="createtable" />
                <input type="submit" class='button' value="Insertar Datos" name="insert" />
                <input type="submit" class='button' value="Buscar Datos" name="select" />
                <input type="submit" class='button' value="Modificar Datos" name="update" />
                <input type="submit" class='button' value="Eliminar Datos" name="delete" />
                <input type="submit" class='button' value="Generar Informe" name="generate" />
                <input type="submit" class='button' value="Cargar datos desde CSV" name="loadData" />
                <input type="submit" class='button' value="Exportar datos a CSV" name="exportData" />
            </form>
        </article>
    </main>
    <footer>
        <p>Práctica PHP</p>
    </footer>
</body>