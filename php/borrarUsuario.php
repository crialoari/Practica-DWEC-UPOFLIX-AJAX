<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$user=$_POST["user"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql="DELETE FROM usuarios WHERE user='".$user."'";
$resultado=mysqli_query($conexion,$sql);

if(mysqli_affected_rows($conexion)<0){
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al borrar: ".mysqli_error($conexion);
}
else{
    $respuesta["error"]=0;
    $respuesta["mensaje"]="Cuenta borrada.";
}
echo json_encode($respuesta);
mysqli_close($conexion);
?>