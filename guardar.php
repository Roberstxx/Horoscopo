<?php
// Configuración de conexión a la base de datos
$servername = "localhost";
$username = "root"; // Usuario por defecto en XAMPP
$password = ""; // Contraseña por defecto (vacía en XAMPP)
$database = "horoscopo_db"; // Cambia al nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

try {
    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $dia = $_POST['dia'];
    $mes = $_POST['mes'];

    // Convertir el mes de texto a número
    $meses = [
        "enero" => 1, "febrero" => 2, "marzo" => 3, "abril" => 4,
        "mayo" => 5, "junio" => 6, "julio" => 7, "agosto" => 8,
        "septiembre" => 9, "octubre" => 10, "noviembre" => 11, "diciembre" => 12
    ];
    $mesNumero = $meses[strtolower($mes)];

    // Calcular el signo zodiacal
    function calcularSigno($dia, $mes) {
        $signos = [
            "Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis",
            "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario"
        ];
        $fechas = [
            19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21
        ];
        if ($dia > $fechas[$mes - 1]) {
            return $signos[$mes % 12];
        } else {
            return $signos[$mes - 1];
        }
    }

    $signo = calcularSigno($dia, $mesNumero);

    // Obtener la fecha actual
    $fechaConsulta = date('Y-m-d H:i:s');

    // Insertar datos en la base de datos
    $sql = "INSERT INTO consultas (nombre, dia, mes, signo, fecha_consulta) VALUES ('$nombre', '$dia', '$mesNumero', '$signo', '$fechaConsulta')";

    if ($conn->query($sql) === TRUE) {
        echo "Consulta guardada exitosamente.";
    } else {
        throw new Exception("Error: " . $sql . "<br>" . $conn->error);
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

// Cerrar conexión
$conn->close();
?>
