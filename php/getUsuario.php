<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$respuesta=[];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
$user = $_REQUEST["user"];
$pass = $_REQUEST["password"];

$sql = "SELECT * FROM `usuarios` WHERE user='".$user."'";
$resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

if(mysqli_num_rows($resultado)==0){
    $respuesta["error"]=1;
    $respuesta["mensaje"]="Usuario no encontrado";
}
else{
    $sql="SELECT * FROM usuarios WHERE user='".$user."' AND password='".$pass."'";
    $resultado=mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    if(mysqli_num_rows($resultado)==0){
        $respuesta["error"]=2;
        $respuesta["mensaje"]="Contraseña incorrecta";
    }
    else{
        $usuario=mysqli_fetch_array($resultado);
        $respuesta["error"]=0;
        $respuesta["usuario"]=$usuario['user'];
        $respuesta["rol"]=$usuario['rol'];
        $respuesta["mensaje"]="¡Bienvenid@ ".$usuario['user']."!";
    }
}
echo json_encode($respuesta);

mysqli_close($conexion);
?>