cargarDatosProduccion();
rellenarDesplegableGenero();
rellenarDesplegablePersonas();
document.querySelector("#capaModificarProduccion input[name=btnModificar]").addEventListener("click",editarProduccion);
document.querySelector("#capaModificarProduccion input[name=btnCancelar]").addEventListener("click",cancelarModificacion);
document.querySelector("input[name=btnActorNuevoM]").addEventListener("click",añadirActorNuevoMod);
document.querySelector("input[name=btnActorExistenteM]").addEventListener("click",añadirActorExistenteMod);
document.querySelector("input[name=btnDirectorNuevoM]").addEventListener("click",añadirDirectorNuevoMod);
document.querySelector("input[name=btnDirectorExistenteM]").addEventListener("click",añadirDirectorExistenteMod);
document.querySelector("#txtModDuracion").addEventListener("keypress", soloNumeros);
limpiarErroresModificar();

//DATEPICKER FECHA ESTRENO
$("#txtModAnio").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "+1Y",
    });

function añadirActorNuevoMod(){
	document.getElementById("capaActoresMod").appendChild(capaActorNuevo());
}

function añadirDirectorNuevoMod(){
	document.getElementById("capaDirectoresMod").appendChild(capaDirectorNuevo());
}

function añadirActorExistenteMod(){
	document.getElementById("capaActoresMod").appendChild(capaActorExistente());
}

function añadirDirectorExistenteMod(){
	document.getElementById("capaDirectoresMod").appendChild(capaDirectorExistente());
}

