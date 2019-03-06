<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$user = $_GET["usuario"];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "SELECT * FROM `puntuaciones` INNER JOIN producciones ON producciones.titulo=puntuaciones.produccion WHERE usuario='".$user."'";
$resultados = mysqli_query($conexion,$sql);

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';

while ($fila = mysqli_fetch_array($resultados)) {
		$XML .='<produccion>';
        $XML .='<cartel>'.$fila["cartel"].'</cartel>';
        $XML .='<titulo>'.$fila["titulo"].'</titulo>';
        $XML .='<genero>'.$fila["genero"].'</genero>';
		$XML .='<resumen>'.$fila["resumen"].'</resumen>';
		$XML .='<estreno>'.$fila["estreno"].'</estreno>';
		$XML .='<duracion>'.$fila["duracion"].'</duracion>';
		$XML .='<puntuacion>'.$fila["nota"].'</puntuacion>';
		$XML .='<actores>';
				$sql_actores="SELECT personas.id,personas.nombre,personas.apellidos FROM `actores` INNER JOIN personas ON actores.persona=personas.id WHERE produccion='".$fila["titulo"]."'";
				$resultado_actores=mysqli_query($conexion,$sql_actores);
				while ($fila_actores = mysqli_fetch_array($resultado_actores)) {
					$XML .='<actor>';
					$XML .='<id>'.$fila_actores["id"].'</id>';
					$XML .='<nombre>'.$fila_actores["nombre"].'</nombre>';
					$XML .='<apellidos>'.$fila_actores["apellidos"].'</apellidos>';
					$XML .='</actor>';
				}
		$XML .='</actores>';
		$XML .='<directores>';
				$sql_directores="SELECT personas.id,personas.nombre,personas.apellidos FROM `directores` INNER JOIN personas ON directores.persona=personas.id WHERE produccion='".$fila["titulo"]."'";
				$resultado_directores=mysqli_query($conexion,$sql_directores);
				while ($fila_directores = mysqli_fetch_array($resultado_directores)) {
					$XML .='<director>';
					$XML .='<id>'.$fila_directores["id"].'</id>';
					$XML .='<nombre>'.$fila_directores["nombre"].'</nombre>';
					$XML .='<apellidos>'.$fila_directores["apellidos"].'</apellidos>';
					$XML .='</director>';
				}
		$XML .='</directores>';
		$XML .='</produccion>';
	}
//$XML .='<sql>'.$sql.'</sql>';
$XML .='</datos>';

header("Content-Type: text/xml");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo $XML;

mysqli_close($conexion);
?>