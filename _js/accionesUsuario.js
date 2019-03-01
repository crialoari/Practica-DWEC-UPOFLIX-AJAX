function mostrarDatosUsuario(){
	oCapaContenido.empty();
    ocultarFormularios();
	var oUsuario=oUpoflix.oUsuarioActivo;
	//capa de datos
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-6");
    oColumnaDatos.classList.add("m-auto");
    //formulario
    var oFormulario=document.createElement("form");
    oFormulario.id="frmDatosUsuario";
	//tabla
	var oTabla = document.createElement("table");
	oTabla.classList.add("table");
    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Datos de "+oUsuario.sUser;
    oCelda.colSpan=2;
    oFila.appendChild(oCelda);
    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
    //nombre
    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "Nombre";
    oCelda = oFila.insertCell(-1);
    var oInput=document.createElement("INPUT");
    oInput.type="text";
    oInput.classList.add("form-control");
    oInput.name="txtNombre";
    oInput.maxLength=15;
    oInput.value = oUsuario.sNombre;
    oInput.readOnly=true;
    oCelda.appendChild(oInput);
    //apellidos
    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "Apellido";
    oCelda = oFila.insertCell(-1);
    oInput=document.createElement("INPUT");
    oInput.type="text";
    oInput.classList.add("form-control");
    oInput.name="txtApellido";
    oInput.maxLength=15;
    oInput.value = oUsuario.sApellido;
    oInput.readOnly=true;
    oCelda.appendChild(oInput);
    //email
    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "E-mail";
    oCelda = oFila.insertCell(-1);
    oInput=document.createElement("INPUT");
    oInput.type="text";
    oInput.classList.add("form-control");
    oInput.name="txtEmail";
    oInput.value = oUsuario.sEmail;
    oInput.readOnly=true;
    oCelda.appendChild(oInput);
    //password
    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "Contraseña";
    oCelda = oFila.insertCell(-1);
    oCelda.id="password";
    var oContraseña=document.createElement("INPUT");
    oContraseña.type="password";
    oContraseña.classList.add("form-control");
    oContraseña.name="txtPassword";
    oInput.maxLength=15;
    oContraseña.value = oUsuario.sContraseña;
    oContraseña.readOnly=true;
    oCelda.appendChild(oContraseña);
    //botonmostrar
    var oBoton=document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-sm");
    oBoton.classList.add("btn-outline-warning");
    oBoton.classList.add("mt-1");
    oBoton.value="Mostrar";
    oBoton.addEventListener("click", mostrarContraseña);
    oCelda.appendChild(oBoton);
    //botones acciones
    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda = oFila.insertCell(-1);
	oBoton = document.createElement("INPUT");
	oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-warning");
    oBoton.classList.add("m-1");
    oBoton.value="Modificar datos";
    oBoton.addEventListener("click", modificarDatosUsuario);
    oCelda.appendChild(oBoton);
    oBoton = document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-outline-warning");
    oBoton.classList.add("m-1");
    oBoton.value="Borrar cuenta";
    oBoton.addEventListener("click", borrarCuentaUsuario);
    oCelda.appendChild(oBoton);
    
    oFormulario.appendChild(oTabla);
    oColumnaDatos.appendChild(oFormulario);
    oCapaContenido.appendChild(oColumnaDatos);
}

function modificarDatosUsuario(){
    //resetear input contraseña
    document.querySelector('#password input').type="password";
    //borrar botones
    var oBotones=document.querySelectorAll("#contenido table input[type=button]");
    for(var i=0; i<oBotones.length;i++){
        oBotones[i].remove();
    }
    //quitar readonly
    var oInputs=document.querySelectorAll("#contenido table input");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].readOnly=false;
    }
    var oCelda=document.querySelector("#contenido table tr:last-child td:nth-child(2)");
    var oCheckbox=document.createElement("INPUT");
    oCheckbox.type="checkbox";
    oCheckbox.name="chkbxAdmin";
    oCheckbox.value="admin";
    if(oUpoflix.oUsuarioActivo.sRol=="admin"){
        oCheckbox.checked=true;
    }
    var oLabel=document.createElement("LABEL");
    oLabel.textContent="Administrador";
    oCelda.appendChild(oCheckbox);
    oCelda.appendChild(oLabel);

    //botones acciones
    var oFila = document.querySelector("#contenido table tbody").insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda = oFila.insertCell(-1);
    var oBoton = document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-warning");
    oBoton.classList.add("m-1");
    oBoton.value="Aceptar";
    oBoton.addEventListener("click", validarDatosUsuario);
    oCelda.appendChild(oBoton);
    oBoton = document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-outline-warning");
    oBoton.classList.add("m-1");
    oBoton.value="Cancelar";
    oBoton.addEventListener("click", cancelarModificacion);
    oCelda.appendChild(oBoton);
}

