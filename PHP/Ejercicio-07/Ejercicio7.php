<!DOCTYPE html>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />

    <meta name="author" content="Álex Caso Díaz" />
    <meta name="description" content="Página web del Ejercicio 7 de PHP" />

    <title>Ejercicio 7</title>

    <link rel="stylesheet" type="text/css" href="Ejercicio7.css" />
</head>

<body>
    <header>
        <h1>Base de Datos sobre Fórmula 1</h1>
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
                $this->database = "formula1";
            }

            public function standings()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare('SELECT piloto.Nombre as nombre, piloto.Apellido as apellido, equipo.Nombre as equipo, sum(carrera.Puntos) as puntos FROM carrera, piloto, equipo WHERE carrera.IdPiloto = piloto.Id AND piloto.IdEquipo = equipo.Id GROUP BY carrera.IdPiloto ORDER BY sum(carrera.Puntos) DESC');
                $SQLQuery->execute();
                $result = $SQLQuery->get_result();

                if ($result->num_rows > 0) {
                    echo "<section>
                    <h2>Clasificación de pilotos: </h2>
                    <table>
                        <tr>
                         <th>Piloto</th>
                         <th>Equipo</th>
                         <th>Puntos</th>
                        </tr>";

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                        <td>" . $row['nombre'] . " " . $row['apellido'] . "</td>
                        <td>" . $row['equipo'] . "</td>
                        <td>" . $row['puntos'] . "</td>
                       </tr>";
                    }
                    echo "</table>
                    </section>";
                } else {
                    echo "<section><p>No se han encontrado resultados. Número de filas = " . $result->num_rows . "</p></section>";
                }

                $db->close();
            }

            public function constructorStandings()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare('SELECT equipo.Nombre as equipo, equipo.motor as motor, sum(carrera.Puntos) as puntos FROM carrera, piloto, equipo WHERE carrera.IdPiloto = piloto.Id AND piloto.IdEquipo = equipo.Id GROUP BY equipo.Id ORDER BY sum(carrera.Puntos) DESC');
                $SQLQuery->execute();
                $result = $SQLQuery->get_result();

                if ($result->num_rows > 0) {
                    echo "<section>
                    <h2>Clasificación de constructores: </h2>
                    <table>
                        <tr>
                         <th>Equipo</th>
                         <th>Motor</th>
                         <th>Puntos</th>
                        </tr>";

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                        <td>" . $row['equipo'] . "</td>
                        <td>" . $row['motor'] . "</td>
                        <td>" . $row['puntos'] . "</td>
                       </tr>";
                    }
                    echo "</table>
                    </section>";
                } else {
                    echo "<section><p>No se han encontrado resultados. Número de filas = " . $result->num_rows . "</p></section>";
                }

                $db->close();
            }

            public function driversStats()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare('SELECT piloto.Nombre as piloto, piloto.apellido as apellido, 
                sum(carrera.Posicion) as posicion 
                FROM carrera, piloto 
                WHERE carrera.IdPiloto = piloto.Id 
                GROUP BY piloto.id
                ORDER BY sum(carrera.posicion) ASC');
                $SQLQuery->execute();
                $result = $SQLQuery->get_result();

                $carreras = $db->query("SELECT DISTINCT IdCircuito FROM Carrera");
                $numCarreras = $carreras->num_rows;

                if ($result->num_rows > 0) {
                    echo "<section>
                    <h2>Posición media de cada piloto: </h2>
                    <table>
                        <tr>
                         <th>Piloto</th>
                         <th>Posición media</th>
                        </tr>";

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                        <td>" . $row['piloto'] . " " . $row['apellido'] . "</td>
                        <td>" . $row['posicion'] / $numCarreras . "</td>
                       </tr>";
                    }
                    echo "</table>
                    ";
                }

                $PilotosContinente = $db->prepare('SELECT pais.Continente as continente, count(piloto.Nombre) as piloto 
                FROM pais, piloto 
                WHERE piloto.IdPais = pais.Id
                GROUP BY pais.Continente');

                $PilotosContinente->execute();
                $result = $PilotosContinente->get_result();

                if ($result->num_rows > 0) {
                    echo "
                            <h2>Número de pilotos por continente: </h2>
                            <table>
                                <tr>
                                <th>Continente</th>
                                <th>Numero de pilotos</th>
                                </tr>";

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>" . $row['continente'] . "</td>
                                <td>" . $row['piloto'] . "</td>
                              </tr>";
                    }
                    echo "</table>
                            </section>";
                }

                $db->close();
            }

            public function constructorStats()
            {
                $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

                if ($db->connect_errno) {
                    exit("<p>Se ha producido un error:" . $db->connect_error . "</p>");
                }

                $SQLQuery = $db->prepare('SELECT motor as motor, count(nombre) as numero FROM equipo GROUP BY equipo.Motor');
                $SQLQuery->execute();
                $result = $SQLQuery->get_result();

                if ($result->num_rows > 0) {
                    echo "<section>
                    <h2>Número de motores que monta cada equipo: </h2>
                    <table>
                        <tr>
                         <th>Motor</th>
                         <th>Equipos</th>
                        </tr>";

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                        <td>" . $row['motor'] . "</td>
                        <td>" . $row['numero'] . "</td>
                       </tr>";
                    }
                    echo "</table>
                    ";
                }

                $victoriasEquipo = $db->prepare('SELECT equipo.Nombre as equipo, count(carrera.IdCircuito) as victorias
                FROM equipo, piloto, carrera 
                WHERE piloto.IdEquipo = equipo.Id AND piloto.id = carrera.IdPiloto AND carrera.Posicion = 1 
                GROUP BY equipo.Id');

                $victoriasEquipo->execute();
                $result = $victoriasEquipo->get_result();

                $carreras = $db->query("SELECT DISTINCT IdCircuito FROM Carrera");
                $numCarreras = $carreras->num_rows;

                if ($result->num_rows > 0) {
                    echo "
                            <h2>Victorias de cada equipo: </h2>
                            <table>
                                <tr>
                                <th>Equipo</th>
                                <th>Numero de victorias</th>
                                <th>Porcentaje de victoria</th>
                                </tr>";

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>" . $row['equipo'] . "</td>
                                <td>" . $row['victorias'] . "</td>
                                <td>" . $row['victorias'] / $numCarreras . "</td>
                              </tr>";
                    }
                    echo "</table>
                            </section>";
                }

                $db->close();
            }

        }

        session_start();
        $baseDatos = new BaseDatos();
        if (count($_POST) > 0) {
            if (isset($_POST['standings']))
                $baseDatos->standings();
            if (isset($_POST['cStandings']))
                $baseDatos->constructorStandings();
            if (isset($_POST['driversStats']))
                $baseDatos->driversStats();
            if (isset($_POST['teamsStats']))
                $baseDatos->constructorStats();

        }
        ?>
        <article>
            <h2>Acciones posibles de la base de datos</h2>
            <form action='#' method='post' name='botones'>
                <input type="submit" class='button' value="Clasificación de Pilotos" name="standings" />
                <input type="submit" class='button' value="Clasificación de Equipos" name="cStandings" />
                <input type="submit" class='button' value="Estadísticas de los pilotos" name="driversStats" />
                <input type="submit" class='button' value="Estadísticas equipos" name="teamsStats" />
            </form>
        </article>
    </main>
    <footer>
        <p>Práctica PHP</p>
    </footer>
</body>