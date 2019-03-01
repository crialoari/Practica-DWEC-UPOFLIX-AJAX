cargarDatos();
rellenarDesplegableGeneroA();
document.querySelector("#capaAddProduccion input[name=btnAñadir]").addEventListener("click",añadirProduccion);
document.querySelector("input[name=btnActorNuevo]").addEventListener("click",añadirPersonaNuevaActor);
document.querySelector("input[name=btnActorExistente]").addEventListener("click",añadirPersonaExistenteActor);
document.querySelector("input[name=btnDirectorNuevo]").addEventListener("click",añadirPersonaNuevaDirector);
document.querySelector("input[name=btnDirectorExistente]").addEventListener("click",añadirPersonaExistenteDirector);
document.querySelector("#txtModDuracion").addEventListener("keypress", soloNumeros);
limpiarErroresAñadir();

//DATEPICKER FECHA ESTRENO
$("#txtModAnio").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "+1Y",
    });

function cargarDatos(){
	var oFormulario=document.querySelector("#frmModificarProduccion");
	var sTituloAntiguo=oFormulario.dataset.titulo.replace(/-/g, " ");

	//ENVIAR TITULO
    //GET DATOS PRODUCCION
    //FORMAR HTML

    $("#txtModTitulo").val(sTituloAntiguo);
}

function cargarDatos_(){
	var oFormulario=document.querySelector("#frmModificarProduccion");
	var sTituloAntiguo=oFormulario.dataset.titulo.replace(/-/g, " ");
	var oProduccionModificar=oUpoflix.buscarProduccion(sTituloAntiguo);
	//cambiar datos
	oFormulario.txtModCartel.value=oProduccionModificar.sUrlImagen;
	oFormulario.txtModTitulo.value=oProduccionModificar.sTitulo;
	var oSelect=document.querySelector("#generoMod select");
	for(var i=0; i<oSelect.options.length;i++){
		if(oSelect.options[i].value==oProduccionModificar.sGenero)
			oSelect.selectedIndex=i;
	}

	for(var i=0; i<oProduccionModificar.aActores.length;i++){
		modificarPersonaNuevaActor();
		var oInputNombre=document.querySelector(".nuevo-actor:last-child input[name=txtNombre]");
		var oInputApellido=document.querySelector(".nuevo-actor:last-child input[name=txtApellido]");
		oInputNombre.value=oProduccionModificar.aActores[i].sNombre;
		oInputApellido.value=oProduccionModificar.aActores[i].sApellido;
	}

	for(var i=0; i<oProduccionModificar.aDirectores.length;i++){
		modificarPersonaNuevaActor();
		var oInputNombre=document.querySelector(".nuevo-director:last-child input[name=txtNombre]");
		var oInputApellido=document.querySelector(".nuevo-director:last-child input[name=txtApellido]");
		oInputNombre.value=oProduccionModificar.aDirectores[i].sNombre;
		oInputApellido.value=oProduccionModificar.aDirectores[i].sApellido;
	}

	oFormulario.txtModResumen.value=oProduccionModificar.sResumen;

	if(oProduccionModificar instanceof Serie){
		document.querySelector("#radioModSerie").checked=true;
		tipoProduccionM();
		var oBoton=document.createElement("INPUT");
	    oBoton.type="button";
	    oBoton.id="btnModTemporadas";
    	oBoton.classList.add("btn");
    	oBoton.classList.add("btn-sm");
    	oBoton.classList.add("btn-outline-success");
    	oBoton.classList.add("mr-1");
    	oBoton.value="Modificar temporadas";
    	oBoton.addEventListener("click", mostrarEditarTemporadas);
    	oFormulario.appendChild(oBoton);
	}else{
		document.querySelector("#radioModPeli").checked=true;
		tipoProduccionM();
		oFormulario.txtModAnio.value=oProduccionModificar.iAñoEstreno;
		oFormulario.txtModDuracion.value=oProduccionModificar.iDuracion;
	}
}

function soloNumeros(elEvento) {
    var oEvento = elEvento || window.event;
    var codigoChar = oEvento.charCode || oEvento.keyCode;
    var caracter = String.fromCharCode(codigoChar);
    // Cancelar comportamiento predeterminado si no es numero
    if (caracter == "0" || caracter == "1" || caracter == "2" || caracter == "3" || caracter == "4" || caracter == "5" ||
                caracter == "6" || caracter == "7" || caracter == "8" || caracter == "9"){
    }else{
        oEvento.preventDefault();
    }
}