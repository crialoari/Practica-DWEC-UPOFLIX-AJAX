<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT * FROM `personas`";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$datos = [];

while ($fila = mysqli_fetch_array($resultados)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    $datos[] = $fila;
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($datos); 

mysqli_close($conexion);
?>