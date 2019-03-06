<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$titulo = $_GET["titulo"];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "SELECT COUNT(*)FROM `producciones` WHERE titulo='".$titulo."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$fila = mysqli_fetch_array($resultados);
    
if ($fila[0] == 0){
    $salida ="NO_EXISTE";
} else if($fila[0] > 0) {
    $salida ="EXISTE";
}

echo $salida;

mysqli_close($conexion);
?>