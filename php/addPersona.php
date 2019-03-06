<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$nombre = $_REQUEST["nombre"];
$apellidos = $_REQUEST["apellidos"];
$respuesta=[];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql="INSERT INTO `personas`(`nombre`, `apellidos`) VALUES ('".$nombre."','".$apellidos."')";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al insertar: ".mysqli_error($conexion);
}

if(sizeof($respuesta)==0){
	$respuesta["error"] = 0;
    $respuesta["mensaje"] = "Persona añadida."; 
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>