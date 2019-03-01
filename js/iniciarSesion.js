//document.querySelector("#capaIniciarSesion input[type=button]").addEventListener("click", iniciarSesion);
document.querySelector("#capaIniciarSesion input[type=button]").addEventListener("click", function(){alert("iniciar sesion");});

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
        var iResultado=oUpoflix.iniciarSesion(sUsuario,sContraseña);
        switch (iResultado) {
            case 0:
                frmFormulario.txtUser.classList.add("bg-warning");
                alert("El usuario no existe");
                break;
            case 1:
                frmFormulario.txtPass.classList.add("bg-warning");
                alert("Contraseña incorrecta");
                break;
            case 2:
                inicio();
                break;
            default:
                alert("Error desconocido");
                break;
        }
    }
}

function limpiarErroresInicioSesion(){
    var oInputs=document.querySelectorAll("#capaIniciarSesion input");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}