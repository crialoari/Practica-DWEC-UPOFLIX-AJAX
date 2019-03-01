<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$id = $_POST["id"];
$respuesta=[];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "DELETE FROM `personas` WHERE personas.id=".$id;
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en al eliminar: ".mysqli_error($conexion);
}

$sql="DELETE FROM `directores` WHERE directores.persona=".$id;
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en al eliminar: ".mysqli_error($conexion);
}

$sql="DELETE FROM `actores` WHERE actores.persona=".$id;
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en al eliminar: ".mysqli_error($conexion);
}

if(sizeof($respuesta)==0){
	$respuesta["error"] = 0;
    $respuesta["mensaje"] = "Persona eliminada"; 
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>