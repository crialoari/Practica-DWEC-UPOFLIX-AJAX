document.querySelector("#capaCrearCuenta input[type=button]").addEventListener("click", crearCuenta);

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
    var oExpReg=/^[a-zA-ZÀ-ÿ\u00f1\u00d1]{3,15}$/;
    if(!oExpReg.test(sNombre)){
        frmFormulario.txtNNombre.classList.add("bg-warning");
        if(bValido){
        frmFormulario.txtNNombre.focus();
        bValido=false;
        }
        sErrores+="\n-El nombre debe ser alfabético entre 3 y 15 caracteres.";
    }
    //validar apellido
    var sApellido=frmFormulario.txtNApellido.value.trim();
    if(!oExpReg.test(sApellido)){
        frmFormulario.txtNApellido.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtNApellido.focus();
            bValido=false;
        }
        sErrores+="\n-El apellido debe ser alfabético entre 5 y 15 caracteres.";
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
        var sParametros = "user=" + sUsuario;
        sParametros += "&nombre=" + sNombre;
        sParametros += "&apellidos=" + sApellido;
        sParametros += "&email=" + sEmail;
        sParametros += "&password=" + sContraseña;
        sParametros = encodeURI(sParametros);
		$.ajax({
	        url: "./php/validacionUsuario.php",
	        type: "GET",
	        async: false,
	        data: sParametros,
	        dataType: "text",
	        success: procesoRespuestaValidarUsuario
        });
    
        if(!UsuarioExiste){
            $.post("./php/addUsuario.php", sParametros, respuestañadirUsuario, 'json');
        }else{
            crearDialog("El usuario ya existe");
        }
    }
}

function respuestañadirUsuario(oDatos, sStatus, oXHR) {
    if (oDatos.error == 0)
        cargarIniciarSesion();
	crearDialog(oDatos.mensaje);
}

function procesoRespuestaValidarUsuario(sRespuesta) {
    if (sRespuesta == "EXISTE") {
        UsuarioExiste = true;
    } else {
        UsuarioExiste = false;
    }
}

function limpiarErroresCrearCuenta(){
    var oInputs=document.querySelectorAll("#capaCrearCuenta input");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}