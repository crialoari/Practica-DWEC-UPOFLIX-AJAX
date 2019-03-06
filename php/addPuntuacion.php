<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$nota=$_POST['nota'];
$titulo=$_POST['titulo'];
$user=$_POST['usuario'];
$respuesta=[];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql="SELECT * FROM puntuaciones WHERE usuario='".$user."' AND produccion='".$titulo."'";
$resultado = mysqli_query($conexion,$sql);
if(mysqli_num_rows($resultado)==0){
    $sql="INSERT INTO puntuaciones(nota,usuario,produccion) VALUES('".$nota."','".$user."','".$titulo."');";
    $resultado=mysqli_query($conexion,$sql);
    if(mysqli_affected_rows($conexion)<0){
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error al añadir: ".mysqli_error($conexion);
    }
    else{
        $respuesta["error"]=0;
        $respuesta["mensaje"]="Película añadida a tu lista.";
    }
}
else{
    $sql="UPDATE puntuaciones SET nota='".$nota."' WHERE usuario='".$user."' AND produccion='".$titulo."'";
    $resultado=mysqli_query($conexion,$sql);
    if(mysqli_affected_rows($conexion)<0){
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error al actualizar la puntuacion: ".mysqli_error($conexion);
    }
    else{
        $respuesta["error"]=0;
        $respuesta["mensaje"]="Puntuación cambiada.";
    }
}
echo json_encode($respuesta);

mysqli_close($conexion);
?>
