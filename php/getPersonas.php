<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "SELECT * FROM `personas`";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$datos = [];

while ($fila = mysqli_fetch_array($resultados)) {
    $datos[] = $fila;
}

echo json_encode($datos); 

mysqli_close($conexion);
?>