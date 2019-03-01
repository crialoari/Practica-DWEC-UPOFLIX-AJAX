function procesarEditarPersonas(oDatos){
	//crea formularios para cada persona 
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-8");
    oColumnaDatos.classList.add("m-auto");
	var oTexto=document.createElement("h4");
	oTexto.classList.add("text-warning");
	oTexto.textContent="Elenco:";
	oColumnaDatos.appendChild(oTexto);

	var aElenco=oDatos;

	if(aElenco.length==0){
		oTexto=document.createElement("p");
		oTexto.textContent="No hay personas en la lista.";
		oColumnaDatos.appendChild(oTexto);
	}else
	for(var i=0; i<aElenco.length;i++){
		var capaPersona = document.createElement("div");
		capaPersona.classList.add("col");
		var oFormulario=document.createElement("form");
    	oFormulario.classList.add="frmDatosPersona";
    	oFormulario.dataset.persona=aElenco[i].id;
		var capaFrm = document.createElement("div");
		capaFrm.classList.add("form-group");
		
		var oLabel=document.createElement("label");
		oLabel.textContent="Nombre:";
		capaFrm.appendChild(oLabel);

		var oInput=document.createElement("INPUT");
	    oInput.type="text";
	    oInput.classList.add("form-control");
	    oInput.name="txtNombre";
	    oInput.maxLength=15;
	    oInput.value = aElenco[i].nombre;
	    oInput.readOnly=true;
	    capaFrm.appendChild(oInput);

	    oLabel=document.createElement("label");
		oLabel.textContent="Apellidos:";
		capaFrm.appendChild(oLabel);

	    oInput=document.createElement("INPUT");
	    oInput.type="text";
	    oInput.classList.add("form-control");
	    oInput.name="txtApellido";
	    oInput.maxLength=20;
	    oInput.value = aElenco[i].apellidos;
	    oInput.readOnly=true;
	    capaFrm.appendChild(oInput);

	    var oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-danger");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="X";
	   	oBoton.addEventListener("click", eliminarPersona);
    	capaFrm.appendChild(oBoton);

    	oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-dark");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="edit";
		oBoton.addEventListener("click", editarPersona);
		capaFrm.appendChild(oBoton);

		oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.classList.add("d-none");
		oBoton.value="listo";
	   	oBoton.addEventListener("click", aceptarEditarPersona);
		capaFrm.appendChild(oBoton);

		oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.classList.add("d-none");
		oBoton.value="cancelar";
	   	oBoton.addEventListener("click", cargarEditarElenco);
		capaFrm.appendChild(oBoton);

	    oFormulario.appendChild(capaFrm);
		capaPersona.appendChild(oFormulario);
		oColumnaDatos.appendChild(capaPersona);
		oColumnaDatos.appendChild(document.createElement("hr"));
	}
	/*capa añadir*/
	var oCapaAltaPersona=document.createElement("div");
	oCapaAltaPersona.id="capaAltaPerson";
	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.value="Añadir persona";
	oBoton.addEventListener("click", añadirFormularioAltaPersona);
	oCapaAltaPersona.appendChild(oBoton);
	oColumnaDatos.appendChild(oCapaAltaPersona);
    oCapaContenido.appendChild(oColumnaDatos);
}

function eliminarPersona(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	var oAjax = instanciarXHR();
	var sURL = "./php/deletePersona.php";
    var sParametros = "id="+oFormularioPadre.dataset.persona;
    oAjax.addEventListener("readystatechange", respuestaEliminarPersona);
    oAjax.open("POST", encodeURI(sURL), true);
	oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	oAjax.send(encodeURI(sParametros));
}

function respuestaEliminarPersona(){
	var oAjax = this;
	if (oAjax.readyState == 4 && oAjax.status == 200) {
		//console.log(oAjax.responseText);
		var oRespuesta = JSON.parse(oAjax.responseText);
    	if (oRespuesta.error == 0) {
        cargarEditarElenco();
		}
	    alert(oRespuesta.mensaje);
    }
}

