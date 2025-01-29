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

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$dia = $_POST['dia'];
$mes = $_POST['mes'];

// Calcular el signo zodiacal (puedes usar tu lógica actual en JS y enviarla o replicarla en PHP)
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

$signo = calcularSigno($dia, array_search($mes, [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]) + 1);

// Insertar datos en la base de datos
$sql = "INSERT INTO consultas (nombre, dia, mes, signo) VALUES ('$nombre', '$dia', '$mes', '$signo')";

if ($conn->query($sql) === TRUE) {
    echo "Consulta guardada exitosamente.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>