function cancelarModificacion(){
    limpiarErroresDatos();
    mostrarDatosUsuario();
}

function validarDatosUsuario(){
    var frmFormulario=document.querySelector("#frmDatosUsuario");
    var bValido=true;
    var sErrores="";
    limpiarErroresDatos();
    //validar nombre
    var sNombre=frmFormulario.txtNombre.value.trim();
    var oExpReg=/^[a-zA-Z\s]{3,15}$/;
    if(!oExpReg.test(sNombre)){
        bValido=false;
        frmFormulario.txtNombre.classList.add("bg-warning");
        frmFormulario.txtNombre.focus();
        sErrores+="-El nombre debe ser alfabético entre 3 y 15 caracteres.";
    }
    //validar apellido
    var sApellido=frmFormulario.txtApellido.value.trim();
    if(!oExpReg.test(sApellido)){
        frmFormulario.txtApellido.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtApellido.focus();
            bValido=false;
        }
        sErrores+="\n-El apellido debe ser alfabético entre 3 y 15 caracteres.";
    }
    //validar email
    var sEmail=frmFormulario.txtEmail.value.trim();
    oExpReg=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if(!oExpReg.test(sEmail)){
        frmFormulario.txtEmail.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtEmail.focus();
            bValido=false;
        }
        sErrores+="\n-El email es incorrecto.";
    }
    //validar contraseña
    var sContraseña=frmFormulario.txtPassword.value.trim();
    var oExpReg=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/;
    if(!oExpReg.test(sContraseña)){
        frmFormulario.txtPassword.classList.add("bg-warning");
        if(bValido){
            frmFormulario.txtPassword.focus();
            bValido=false;
        }
        sErrores+="\n-La contraseña debe contener al menos una mayúscula, un numero y entre 6 y 15 caracteres..";
    }

    var sRol=(frmFormulario.chkbxAdmin.checked ? "admin" : "user");
    if(!bValido){
        //mostrar errores
        alert(sErrores);
    }else{
        if(oUpoflix.modificarUsuario(sNombre,sApellido,sEmail,sContraseña,sRol)){
            alert("Datos guardados");
            inicio();
            mostrarDatosUsuario();
        }
    }
}

function limpiarErroresDatos(){
    var oInputs=document.querySelectorAll("#frmDatosUsuario input");
        for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function borrarCuentaUsuario(oEvento){
	var oE = oEvento || window.event;
	oE.preventDefault();
	var bBorrar = confirm("¿Quiere borrar la cuenta y todos sus datos para siempre?");
    if (bBorrar){
    	if(oUpoflix.bajaUsuario(oUpoflix.oUsuarioActivo.sUser)){
    		alert("Usuario eliminado.");
            oUpoflix.oUsuarioActivo=null;
			inicio();
    	}else{
    		alert("Error: no se pudo eliminar el usuario, inténtelo de nuevo.");
    	}
	}
}

function mostrarContraseña(){
	var bMostrar = confirm("¿Quiere mostrar la contraseña?");
    if (bMostrar){
    	document.querySelector("input[type=password").type="text";
	}
}

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

function cerrarSesion(oEvento){
    var oE = oEvento || window.event;
    oE.preventDefault();
    var bSalir = confirm("¿Quiere cerrar sesión?");
    if (bSalir){
        oUpoflix.oUsuarioActivo=null;
        inicio();
    }
}