function limpiarErroresModificar(){
	var oInputs=document.querySelectorAll("#frmModificarProduccion .bg-warning");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function cargarDatosProduccion(){
	var sTituloAntiguo=document.querySelector("#frmModificarProduccion #txtTituloAntiguo").value;
	sTituloAntiguo = encodeURI(sTituloAntiguo);
	
	$.ajax({
        url: "./php/getProduccion.php",
        dataType: 'xml',
        data: "titulo="+sTituloAntiguo,
        cache: false,
        async: true, 
        method: "GET",
        success: procesarRespuestaDatosProduccion
    });
}

function procesarRespuestaDatosProduccion(oXML){
    var aPeli=oXML.querySelector("produccion");
    //cartel
    $("#txtModCartel").val(aPeli.querySelector("cartel").textContent);
    //titulo
    $("#txtModTitulo").val(aPeli.querySelector("titulo").textContent);
    //genero
    var indice;
    $("#frmModificarProduccion [name=selectGenero] option").each(function(i,option){
    	if(option.value==aPeli.querySelector("genero").textContent)
    		indice=i;
    });
    $("#frmModificarProduccion [name=selectGenero]")[0].selectedIndex=indice;
    //resumen
    $("#txtModResumen").text(aPeli.querySelector("resumen").textContent);
    //estreno
    $("#txtModAnio").val(aPeli.querySelector("estreno").textContent);
    //duracion
    $("#txtModDuracion").val(aPeli.querySelector("duracion").textContent);
    //actores
    var actoresMod=aPeli.querySelectorAll("actor");
    for(var i=0;i<actoresMod.length;i++){
    	añadirActorNuevoMod();
    	var oInputNombre=document.querySelector("#frmModificarProduccion .nuevo-actor:last-child input[name='txtNombreNA[]']");
		var oInputApellido=document.querySelector("#frmModificarProduccion .nuevo-actor:last-child input[name='txtApellidoNA[]']");
		oInputNombre.value=actoresMod[i].querySelector("nombre").textContent;
		oInputApellido.value=actoresMod[i].querySelector("apellidos").textContent
    }
    
    //directores
    var directoresMod=aPeli.querySelectorAll("director");
    for(var i=0;i<directoresMod.length;i++){
    	añadirDirectorNuevoMod();
    	var oInputNombre=document.querySelector("#frmModificarProduccion .nuevo-director:last-child input[name='txtNombreND[]']");
		var oInputApellido=document.querySelector("#frmModificarProduccion .nuevo-director:last-child input[name='txtApellidoND[]']");
		oInputNombre.value=directoresMod[i].querySelector("nombre").textContent;
		oInputApellido.value=directoresMod[i].querySelector("apellidos").textContent;
    }
}

function editarProduccion(){
	if(validarModificar())
		$.post("./php/updateProduccion.php", $("#frmModificarProduccion").serializeArray(), procesoRespuestaUpdateProduccion, 'json');
}

function procesoRespuestaUpdateProduccion(oDatos, sStatus, oXHR){
	if (oDatos.error == 0)
       	listarPelis();
	alert(oDatos.mensaje);
}

function validarModificar(){
	limpiarErroresModificar();
	var oFormulario=document.querySelector("#frmModificarProduccion");
	var sTituloAntiguo=document.querySelector("#frmModificarProduccion #txtTituloAntiguo").value;
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
    //validar genero
	var sGenero=oFormulario.selectGenero.value;
	if(sGenero=="0"){
        oFormulario.selectGenero.classList.add("bg-warning");
        if(bValido){
            oFormulario.selectGenero.focus();
            bValido=false;
        }
        sErrores+="\n-Debe eligir un género.";
	}
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
    //validar estreno
    if(oFormulario.txtModAnio.value==""){
        oFormulario.txtModAnio.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtModAnio.focus();
            bValido=false;
        }
        sErrores+="\n-La fecha de estreno no puede estar vacía.";
   	}
   	//validar duracion
    var iDuracion=parseInt(oFormulario.txtModDuracion.value, 10);;
    if(isNaN(iDuracion)){
	    oFormulario.txtModDuracion.classList.add("bg-warning");
	    if(bValido){
	 	   oFormulario.txtModDuracion.focus();
	       bValido=false;
	    }
	    sErrores+="\n-El campo duración no puede estar vacío.";
   	}
   	//validar actores nuevos
	var aAñadirPersona=document.querySelectorAll("#capaActoresMod .nuevo-actor");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var sNombre=aAñadirPersona[i].querySelector("input[name='txtNombreNA[]']").value.trim();
    	var sApellido=aAñadirPersona[i].querySelector("input[name='txtApellidoNA[]']").value.trim();
		var bValidoA=true;
		if(sNombre==""){
			bValidoA=false;
			aAñadirPersona[i].querySelector("input[name='txtNombreNA[]'").classList.add("bg-warning");
			aAñadirPersona[i].querySelector("input[name='txtNombreNA[]']").focus();
		}
		if(sApellido==""){
			aAñadirPersona[i].querySelector("input[name='txtApellidoNA[]']").classList.add("bg-warning");
			if(bValidoA){
				bValidoA=false;
				aAñadirPersona[i].querySelector("name='txtApellidoNA[]'").focus();
			}
		}
		if(!bValidoA){
			bValido=false;
			sErrores+="\n-Revisa los datos de nuevos actores.";
		}
    }
	//validar directores nuevos
	aAñadirPersona=document.querySelectorAll("#capaDirectoresMod .nuevo-director");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var sNombre=aAñadirPersona[i].querySelector("input[name='txtNombreND[]']").value.trim();
    	var sApellido=aAñadirPersona[i].querySelector("input[name='txtApellidoND[]']").value.trim();
		var bValidoD=true;
		if(sNombre==""){
			bValidoD=false;
			aAñadirPersona[i].querySelector("input[name='txtNombreND[]']").classList.add("bg-warning");
			aAñadirPersona[i].querySelector("input[name='txtNombreND[]']").focus();
		}
		if(sApellido==""){
			aAñadirPersona[i].querySelector("input[name='txtApellidoND[]']").classList.add("bg-warning");
			if(bValidoD){
				bValidoD=false;
				aAñadirPersona[i].querySelector("input[name='txtApellidoND[]']").focus();
			}
		}
		if(!bValidoD){
			bValido=false;
			sErrores+="\n-Revisa los datos de nuevos directores.";
		}
    }

	//comprobar que no exite la produccion
	$.ajax({
	    url: "./php/validacionUpdateProduccion.php",
	    type: "GET",
	    async: false,
	    data: encodeURI("titulo=" + sTitulo + "&tituloAntiguo=" + sTituloAntiguo),
	    dataType: "text",
	    success: procesoRespuestaValidarUpdateProduccion
	});

	if (ProduccionModExiste) {
        sErrores += "\n\n-La producción ya existe.";
        bValido = false;
    }

    if (!bValido)
        alert(sErrores);
    
    return bValido;
}

function procesoRespuestaValidarUpdateProduccion(sRespuesta){
	if (sRespuesta == "EXISTE") {
        ProduccionModExiste = true;
    } else {
        ProduccionModExiste = false;
    }
}

function cancelarModificacion(){
	$(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    pedirListado();
}