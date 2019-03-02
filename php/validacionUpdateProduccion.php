<?php

//Recoger parametros
$titulo=$_GET["titulo"];
$tituloAntiguo=$_GET["tituloAntiguo"];

if($titulo!=$tituloAntiguo){
	// Configuración BASE DE DATOS MYSQL
	$servidor  = "localhost";
	$basedatos = "upoflix";
	$usuario   = "root";
	$password  = "";

	// Creamos la conexión al servidor
	$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
	mysqli_set_charset($conexion,"utf8");

	$sql = "SELECT COUNT(*)FROM `producciones` WHERE titulo='".$titulo."'";
	$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

	$fila = mysqli_fetch_array($resultados);
	
	mysqli_close($conexion);

	if ($fila[0] == 0){
	    $salida ="NO_EXISTE";
	} else if($fila[0] > 0) {
	    $salida ="EXISTE";
	}

}else{
	$salida = "NO_EXISTE";
}

echo $salida;

?>