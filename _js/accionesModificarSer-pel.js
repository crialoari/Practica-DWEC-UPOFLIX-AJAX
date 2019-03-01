function editar(oEvento){
	//borrar otros contenidos
	oCapaContenido.empty();
    ocultarFormularios();
	//borrar capas anteriores
    if(document.querySelector("#generoMod select")!=null)
    	document.querySelector("#generoMod select").remove();

    var aAñadirPersona=document.querySelectorAll("#capaModificarProduccion .elegir-actor");
    for(var i=0;i<aAñadirPersona.length;i++){
    	aAñadirPersona[i].remove();
    }
    aAñadirPersona=document.querySelectorAll("#capaModificarProduccion .elegir-director");
    for(var i=0;i<aAñadirPersona.length;i++){
    	aAñadirPersona[i].remove();
    }
    aAñadirPersona=document.querySelectorAll("#capaModificarProduccion .nuevo-actor");
    for(var i=0;i<aAñadirPersona.length;i++){
    	aAñadirPersona[i].remove();
    }
    aAñadirPersona=document.querySelectorAll("#capaModificarProduccion .nuevo-director");
    for(var i=0;i<aAñadirPersona.length;i++){
    	aAñadirPersona[i].remove();
    }
	if(document.querySelector("#btnModTemporadas")!=null)
    	document.querySelector("#btnModTemporadas").remove();
    //borrar marcas de errores
    limpiarErroresModificar();
    //preparar capa modificar
    document.querySelector("#capaModificarProduccion>div").classList.remove("d-none");
    document.querySelector("#radioModPeli").addEventListener("click", tipoProduccionM);
	document.querySelector("#radioModSerie").addEventListener("click",tipoProduccionM);
	document.querySelector("#txtModAnio").addEventListener("keypress", soloNumeros);
	document.querySelector("#txtModAnio").addEventListener("keypress", soloNumeros);
	document.querySelector("#generoMod").appendChild(getSelectAddGenero());
	document.querySelector("#capaModificarProduccion input[name=btnModificar]").addEventListener("click",editarProduccion);
	document.querySelector("#capaModificarProduccion input[name=btnCancelar]").addEventListener("click",cancelarModificacion);
	document.querySelector("input[name=btnActorNuevoM]").addEventListener("click",modificarPersonaNuevaActor);
	document.querySelector("input[name=btnActorExistenteM]").addEventListener("click",modificarPersonaExistenteActor);
	document.querySelector("input[name=btnDirectorNuevoM]").addEventListener("click",modificarPersonaNuevaDirector);
	document.querySelector("input[name=btnDirectorExistenteM]").addEventListener("click",modificarPersonaExistenteDirector);

	//para poder identificar la produccion
	var oE = oEvento || window.event;
	document.querySelector("#frmModificarProduccion").dataset.titulo=oE.target.parentElement.dataset.produccion;
	cargarDatos();
}

