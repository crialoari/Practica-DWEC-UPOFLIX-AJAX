function añadirRecurso(){
	document.querySelector("#capaAddProduccion>div").classList.remove("d-none");	
	document.querySelector("#radioAddPeli").addEventListener("click", tipoProduccion);
	document.querySelector("#radioAddSerie").addEventListener("click",tipoProduccion);
	document.querySelector("input[name=btnActorNuevo]").addEventListener("click",añadirPersonaNuevaActor);
	document.querySelector("input[name=btnActorExistente]").addEventListener("click",añadirPersonaExistenteActor);
	document.querySelector("input[name=btnDirectorNuevo]").addEventListener("click",añadirPersonaNuevaDirector);
	document.querySelector("input[name=btnDirectorExistente]").addEventListener("click",añadirPersonaExistenteDirector);
	document.querySelector("#capaAddProduccion input[name=btnAñadir]").addEventListener("click",añadirProduccion);
	document.querySelector("#txtAddAnio").addEventListener("keypress", soloNumeros);
	document.querySelector("#txtAddAnio").addEventListener("keypress", soloNumeros);
	document.querySelector("#genero").appendChild(getSelectAddGenero());
	limpiarErroresAñadir();
}

function añadirProduccion(){
	var oFormulario=document.querySelector("#frmAddProduccion");
	limpiarErroresAñadir();
	var bValido=true;
    var sErrores="";
	//validar url
	var sUrlCartel=oFormulario.txtAddCartel.value.trim();
	if(sUrlCartel!=""){
	    var oExpReg=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
	    if(!oExpReg.test(sUrlCartel)){
	        bValido=false;
	        oFormulario.txtAddCartel.classList.add("bg-warning")
	        oFormulario.txtAddCartel.focus();
	        sErrores+="-El cartel debe ser una url de imagen correcta.";
	    }
	}
	//validar titulo
	var sTitulo=oFormulario.txtAddTitulo.value.trim();
    if(sTitulo==""){
        oFormulario.txtAddTitulo.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtAddTitulo.focus();
            bValido=false;
        }
        sErrores+="\n-El campo título no puede estar vacío.";
    }
	//recoger genero
	var sGenero=oFormulario.selectGenero.value;
	//validar resumen
	var sResumen=oFormulario.txtAddResumen.value.trim();
    if(sResumen==""){
        oFormulario.txtAddResumen.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtAddResumen.focus();
            bValido=false;
        }
        sErrores+="\n-El campo resumen no puede estar vacío.";
    }

    var aActoresNuevos=[];
	//recoger actores nuevos
	var aAñadirPersona=document.querySelectorAll("#capaActores .nuevo-actor");
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

			aActoresNuevos.push(new Persona(sNombre,sApellido));
		}else{
			sErrores+="\n-Revisa los datos de nuevos actores.";
		}
    }
	//recoger actores existentes
	var aActoresExistentes=[];
	aAñadirPersona=document.querySelectorAll("#capaActores .elegir-actor select");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var actor = aAñadirPersona[i].value.split("_");
    	var sNombre=actor[0].replace(/-/g, " ");
    	var sApellido=actor[1].replace(/-/g," ");
    	var oActor=oUpoflix.buscarPersona(sNombre,sApellido);
    	aActoresExistentes.push(oActor);
    }

	//recoger directores existentes
	var aDirectoresExistentes=[];
	aAñadirPersona=document.querySelectorAll("#capaDirectores .elegir-director select");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var director = aAñadirPersona[i].value.split("_");
    	var sNombre=director[0].replace(/-/g, " ");
    	var sApellido=director[1].replace(/-/g, " ");
    	var oDirector=oUpoflix.buscarPersona(sNombre,sApellido);
    	aDirectoresExistentes.push(oDirector);
    }
	//recoger directores nuevos
	var aDirectoresNuevos=[];
	aAñadirPersona=document.querySelectorAll("#capaDirectores .nuevo-director");
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
			aDirectoresNuevos.push(new Persona(sNombre,sApellido));
		}else{
			sErrores+="\n-Revisa los datos de nuevos directores.";
		}
    }
	//si es serie
	if(document.getElementById("radioAddSerie").checked){
		var sDate=Date.parse(oFormulario.fechaInicioAdd.value);
		var fechaInicio=new Date(sDate);
    	if(isNaN(sDate)){
	        oFormulario.fechaInicioAdd.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.fechaInicioAdd.focus();
	            bValido=false;
	        }
	        sErrores+="\n-La fecha de inicio no es correcta.";
    	}
		sDate=Date.parse(oFormulario.fechaFinAdd.value);
		var fechaFin=new Date(sDate);
    	if(isNaN(sDate)){
	        oFormulario.fechaFinAdd.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.fechaFinAdd.focus();
	            bValido=false;
	        }
	        sErrores+="\n-La fecha de fin no es correcta.";
    	}
		//comparar fechas
		if(fechaInicio.getTime()>fechaFin.getTime()){
			oFormulario.fechaInicioAdd.classList.add("bg-warning");
			oFormulario.fechaFinAdd.classList.add("bg-warning");
			if(bValido){
	            oFormulario.fechaFinAdd.focus();
	            bValido=false;
	        }
	        sErrores+="\n-La fecha de fin no debe ser posterior a la de fin.";
		}
    }
    else{
        //es una pelicula
		var iAnio=parseInt(oFormulario.txtAddAnio.value, 10);;
    	if(isNaN(iAnio)){
	        oFormulario.txtAddAnio.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.txtAddAnio.focus();
	            bValido=false;
	        }
	        sErrores+="\n-El campo año no puede estar vacío.";
    	}
    	var iDuracion=parseInt(oFormulario.txtAddDuracion.value, 10);;
    	if(isNaN(iDuracion)){
	        oFormulario.txtAddDuracion.classList.add("bg-warning");
	        if(bValido){
	            oFormulario.txtAddDuracion.focus();
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
				aActores.push(aActoresNuevos[i]);
			else
				aActores.push(oUpoflix.(buscar)Persona(aActoresNuevos[i].sNombre,aActoresNuevos[i].sApellido));
		}
		aActores = aActoresExistentes.concat(aActores); 
		
		var aDirectores=[];
		for(var i=0;i<aDirectoresNuevos.length;i++){
			if(oUpoflix.altaPersona(aDirectoresNuevos[i]))
				aDirectores.push(aDirectoresNuevos[i]);
			else
				aDirectores.push(oUpoflix.buscarPersona(aDirectoresNuevos[i].sNombre,aDirectoresNuevos[i].sApellido));
		}
		aDirectores = aDirectoresExistentes.concat(aDirectores); 
		//añadir por fin
		if(document.getElementById("radioAddSerie").checked){
			var oProduccion=new Serie(sTitulo,sGenero,aActores,aDirectores,sResumen,sUrlCartel,fechaInicio,fechaFin);
		}else{
			var oProduccion=new Pelicula(sTitulo,sGenero,aActores,aDirectores,sResumen,sUrlCartel,iAnio,iDuracion);
		}

		if(oUpoflix.añadirProduccion (oProduccion)){
            alert("Produccion añadida.");
            listarTodo();
        }else{
        	alert("Ya existía esa producción.")
        }
	}else{
		alert(sErrores);
	}
}

