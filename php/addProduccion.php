<?php

$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$formulario = $_POST;
$respuesta = [];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos);
mysqli_set_charset($conexion,"utf8");

$sql="INSERT INTO `producciones`(`cartel`, `titulo`, `genero`, `resumen`, `estreno`, `duracion`) VALUES ('".$formulario["txtAddCartel"]."','".$formulario["txtAddTitulo"]."','".$formulario["selectGenero"]."','".$formulario["txtAddResumen"]."','".$formulario["txtAddAnio"]."',".$formulario["txtAddDuracion"].")";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al insertar: ".mysqli_error($conexion);
}

if(sizeof($respuesta)==0){
	$respuesta["error"] = 0;
    $respuesta["mensaje"] = "Producción añadida."; 

    //añadir personas actores
    if(isset($formulario["txtNombreNA"]))
	    for($i=0;$i<sizeof($formulario["txtNombreNA"]);$i++){
	    	//comprobar si exite
	    	$sql = "SELECT id FROM `personas` WHERE nombre='".$formulario["txtNombreNA"][$i]."' AND apellidos='".$formulario["txtApellidoNA"][$i]."'";
			$resultados = mysqli_query($conexion,$sql);
			$rowcount=mysqli_num_rows($resultados);
			if($rowcount==0){
				//Si no existe
				$sql="INSERT INTO `personas`(`nombre`, `apellidos`) VALUES ('".$formulario["txtNombreNA"][$i]."','".$formulario["txtApellidoNA"][$i]."')";
				$resultado = mysqli_query($conexion,$sql);
				
				$actor=mysqli_insert_id($conexion);
				$sql="INSERT INTO `actores`(`produccion`, `persona`) VALUES ('".$formulario["txtAddTitulo"]."',".$actor.")";
				$resultado = mysqli_query($conexion,$sql);
			}else{
				//Si existe
				$fila = mysqli_fetch_array($resultados);
				$sql="INSERT INTO `actores`(`produccion`, `persona`) VALUES ('".$formulario["txtAddTitulo"]."',".$fila[0].")";
				$resultado = mysqli_query($conexion,$sql);
			}
	    }

    //añadir personas directores
	if(isset($formulario["txtNombreND"]))
	    for($i=0;$i<sizeof($formulario["txtNombreND"]);$i++){
	    	//comprobar si exite
	    	$sql = "SELECT id FROM `personas` WHERE nombre='".$formulario["txtNombreND"][$i]."' AND apellidos='".$formulario["txtApellidoND"][$i]."'";
			$resultados = mysqli_query($conexion,$sql);
			$rowcount=mysqli_num_rows($resultados);
			if($rowcount==0){
				//Si no existe
				$sql="INSERT INTO `personas`(`nombre`, `apellidos`) VALUES ('".$formulario["txtNombreND"][$i]."','".$formulario["txtApellidoND"][$i]."')";
				$resultado = mysqli_query($conexion,$sql);
				$director=mysqli_insert_id($conexion);
				$sql="INSERT INTO `directores`(`produccion`, `persona`) VALUES ('".$formulario["txtAddTitulo"]."',".$director.")";
				$resultado = mysqli_query($conexion,$sql);
			}else{
				//Si existe
				$fila = mysqli_fetch_array($resultados);
				$sql="INSERT INTO `directores`(`produccion`, `persona`) VALUES ('".$formulario["txtAddTitulo"]."',".$fila[0].")";
				$resultado = mysqli_query($conexion,$sql);
			}
	    }

    //añadir actores
	if(isset($formulario["selectA"])) 
    foreach ($formulario["selectA"] as $key => $actor) {
    	$sql="INSERT INTO `actores`(`produccion`, `persona`) VALUES ('".$formulario["txtAddTitulo"]."',".$actor.")";
		$resultado = mysqli_query($conexion,$sql);
    }

    //añadir directores
    if(isset($formulario["selectD"])) 
    foreach ($formulario["selectD"] as $key => $director) {
    	$sql="INSERT INTO `directores`(`produccion`, `persona`) VALUES ('".$formulario["txtAddTitulo"]."',".$director.")";
		$resultado = mysqli_query($conexion,$sql);
    }
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>