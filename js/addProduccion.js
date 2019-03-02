rellenarDesplegableGeneroA();
rellenarDesplegablePersonas();
document.querySelector("#capaAddProduccion input[name=btnAñadir]").addEventListener("click",procesoAñadirProduccion);
document.querySelector("input[name=btnActorNuevo]").addEventListener("click",añadirPersonaNuevaActor);
document.querySelector("input[name=btnActorExistente]").addEventListener("click",añadirPersonaExistenteActor);
document.querySelector("input[name=btnDirectorNuevo]").addEventListener("click",añadirPersonaNuevaDirector);
document.querySelector("input[name=btnDirectorExistente]").addEventListener("click",añadirPersonaExistenteDirector);
document.querySelector("#txtAddDuracion").addEventListener("keypress", soloNumerosA);
limpiarErroresAñadir();
//DATEPICKER FECHA ESTRENO
$("#txtAddAnio").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "+1Y",
    });

function rellenarDesplegableGeneroA() {
    if (localStorage["generos"] != undefined) {
        $("#datosComunes select").html(localStorage["generos"]);
    } else {
        $.get("./php/getGeneros.php", null, procesoRespuestaGetGenerosA, 'html');
    }
}

function procesoRespuestaGetGenerosA(sHTML) {
    localStorage["generos"] = sHTML;
    $("#datosComunes select").html(localStorage["generos"]);
}

function procesoAñadirProduccion(){
    if (validarProduccion())
	$.post("./php/addProduccion.php", $("#frmAddProduccion").serialize(), procesoRespuestaAddProduccion, 'json');
}

function procesoRespuestaAddProduccion(oDatos, sStatus, oXHR) {
    if (oDatos.error == 0)
       	cargarAñadirProduccion();
	alert(oDatos.mensaje);
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
	//recoger genero
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
	//recoger actores nuevos
	var aAñadirPersona=document.querySelectorAll("#capaActores .nuevo-actor");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var sNombre=aAñadirPersona[i].querySelector("input[name='txtNombreNA[]']").value.trim();
    	var sApellido=aAñadirPersona[i].querySelector("input[name='txtApellidoNA[]']").value.trim();
		//validar actores nuevos
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
	/*recoger actores existentes
	aActoresExistentes=[];
	aAñadirPersona=document.querySelectorAll("#capaActores .elegir-actor select");
    for(var i=0;i<aAñadirPersona.length;i++){
    	aActoresExistentes.push(aAñadirPersona[i].value);
    }*/
	//recoger directores nuevos
	aDirectoresNuevos=[];
	aAñadirPersona=document.querySelectorAll("#capaDirectores .nuevo-director");
    for(var i=0;i<aAñadirPersona.length;i++){
    	var sNombre=aAñadirPersona[i].querySelector("input[name='txtNombreND[]']").value.trim();
    	var sApellido=aAñadirPersona[i].querySelector("input[name='txtApellidoND[]']").value.trim();
		//validar directores nuevos
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
	/*recoger directores existentes
	aDirectoresExistentes=[];
	aAñadirPersona=document.querySelectorAll("#capaDirectores .elegir-director select");
    for(var i=0;i<aAñadirPersona.length;i++){
    	aDirectoresExistentes.push(aAñadirPersona[i].value);
    }*/

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
        alert(sErrores);
    
    return bValido;
}

function procesoRespuestaValidarProduccion(sRespuesta) {
    if (sRespuesta == "EXISTE") {
        ProduccionExiste = true;
    } else {
        ProduccionExiste = false;
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
	oInput.setAttribute("name","txtNombreNA[]");
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
	oInput.setAttribute("name","txtApellidoNA[]");
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
	oInput.setAttribute("name","txtNombreND[]");
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
	oInput.setAttribute("name","txtApellidoND[]");
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
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectA[]";
	oSelect.innerHTML=sOptionsPersonas;
	oColumna.appendChild(oSelect);
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
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectD[]";
	oSelect.innerHTML=sOptionsPersonas;
	oColumna.appendChild(oSelect);
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

function limpiarErroresAñadir(){
    var oInputs=document.querySelectorAll("#frmAddProduccion .bg-warning");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function rellenarDesplegablePersonas(){
	$.ajax({
        url: "./php/getPersonas.php",
        dataType: 'json',
        cache: false,
        async: true, 
        method: "GET",
        success: procesarGetPersonas
    });
}

function procesarGetPersonas(oDatos){
    sOptionsPersonas = "";
    for (var i = 0; i < oDatos.length; i++) {

        sOptionsPersonas += '<option value="' + oDatos[i].id + '">';
        sOptionsPersonas += oDatos[i].nombre+" "+oDatos[i].apellidos;
        sOptionsPersonas += '</option>';
    }
}


function añadirPerNoRep(aArray,oPersona){
    var array=aArray.filter(Persona=>Persona.sNombre==oPersona.sNombre && Persona.sApellido==oPersona.sApellido);
    if(array.length==0)
	aArray.push(oPersona);
}

function soloNumerosA(elEvento) {
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