<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$id = $_POST["id"];
$nuevoNombre = $_POST["nuevoNombre"];
$nuevoApellidos = $_POST["nuevoApellidos"];
$respuesta=[];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "SELECT COUNT(*) FROM `personas` WHERE nombre='".$nuevoNombre."' AND apellidos='".$nuevoApellidos."'";
$resultados = mysqli_query($conexion,$sql);
$fila = mysqli_fetch_array($resultados);
if ($fila[0] == 0){
	$sql = "UPDATE `personas` SET `nombre`='".$nuevoNombre."',`apellidos`='".$nuevoApellidos."' WHERE personas.id=".$id;
	$resultado = mysqli_query($conexion,$sql);
	if(mysqli_affected_rows($conexion)<0){
		$respuesta["error"] = 1;
	    $respuesta["mensaje"] = "Error al editar: ".mysqli_error($conexion);
	}
}else{
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Ya existe una persona con esos datos";
}

if(sizeof($respuesta)==0){
	$respuesta["error"] = 0;
    $respuesta["mensaje"] = "Persona editada"; 
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>