function limpiarErroresAñadir(){
    var oInputs=document.querySelectorAll("#frmAddProduccion .bg-warning");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function tipoProduccion(){
	if(document.getElementById("radioAddSerie").checked){
        document.getElementById("datosSeries").classList.remove("d-none");
        document.getElementById("datosPelis").classList.add("d-none");
    }
    else{
        document.getElementById("datosPelis").classList.remove("d-none");
        document.getElementById("datosSeries").classList.add("d-none");
    }
}

function añadirPersonaNuevaActor(){
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
	oInput.setAttribute("id","txtNombre");
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
	oInput.setAttribute("id","txtApellido");
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
	document.getElementById("capaActores").appendChild(oCapa);
}

function añadirPersonaNuevaDirector(){
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
	document.getElementById("capaDirectores").appendChild(oCapa);
}

function añadirPersonaExistenteActor(){
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
	document.getElementById("capaActores").appendChild(oCapa);

}

function añadirPersonaExistenteDirector(){
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
	document.getElementById("capaDirectores").appendChild(oCapa);
}

function eliminarCapa(oEvento){
	var oE=oEvento || window.event;
	var div=oE.target.parentElement.parentElement.parentElement;
	if(div !== null){
        while (div.hasChildNodes()){
            div.removeChild(div.lastChild);
		}
		div.remove();
	}
}

function getSelectPersona(){
	var aPersonas=oUpoflix.aPersonas;
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectPersona";
	for(var i=0;i<aPersonas.length;i++){
		var oOption=document.createElement("option");
		oOption.value=aPersonas[i].sNombre.replace(/ /g, "-")+"_"+aPersonas[i].sApellido.replace(/ /g, "-");
		oOption.textContent=aPersonas[i].sNombre+" "+aPersonas[i].sApellido;
		oSelect.appendChild(oOption);
	}
	return oSelect;
}

function getSelectAddGenero(){
	var aGeneros=["Acción","Aventuras","Comedia","Drama","Terror","Musical","Ciencia ficción","Bélica","Western","Thriller","Infantil"];
	aGeneros=aGeneros.sort();
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectGenero";
	for(var i=0;i<aGeneros.length;i++){
		var oOption=document.createElement("option");
		oOption.value=aGeneros[i];
		oOption.textContent=aGeneros[i];
		oSelect.appendChild(oOption);
	}
	return oSelect;
}

function añadirPerNoRep(aArray,oPersona){
    var array=aArray.filter(Persona=>Persona.sNombre==oPersona.sNombre && Persona.sApellido==oPersona.sApellido);
    if(array.length==0)
	aArray.push(oPersona);
}