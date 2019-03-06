<?php
$servidor  = "localhost";
$basedatos = "upoflix";
$usuario   = "root";
$password  = "";

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT * FROM `generos` ORDER BY `generos`.`genero` ASC ";
$resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$optionsGeneros = "<option value='0'>Selecciona...</option>";

while ($fila = mysqli_fetch_array($resultado)) {
    $optionsGeneros .= '<option value="'.$fila["genero"].'">'.$fila["genero"].'</option>';
}

// función de PHP que convierte a formato JSON el array.
echo $optionsGeneros; 

mysqli_close($conexion);
?>