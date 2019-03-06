<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$user=$_GET["usuario"];
$titulo=$_GET["titulo"];
$respuesta=[];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql="SELECT * FROM puntuaciones WHERE usuario='".$user."' AND produccion='".$titulo."'";
$respuesta['sql']=$sql;
$resultado = mysqli_query($conexion,$sql);
if(mysqli_num_rows($resultado)>0){
    $respuesta["bFavorito"]=true;
}
else{
    $respuesta["bFavorito"]=false;
}
echo json_encode($respuesta);

mysqli_close($conexion);

?>