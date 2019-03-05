<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$user = $_POST["usuario"];
$titulo=$_POST["titulo"];
$respuesta=[];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "DELETE FROM `puntuaciones` WHERE usuario='".$user."' AND produccion='".$titulo."'";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_affected_rows($conexion)<0){
	$respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al eliminar: ".mysqli_error($conexion);
}
else{
    $respuesta["error"]=0;
    $respuesta["mensaje"]="Película eliminada de tu lista.";
}
echo json_encode($respuesta);

mysqli_close($conexion);

?>