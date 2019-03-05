<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

//Recoger parametros
$user = $_REQUEST["user"];
$nombre = $_REQUEST["nombre"];
$email = $_REQUEST["email"];
$pass = $_REQUEST["password"];
$apellidos = $_REQUEST["apellidos"];
$respuesta=[];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql="INSERT INTO `usuarios`(user,nombre, apellidos,email,password,rol) VALUES ('".$user."','".$nombre."','".$apellidos."','".$email."','".$pass."','user')";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al insertar: ".mysqli_error($conexion);
}

if(sizeof($respuesta)==0){
	$respuesta["error"] = 0;
    $respuesta["mensaje"] = "Usuario creado, inicie sesión."; 
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>