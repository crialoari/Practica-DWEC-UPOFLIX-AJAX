document.querySelector("#capaIniciarSesion input[type=button]").addEventListener("click", iniciarSesion);

function iniciarSesion(){
    var frmFormulario=document.querySelector("#frmIniciarSesion");
    var bValido=true;
    var sErrores="";
    limpiarErroresInicioSesion();
    //validar usuario
    var sUsuario=frmFormulario.txtUser.value.trim();
    var oExpReg=/^[a-zA-Z0-9]{5,15}$/;
    if(!oExpReg.test(sUsuario)){
        bValido=false;
        frmFormulario.txtUser.classList.add("bg-warning");
        frmFormulario.txtUser.focus();
        sErrores+="-El usuario debe tener entre 5 y 15 caracteres, sin espacios.";
    }
    //validar contraseña
    var sContraseña=frmFormulario.txtPass.value.trim();
    var oExpReg=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/;
    if(!oExpReg.test(sContraseña)){
        frmFormulario.txtPass.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtPass.focus();
            bValido=false;
        }
        sErrores+="\n-La contraseña debe contener al menos una mayúscula, un numero y entre 6 y 15 caracteres.";
    }
    if(!bValido){
        //mostrar errores
        alert(sErrores);
    }else{
        sParametros="user="+sUsuario+"&password="+sContraseña;
        sParametros=encodeURI(sParametros);
        $.get("./php/getUsuario.php",sParametros,respuestaGetUsuario,'json');
    }
}

function respuestaGetUsuario(oDatos){
    if(oDatos.error==0){
        oUsuarioActivo={user:oDatos.usuario};
        oUsuarioActivo.sRol=oDatos.rol;
        inicio();
    }
    crearDialog(oDatos.mensaje);
}

function limpiarErroresInicioSesion(){
    var oInputs=document.querySelectorAll("#capaIniciarSesion input");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}