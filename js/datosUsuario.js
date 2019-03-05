function mostrarDatosUsuario(){
    var sParametros="user="+oUsuarioActivo.user;
    $.ajax({
        url: './php/cargarUsuario.php',
        type: 'GET',
        async:false,
        dataType:'json',
        data:sParametros,
        success:function(oDatos){
            oUsuarioActivo.sNombre=oDatos.nombre;
            oUsuarioActivo.sApellido=oDatos.apellidos;
            oUsuarioActivo.sContraseña=oDatos.password;
            oUsuarioActivo.sEmail=oDatos.email;
            oUsuarioActivo.sRol=oDatos.rol;
        }
    });
	
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
    oCelda.textContent = "Datos de "+oUsuarioActivo.user;
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
    oInput.value = oUsuarioActivo.sNombre;
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
    oInput.value = oUsuarioActivo.sApellido;
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
    oInput.value = oUsuarioActivo.sEmail;
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
    oContraseña.value = oUsuarioActivo.sContraseña;
    oContraseña.readOnly=true;
    oCelda.appendChild(oContraseña);
    //botonmostrar
    var oBoton=document.createElement("INPUT");
    oBoton.type="button";
    oBoton.id="btnMostrarPass";
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
    if(oUsuarioActivo.sRol=="admin"){
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
    cargarDatosUsuario();
}

function validarDatosUsuario(){
    var frmFormulario=document.querySelector("#frmDatosUsuario");
    var bValido=true;
    var sErrores="";
    limpiarErroresDatos();
    //validar nombre
    var sNombre=frmFormulario.txtNombre.value.trim();
    var oExpReg=/^[a-zA-ZÀ-ÿ\u00f1\u00d1]{3,15}$/;
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
        var sParamentros="user="+oUsuarioActivo.user
            +"&contraseña="+sContraseña
            +"&nombre="+sNombre
            +"&apellido="+sApellido
            +"&email="+sEmail
            +"&rol="+sRol;
        $.post("./php/editarUsuario.php",sParamentros,respuestaEditarUsuario,'json');
    }
}
function respuestaEditarUsuario(oDatos){
    if(oDatos.error==0){
        cargarDatosUsuario();
        inicio();
        
    }
    crearDialog(oDatos.mensaje);
}

function limpiarErroresDatos(){
    var oInputs=document.querySelectorAll("#frmDatosUsuario input");
        for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function borrarCuentaUsuario(){
    var capaDialog="<div title='Alerta'><p>¿Quiere borrar la cuenta y todos sus datos para siempre?</p></div>";
    $(capaDialog).dialog({
      resizable:false,
      modal: true,
      buttons: {
        Aceptar: function() {
            var sParamentros="user="+oUsuarioActivo.user;
            $.post("./php/borrarUsuario.php",sParametros,respuestaBorrarUsuario,'json');
            $( this ).dialog("close");
        },
        Cancelar: function() {
          $( this ).dialog("close");
        }
      }
    });
}

function respuestaBorrarUsuario(oDatos){
    if(oDatos.error==0){
        oUsuarioActivo=null;
        inicio();
    }
    crearDialog(oDatos.mensaje);
}

function mostrarContraseña(){
    if(document.querySelector("input[name=txtPassword").type=="password"){
        var capaDialog="<div title='Alerta'><p>¿Quiere mostrar la contraseña?</p></div>";
        $(capaDialog).dialog({
          resizable:false,
          modal: true,
          buttons: {
            Aceptar: function() {
                document.querySelector("input[name=txtPassword").type="text";
                $("#btnMostrarPass").val("Ocultar");
                $( this ).dialog("close");
            },
            Cancelar: function() {
              $( this ).dialog("close");
            }
          }
        });
    }
    else{
        $("#btnMostrarPass").val("Mostrar");
        document.querySelector("input[name=txtPassword").type="password";
    }
}

function limpiarErroresCrearCuenta(){
    var oInputs=document.querySelectorAll("#capaCrearCuenta input");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function limpiarErroresInicioSesion(){
    var oInputs=document.querySelectorAll("#capaIniciarSesion input");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}