function cargarDatos(){
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

function cancelarModificacion(){
	var oFormulario=document.querySelector("#frmModificarProduccion");
	var sTituloAntiguo=oFormulario.dataset.titulo.replace(/-/g, " ");
	var oProduccionModificar=oUpoflix.buscarProduccion(sTituloAntiguo);
	if(oProduccionModificar instanceof Serie)
		listarSeries();
	else
		listarPelis();
}

function editarProduccion(){
	var oFormulario=document.querySelector("#frmModificarProduccion");
	var sTituloAntiguo=oFormulario.dataset.titulo.replace(/-/g, " ");
	//var oProduccionModificar=oUpoflix.buscarProduccion(sTituloAntiguo);
	limpiarErroresModificar();
	//validar formulario
	var bValido=true;
    var sErrores="";
	//validar url
	var sUrlCartel=oFormulario.txtModCartel.value.trim();
    if(sUrlCartel!=""){
    	var oExpReg=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
	    if(!oExpReg.test(sUrlCartel)){
	        bValido=false;
	        oFormulario.txtModCartel.classList.add("bg-warning")
	        oFormulario.txtModCartel.focus();
	        sErrores+="-El cartel debe ser una url de imagen correcta.";
	    }
	}
	//validar titulo
	var sTitulo=oFormulario.txtModTitulo.value.trim();
    if(sTitulo==""){
        oFormulario.txtModTitulo.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtModTitulo.focus();
            bValido=false;
        }
        sErrores+="\n-El campo título no puede estar vacío.";
    }
	//recoger genero
	var sGenero=oFormulario.selectGenero.value;
	//validar resumen
	var sResumen=oFormulario.txtModResumen.value.trim();
    if(sResumen==""){
        oFormulario.txtModResumen.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtModResumen.focus();
            bValido=false;
        }
        sErrores+="\n-El campo resumen no puede estar vacío.";
    }

    var aActoresNuevos=[];
	//recoger actores nuevos
	var aAñadirPersona=document.querySelectorAll("#capaActoresMod .nuevo-actor");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var sNombre=aAñadirPersona[i].querySelector("input[name=txtNombre").value.trim();
    	var sApellido=aAñadirPersona[i].querySelector("input[name=txtApellido").value.trim();
		//validar actores nuevos
		var bValido=true;
		if(sNombre==""){
			bValido=false;
			aAñadirPersona[i].querySelector("input[name=txtNombre").classList.add("bg-warning");
			aAñadirPersona[i].querySelector("input[name=txtNombre").focus();
		}
		if(sApellido==""){
			aAñadirPersona[i].querySelector("input[name=txtApellido").classList.add("bg-warning");
			if(bValido){
				bValido=false;
				aAñadirPersona[i].querySelector("input[name=txtApellido").focus();
			}
		}
		if(bValido){
			añadirPerNoRep(aActoresNuevos,new Persona(sNombre,sApellido));
		}else{
			sErrores+="\n-Revisa los datos de nuevos actores.";
		}
    }
	//recoger actores existentes
	var aActoresExistentes=[];
	aAñadirPersona=document.querySelectorAll("#capaActoresMod .elegir-actor select");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var actor = aAñadirPersona[i].value.split("_");
    	var sNombre=actor[0].replace(/-/g, " ");
    	var sApellido=actor[1].replace(/-/g, " ");
    	var oActor=oUpoflix.buscarPersona(sNombre,sApellido);
    	añadirPerNoRep(aActoresExistentes,oActor);
    }

	//recoger directores existentes
	var aDirectoresExistentes=[];
	aAñadirPersona=document.querySelectorAll("#capaDirectoresMod .elegir-director select");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var director = aAñadirPersona[i].value.split("_");
    	var sNombre=director[0].replace(/-/g, " ");
    	var sApellido=director[1].replace(/-/g, " ");
    	var oDirector=oUpoflix.buscarPersona(sNombre,sApellido);
    	añadirPerNoRep(aDirectoresExistentes,oDirector);
    }
	//recoger directores nuevos
	var aDirectoresNuevos=[];
	aAñadirPersona=document.querySelectorAll("#capaDirectoresMod .nuevo-director");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var sNombre=aAñadirPersona[i].querySelector("input[name=txtNombre").value.trim();
    	var sApellido=aAñadirPersona[i].querySelector("input[name=txtApellido").value.trim();
		//validar directores nuevos
		var bValido=true;
		if(sNombre==""){
			bValido=false;
			aAñadirPersona[i].querySelector("input[name=txtNombre").classList.add("bg-warning");
			aAñadirPersona[i].querySelector("input[name=txtNombre").focus();
		}
		if(sApellido==""){
			aAñadirPersona[i].querySelector("input[name=txtApellido").classList.add("bg-warning");
			if(bValido){
				bValido=false;
				aAñadirPersona[i].querySelector("input[name=txtApellido").focus();
			}
		}
		if(bValido){
			añadirPerNoRep(aDirectoresNuevos,new Persona(sNombre,sApellido));
		}else{
			sErrores+="\n-Revisa los datos de nuevos directores.";
		}
    }
	//si es serie
	if(document.getElementById("radioModSerie").checked){
		var sDate=Date.parse(oFormulario.fechaInicioMod.value);
		var fechaInicio=new Date(sDate);
    	if(isNaN(sDate)){
	        oFormulario.fechaInicioMod.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.fechaInicioMod.focus();
	            bValido=false;
	        }
	        sErrores+="\n-La fecha de inicio no es correcta.";
    	}
		sDate=Date.parse(oFormulario.fechaFinMod.value);
		var fechaFin=new Date(sDate);
    	if(isNaN(sDate)){
	        oFormulario.fechaFinMod.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.fechaFinMod.focus();
	            bValido=false;
	        }
	        sErrores+="\n-La fecha de fin no es correcta.";
    	}

    	if(fechaInicio.getTime()>fechaFin.getTime()){
			oFormulario.fechaInicioMod.classList.add("bg-warning");
			oFormulario.fechaFinMod.classList.add("bg-warning");
			if(bValido){
	            oFormulario.fechaFinMod.focus();
	            bValido=false;
	        }
	        sErrores+="\n-La fecha de fin no debe ser posterior a la de fin.";
		}
    }
    else{
        //es una pelicula
		var iAnio=parseInt(oFormulario.txtModAnio.value, 10);;
    	if(isNaN(iAnio)){
	        oFormulario.txtModAnio.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.txtModAnio.focus();
	            bValido=false;
	        }
	        sErrores+="\n-El campo año no puede estar vacío.";
    	}
    	var iDuracion=parseInt(oFormulario.txtModDuracion.value, 10);;
    	if(isNaN(iDuracion)){
	        oFormulario.txtModDuracion.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.txtModDuracion.focus();
	            bValido=false;
	        }
	        sErrores+="\n-El campo duración no puede estar vacío.";
    	}
    }

	// si esta todo OK
	if(bValido){
		var aActores=[];
		//añadir los nuevos actores y directores a aPersonas
		for(var i=0;i<aActoresNuevos.length;i++){
			if(oUpoflix.altaPersona(aActoresNuevos[i]))
				añadirPerNoRep(aActores,aActoresNuevos[i]);
			else
				añadirPerNoRep(aActores,oUpoflix.buscarPersona(aActoresNuevos[i].sNombre,aActoresNuevos[i].sApellido));
		}
		for(var i=0;i<aActoresExistentes.length;i++){
			añadirPerNoRep(aActores,aActoresExistentes[i]);
		}
		
		var aDirectores=[];
		for(var i=0;i<aDirectoresNuevos.length;i++){
			if(oUpoflix.altaPersona(aDirectoresNuevos[i]))
				añadirPerNoRep(aDirectores,aDirectoresNuevos[i]);
			else
				añadirPerNoRep(aDirectores,oUpoflix.buscarPersona(aDirectoresNuevos[i].sNombre,aDirectoresNuevos[i].sApellido));
		}

		for(var i=0;i<aDirectoresExistentes.length;i++){
			añadirPerNoRep(aDirectores,aDirectoresExistentes[i]);
		}
		
		//modificar por fin
		if(document.getElementById("radioModSerie").checked){
			if(oUpoflix.modificarSerie(sTituloAntiguo,sTitulo,sUrlCartel,sGenero,sResumen,aActores,aDirectores,fechaInicio,fechaFin)){
				alert("Datos modificados.");
				listarSeries();
		    }else{
				alert("Error, pruebe de nuevo.");
		    }
		}else{
			if(oUpoflix.modificarPelicula(sTituloAntiguo,sTitulo,sUrlCartel,sGenero,sResumen,aActores,aDirectores,iAnio,iDuracion)){
				alert("Datos modificados.");
				listarPelis();
			}else{
				alert("Error, pruebe de nuevo.");
			}
		}
	}else{
		alert(sErrores);
	}
}

function limpiarErroresModificar(){
	var oInputs=document.querySelectorAll("#frmModificarProduccion .bg-warning");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}


function tipoProduccionM(){
	if(document.getElementById("radioModSerie").checked){
        document.getElementById("datosSeriesMod").classList.remove("d-none");
        document.getElementById("datosPelisMod").classList.add("d-none");
    }
    else{
        document.getElementById("datosPelisMod").classList.remove("d-none");
        document.getElementById("datosSeriesMod").classList.add("d-none");
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