function editarPersona(){
	var oE = oEvento || window.event;
	oE.target.classList.toggle("disabled");
	oE.target.classList.remove("btn-dark");
	oE.target.classList.add("btn-outline-dark");
	oE.target.nextSibling.classList.toggle("d-none");
	oE.target.nextSibling.nextSibling.classList.toggle("d-none");
    var oFormularioPadre=oE.target.parentElement.parentElement;
    var oInputs=oFormularioPadre.querySelectorAll("input[type=text");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].readOnly=false;
    }
	oE.target.removeEventListener("click", editarPersona);
}

function aceptarEditarPersona(){
var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	oFormularioPadre.txtNombre.classList.remove("bg-warning");
	oFormularioPadre.txtApellido.classList.remove("bg-warning");
	var sNuevoNombre=oFormularioPadre.txtNombre.value.trim();
	var sNuevoApellido=oFormularioPadre.txtApellido.value.trim();
	var bValido=true;
	if(sNuevoNombre==""){
		bValido=false;
		oFormularioPadre.txtNombre.classList.add("bg-warning");
		oFormularioPadre.txtNombre.focus();
	}
	if(sNuevoApellido==""){
		oFormularioPadre.txtApellido.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormularioPadre.txtApellido.focus();
		}
	}

	if(!bValido){
		alert("Por favor rellena todos los campos");	
	}else{
		var sNombre=oFormularioPadre.dataset.nombre.replace(/-/g, " ");
		var sApellido=oFormularioPadre.dataset.apellido.replace(/-/g, " ");
		
		var oPersona=oUpoflix.buscarPersona(sNombre,sApellido);
		if(oPersona==null){
			alert("Error, pruebe de nuevo");
		}else{
			if(oUpoflix.modificarPersona(oPersona,sNuevoNombre,sNuevoApellido))
			alert("Datos actualizados");
			mostrarEditarElenco();
		}
	}
}

function añadirFormularioAltaPersona(){
	document.querySelector("#capaAltaPerson").appendChild(getCapaAltaPersona(añadirPersonaDesdeElenco));
}

function getCapaAltaPersona(sMetodo){
	var oCapaAltaPersona=document.createElement("div");
	oCapaAltaPersona.classList.add("altaPersona");
	oCapaAltaPersona.classList.add("p-2");
	var oFormulario=document.createElement("form");
    oFormulario.classList.add="frmAltaPersona";
    var capaFrm = document.createElement("div");
	capaFrm.classList.add("form-group");
	
	var oLabel=document.createElement("label");
	oLabel.textContent="Nombre:";
	capaFrm.appendChild(oLabel);

	var oInput=document.createElement("INPUT");
	oInput.type="text";
	oInput.classList.add("form-control");
	oInput.name="txtNombre";
	oInput.maxLength=15;
    capaFrm.appendChild(oInput);

	oLabel=document.createElement("label");
	oLabel.textContent="Apellidos:";
	capaFrm.appendChild(oLabel);

	oInput=document.createElement("INPUT");
	oInput.type="text";
	oInput.classList.add("form-control");
	oInput.name="txtApellido";
	oInput.maxLength=20;
	capaFrm.appendChild(oInput);

	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.value="Añadir";
	oBoton.addEventListener("click", sMetodo);
    capaFrm.appendChild(oBoton);

    oFormulario.appendChild(capaFrm);
	oCapaAltaPersona.appendChild(oFormulario);

	return oCapaAltaPersona;
}

function añadirPersonaDesdeElenco(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	if(validarAñadirPersona(oFormularioPadre)){
		var sNombre=oFormularioPadre.txtNombre.value.trim();
		var sApellido=oFormularioPadre.txtApellido.value.trim();
		var oPersona=new Persona(sNombre,sApellido);
		if(oUpoflix.altaPersona(oPersona)){
			alert("Persona añadida.");
			mostrarEditarElenco();
		}else{
			alert("Ya existía esa persona.");
		}
		
	}else{
		alert("Debe rellenar todos los campos.");
	}
}