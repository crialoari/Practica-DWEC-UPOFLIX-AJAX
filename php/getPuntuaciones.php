<?php
function getPuntuacion($titulo){
	$servidor  = "localhost";
	$basedatos = "upoflix";
	$usuario   = "root";
	$password  = "";

	$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
	mysqli_set_charset($conexion,"utf8");

	$total=0;
	$media=0;
	$num_puntuaciones=0;
	$sql="SELECT nota FROM `puntuaciones` WHERE produccion='".$titulo."'";
	$resultado = mysqli_query($conexion,$sql);
	while ($fila = mysqli_fetch_array($resultado)) {
		if($fila["nota"]>0){
			$total+=$fila["nota"];
			$num_puntuaciones++;	
		}
	}
	if($total<>0){
		$media=$total/$num_puntuaciones;
	}
	mysqli_close($conexion);
	return $media;
}
?>