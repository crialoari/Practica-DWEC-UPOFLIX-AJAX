alert("hola");

cargarDatosProduccion();
rellenarDesplegableGeneroM();
document.querySelector("#capaModificarProduccion input[name=btnModificar]").addEventListener("click",editarProduccion);
document.querySelector("#capaModificarProduccion input[name=btnCancelar]").addEventListener("click",cancelarModificacion);
document.querySelector("input[name=btnActorNuevoM]").addEventListener("click",modificarPersonaNuevaActor);
document.querySelector("input[name=btnActorExistenteM]").addEventListener("click",modificarPersonaExistenteActor);
document.querySelector("input[name=btnDirectorNuevoM]").addEventListener("click",modificarPersonaNuevaDirector);
document.querySelector("input[name=btnDirectorExistenteM]").addEventListener("click",modificarPersonaExistenteDirector);
document.querySelector("#txtModDuracion").addEventListener("keypress", soloNumerosM);
limpiarErroresModificar();

//DATEPICKER FECHA ESTRENO
$("#txtModAnio").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "+1Y",
    });

function cargarDatosProduccion(){
	var oFormulario=document.querySelector("#frmModificarProduccion");
	var sTituloAntiguo=oFormulario.dataset.titulo.replace(/-/g, " ");

	//ENVIAR TITULO
    //GET DATOS PRODUCCION
    //FORMAR HTML

    $("#txtModTitulo").val(sTituloAntiguo);
}

function rellenarDesplegableGeneroM() {
    if (localStorage["generos"] != undefined) {
        $("#datosComunesMod select").html(localStorage["generos"]);
    } else {
        $.get("./php/getGeneros.php", null, procesoRespuestaGetGenerosM, 'html');
    }
}

function procesoRespuestaGetGenerosM(sHTML) {
    localStorage["generos"] = sHTML;
    $("#datosComunesMod select").html(localStorage["generos"]);
}

function editarProduccion(){
	//ENVIAR FORMULARIO
    //POST DATOS PRODUCCION
    //ACTUALIZAR
    //NOTIFICAR
}

function cancelarModificacion(){
	$(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    pedirListado();
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

function modificarPersonaNuevaActor(){
	//crear capa
	var oCapa=document.createElement("div");
	oCapa.classList.add("nuevo-actor");
	//crear formulario
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	//crear columna
	var oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	//crear input
	var oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	//input nombre
	oInput.setAttribute("name","txtNombre");
	oInput.setAttribute("placeholder","Nombre");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//input apellido
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	oInput.setAttribute("name","txtApellido");
	oInput.setAttribute("placeholder","Apellido");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//boton
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarActorNuevo");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);//evento boton
	oCapaColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oCapaColumna);
	//introducir todo
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaActoresMod").appendChild(oCapa);
}

function modificarPersonaNuevaDirector(){
	//crear capa
	var oCapa=document.createElement("div");
	oCapa.classList.add("nuevo-director");
	//crear formulario
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	//crear columna
	var oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	//crear input
	var oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	//input nombre
	oInput.setAttribute("name","txtNombre");
	oInput.setAttribute("placeholder","Nombre");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//input apellido
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	oInput.setAttribute("name","txtApellido");
	oInput.setAttribute("placeholder","Apellido");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//boton
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarDirectorNuevo");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);//evento boton
	oCapaColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oCapaColumna);

	//introducir todo
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaDirectoresMod").appendChild(oCapa);
}

function modificarPersonaExistenteActor(){
	var oCapa=document.createElement("div");
	oCapa.classList.add("elegir-actor");
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	var oColumna=document.createElement("div");
	oColumna.classList.add("col-10");
	oColumna.appendChild(getSelectPersona());
	oCapaFormulario.appendChild(oColumna);
	oColumna=document.createElement("div");
	oColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarActorExistente");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);
	oColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oColumna);
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaActoresMod").appendChild(oCapa);

}

function modificarPersonaExistenteDirector(){
	var oCapa=document.createElement("div");
	oCapa.classList.add("elegir-director");
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	var oColumna=document.createElement("div");
	oColumna.classList.add("col-10");
	oColumna.appendChild(getSelectPersona());
	oCapaFormulario.appendChild(oColumna);
	oColumna=document.createElement("div");
	oColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarDirectorExistente");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);
	oColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oColumna);
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaDirectoresMod").appendChild(oCapa);
}

function soloNumerosM(elEvento) {
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

function limpiarErroresModificar(){
	var oInputs=document.querySelectorAll("#frmModificarProduccion .bg-warning");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}