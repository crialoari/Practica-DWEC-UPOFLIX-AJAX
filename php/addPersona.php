<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

//Recoger parametros
$nombre = $_POST["nombre"];
$apellidos = $_POST["apellidos"];
$respuesta=[];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql="INSERT INTO `personas`(`nombre`, `apellidos`) VALUES ('".$nombre."','".$apellidos."')";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en al insertar: ".mysqli_error($conexion);
}

if(sizeof($respuesta)==0){
	$respuesta["error"] = 0;
    $respuesta["mensaje"] = "Persona añadida"; 
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>