<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$user=$_POST["user"];
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$email = $_POST["email"];
$contraseña = $_POST["contraseña"];
$rol = $_POST["rol"];


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "UPDATE usuarios SET nombre='".$nombre."',
    apellidos='".$apellido."',
    email='".$email."',
    password='".$contraseña."',
    rol='".$rol."' 
    WHERE user='".$user."'";
$resultado=mysqli_query($conexion,$sql);

if(mysqli_affected_rows($conexion)<0){
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al modificar: ".mysqli_error($conexion);
}
else{
    $respuesta["error"]=0;
    $respuesta["mensaje"]="Datos modificados.";
}
echo json_encode($respuesta);
mysqli_close($conexion);
?>