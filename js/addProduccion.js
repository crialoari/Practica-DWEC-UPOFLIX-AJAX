rellenarDesplegableGenero();
rellenarDesplegablePersonas();
document.querySelector("#capaAddProduccion input[name=btnAñadir]").addEventListener("click",procesoAñadirProduccion);
document.querySelector("input[name=btnActorNuevo]").addEventListener("click",añadirActorNuevo);
document.querySelector("input[name=btnActorExistente]").addEventListener("click",añadirActorExistente);
document.querySelector("input[name=btnDirectorNuevo]").addEventListener("click",añadirDirectorNuevo);
document.querySelector("input[name=btnDirectorExistente]").addEventListener("click",añadirDirectorExistente);
document.querySelector("#txtAddDuracion").addEventListener("keypress", soloNumeros);
limpiarErroresAñadir();

//DATEPICKER FECHA ESTRENO
$("#txtAddAnio").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "+1Y",
    });

function añadirActorNuevo(){
	document.getElementById("capaActores").appendChild(capaActorNuevo());
}

function añadirDirectorNuevo(){
	document.getElementById("capaDirectores").appendChild(capaDirectorNuevo());
}

function añadirActorExistente(){
	document.getElementById("capaActores").appendChild(capaActorExistente());
}

function añadirDirectorExistente(){
	document.getElementById("capaDirectores").appendChild(capaDirectorExistente());
}

function limpiarErroresAñadir(){
    var oInputs=document.querySelectorAll("#frmAddProduccion .bg-warning");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function procesoAñadirProduccion(){
    if (validarProduccion())
	$.post("./php/addProduccion.php", $("#frmAddProduccion").serializeArray(), procesoRespuestaAddProduccion, 'json');
}

function procesoRespuestaAddProduccion(oDatos, sStatus, oXHR) {
    if (oDatos.error == 0)
       	cargarAñadirProduccion();
	crearDialog(oDatos.mensaje);
}

function validarProduccion(){
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
	var sResumen=oFormulario.txtAddResumen.value.trim();
    if(sResumen==""){
        oFormulario.txtAddResumen.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtAddResumen.focus();
            bValido=false;
        }
        sErrores+="\n-El campo resumen no puede estar vacío.";
    }
    //validar estreno
    if(oFormulario.txtAddAnio.value==""){
        oFormulario.txtAddAnio.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtAddAnio.focus();
            bValido=false;
        }
        sErrores+="\n-La fecha de estreno no puede estar vacía.";
   	}
   	//validar duracion
   	var iDuracion=parseInt(oFormulario.txtAddDuracion.value, 10);;
   	if(isNaN(iDuracion)){
        oFormulario.txtAddDuracion.classList.add("bg-warning");
        if(bValido){
            oFormulario.txtAddDuracion.focus();
            bValido=false;
        }
        sErrores+="\n-El campo duración no puede estar vacío.";
   	}

	//validar actores nuevos
	var aAñadirPersona=document.querySelectorAll("#capaActores .nuevo-actor");
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
	aAñadirPersona=document.querySelectorAll("#capaDirectores .nuevo-director");
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
	    url: "./php/validacionProduccion.php",
	    type: "GET",
	    async: false,
	    data: encodeURI("titulo=" + sTitulo),
	    dataType: "text",
	    success: procesoRespuestaValidarProduccion
	});

	if (ProduccionExiste) {
        sErrores += "\n\n-La producción ya existe.";
        bValido = false;
    }

    if (!bValido)
        crearDialog(sErrores);
    
    return bValido;
}

function procesoRespuestaValidarProduccion(sRespuesta) {
    if (sRespuesta == "EXISTE") {
        ProduccionExiste = true;
    } else {
        ProduccionExiste = false;
    }
}