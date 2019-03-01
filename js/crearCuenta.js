//document.querySelector("#capaCrearCuenta input[type=button]").addEventListener("click", crearCuenta);
document.querySelector("#capaCrearCuenta input[type=button]").addEventListener("click", function(){alert("crear cuenta");});

function crearCuenta(){
    var frmFormulario=document.querySelector("#frmCrearCuenta");
    var bValido=true;
    var sErrores="";
    limpiarErroresCrearCuenta();
    //validar usuario
    var sUsuario=frmFormulario.txtNUser.value.trim();
    var oExpReg=/^[a-zA-Z0-9]{5,15}$/;
    if(!oExpReg.test(sUsuario)){
        bValido=false;
        frmFormulario.txtNUser.classList.add("bg-warning");
        frmFormulario.txtNUser.focus();
        sErrores+="-El usuario debe tener entre 5 y 15 caracteres, sin espacios.";
    }
    //validar nombre
    var sNombre=frmFormulario.txtNNombre.value.trim();
    var oExpReg=/^[a-zA-Z\s]{3,15}$/;
    if(!oExpReg.test(sNombre)){
        frmFormulario.txtNNombre.classList.add("bg-warning");
        if(bValido){
        frmFormulario.txtNNombre.focus();
        bValido=false;
        }
        sErrores+="-El nombre debe ser alfabético entre 3 y 15 caracteres.";
    }
    //validar apellido
    var sApellido=frmFormulario.txtNApellido.value.trim();
    if(!oExpReg.test(sApellido)){
        frmFormulario.txtNApellido.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtNApellido.focus();
            bValido=false;
        }
        sErrores+="-El apellido debe ser alfabético entre 5 y 15 caracteres.";
    }
    //validar email
    var sEmail=frmFormulario.txtNEmail.value.trim();
    oExpReg=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if(!oExpReg.test(sEmail)){
        frmFormulario.txtNEmail.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtNEmail.focus();
            bValido=false;
        }
        sErrores+="\n-El email es incorrecto.";
    }
    //validar contraseña
    var sContraseña=frmFormulario.txtNPassword.value.trim();
    var oExpReg=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/;
    if(!oExpReg.test(sContraseña)){
        frmFormulario.txtNPassword.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtNPassword.focus();
            bValido=false;
        }
        sErrores+="\n-La contraseña debe contener al menos una mayúscula, un numero y entre 6 y 15 caracteres..";
    }
    if(!bValido){
        //mostrar errores
        alert(sErrores);
    }else{
        var oUsuario=new Usuario(sUsuario,sNombre,sApellido,sEmail,sContraseña,new Date(),"user");
        if(oUpoflix.altaUsuario(oUsuario)){
            alert("Cuenta creada. Iniciando sesión...");
            oUpoflix.oUsuarioActivo=oUsuario;
            inicio();
        }else{
            frmFormulario.txtNUser.classList.add("bg-warning");
            alert("El nombre de usuario ya existe. Inicia sesión o escoge un nombre nuevo.");
        }
    }
}

function limpiarErroresCrearCuenta(){
    var oInputs=document.querySelectorAll("#capaCrearCuenta input");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}