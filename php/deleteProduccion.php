<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$titulo = $_POST["titulo"];
$respuesta=[];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "DELETE FROM `producciones` WHERE producciones.titulo='".$titulo."'";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al eliminar: ".mysqli_error($conexion);
}

$sql = "DELETE FROM `puntuaciones` WHERE puntuaciones.produccion='".$titulo."'";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al eliminar: ".mysqli_error($conexion);
}

$sql="DELETE FROM `directores` WHERE directores.produccion='".$titulo."'";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al eliminar: ".mysqli_error($conexion);
}

$sql="DELETE FROM `actores` WHERE actores.produccion='".$titulo."'";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al eliminar: ".mysqli_error($conexion);
}

if(sizeof($respuesta)==0){
	$respuesta["error"] = 0;
    $respuesta["mensaje"] = "Producción eliminada";
     $respuesta["titulo"]=$titulo;
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>