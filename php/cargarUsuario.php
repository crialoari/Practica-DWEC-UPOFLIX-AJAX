<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$user=$_GET['user'];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql='SELECT * FROM usuarios WHERE user="'.$user.'"';
$resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$respuesta=mysqli_fetch_array($resultado);
echo json_encode($respuesta);

mysqli_close($conexion);

?>