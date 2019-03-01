function editarTemporadas(){
	var event = new Event('change');
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-8");
    oColumnaDatos.classList.add("m-auto");
    var oTexto=document.createElement("h4");
	oTexto.classList.add("text-warning");
	oTexto.textContent="Temporadas:";
	oColumnaDatos.appendChild(oTexto);
	var aSeries=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Serie);
	if(aSeries.length==0){
		oTexto=document.createElement("p");
		oTexto.textContent="No hay series para modificar temporadas";
		oColumnaDatos.appendChild(oTexto);
		var oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="Añadir serie";
		oBoton.addEventListener("click", mostrarAñadirRecurso);
		oColumnaDatos.appendChild(oBoton);
	}else{
		var oFormulario=document.createElement("form");
		oFormulario.id="frmEditarTemporadas";
		var oLabel=document.createElement("label");
		oLabel.textContent="Selecciona serie:";
		oFormulario.appendChild(oLabel);
		oFormulario.appendChild(getSelectSeries(aSeries));
		//select temporada
		var oCapa=document.createElement("div");
		oCapa.id="capaSelectTemporada";
		oFormulario.appendChild(oCapa);
		//capa modificacion temporada
		oCapa=document.createElement("div");
		oCapa.id="capaModificarTemporada";
		oFormulario.appendChild(oCapa);
		//select capitulo
		oCapa=document.createElement("div");
		oCapa.id="capaSelectCapitulo"
		oFormulario.appendChild(oCapa);
		//capa modificacion capitulo
		oCapa=document.createElement("div");
		oCapa.id="capaModificarCapitulo";
		oFormulario.appendChild(oCapa);

    	oColumnaDatos.appendChild(oFormulario);

	}
    oCapaContenido.appendChild(oColumnaDatos);
    if(document.querySelector("#frmEditarTemporadas")!=null)
    	document.querySelector("#frmEditarTemporadas").selectSerie.dispatchEvent(event);
}

function getSelectSeries(aSeries){
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectSerie";
	for(var i=0;i<aSeries.length;i++){
		var oOption=document.createElement("option");
		oOption.value=aSeries[i].sTitulo.replace(/ /g, "-");
		oOption.textContent=aSeries[i].sTitulo;
		oSelect.appendChild(oOption);
	}
	oSelect.addEventListener("change", crearSelectTemporadas);
	return oSelect;
}

function crearSelectTemporadas(oEvento){
	var oE = oEvento || window.event;
	var oSerie=oUpoflix.buscarProduccion(oE.target.value);
	var oCapaSelectTemporada=document.querySelector("#capaSelectTemporada");
	oCapaSelectTemporada.empty();
	if(oSerie.aTemporadas.length==0){
		var oTexto=document.createElement("p");
		oTexto.textContent="No hay temporadas";
		oCapaSelectTemporada.appendChild(oTexto);
		oCapaSelectTemporada.appendChild(getCapaModificarTemporada());
		document.querySelector("input[name=modificar-temporada").classList.add("d-none");
		document.querySelector("input[name=eliminar-temporada").classList.add("d-none");
		document.querySelector("input[name=nueva-temporada").classList.add("d-none");
		document.querySelector("input[name=add-temporada").classList.remove("d-none");
	}else{
		var oLabel=document.createElement("label");
		oLabel.textContent="Selecciona Temporada:";
		oCapaSelectTemporada.appendChild(oLabel);
		var oSelect=document.createElement("select");
		oSelect.dataset.serie=oE.target.value;
		oSelect.classList.add("custom-select");
		oSelect.classList.add("custom-select-sm");
		oSelect.name="selectTemporada";
		for(var i=0;i<oSerie.aTemporadas.length;i++){
			var oOption=document.createElement("option");
			oOption.value=oSerie.aTemporadas[i].iNumTemporada;
			oOption.textContent="Temporada "+oSerie.aTemporadas[i].iNumTemporada;
			oSelect.appendChild(oOption);
		}
		oSelect.addEventListener("change", crearSelectCapitulos);
		oCapaSelectTemporada.appendChild(oSelect);
		oCapaSelectTemporada.appendChild(getCapaModificarTemporada());
		var event = new Event('change');
		document.querySelector("#frmEditarTemporadas").selectTemporada.dispatchEvent(event);
	}
}

function getCapaModificarTemporada(){
	var oCapaAdd=document.createElement("div");
	oCapaAdd.classList.add("col-8");
	oCapaAdd.classList.add("m-3");
	oLabel=document.createElement("label");
	oLabel.textContent="Número:";
	oCapaAdd.appendChild(oLabel);
	
	var oInput=document.createElement("INPUT");
	oInput.type="text";
	oInput.classList.add("form-control");
	oInput.name="txtNumeroT";
	oInput.maxLength=3;
	oInput.addEventListener("keypress", soloNumeros);
	oCapaAdd.appendChild(oInput);
	
	oLabel=document.createElement("label");
	oLabel.textContent="Resumen:";
	oCapaAdd.appendChild(oLabel);
	oInput=document.createElement("textarea");
	oInput.classList.add("form-control");
	oInput.rows=3;
	oInput.maxLength=140;
	oInput.name="txtResumenT";
	oCapaAdd.appendChild(oInput);
	
	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="modificar-temporada";
	oBoton.value="Modificar";
	oBoton.addEventListener("click", modificarTemporada);
	oCapaAdd.appendChild(oBoton);
			
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="eliminar-temporada"
	oBoton.value="Eliminar";
	oBoton.addEventListener("click", eliminarTemporada);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="nueva-temporada"
	oBoton.value="Nueva";
	oBoton.addEventListener("click", nuevaTemporada);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("d-none");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="add-temporada";
	oBoton.value="Añadir";
	oBoton.addEventListener("click", añadirTemporada);
	oCapaAdd.appendChild(oBoton);

	return oCapaAdd;
}

function modificarTemporada(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroT.classList.remove("bg-warning");
	oFormulario.txtResumenT.classList.remove("bg-warning");
	var sSerie=oFormulario.selectSerie.value.replace(/-/g, " ");
	var iNumTemporada=parseInt(oFormulario.selectTemporada.value, 10);
	var iNuevoNumT=parseInt(oFormulario.txtNumeroT.value,10);
	var sResumen=oFormulario.txtResumenT.value;
	var bValido=true;
	if(isNaN(iNuevoNumT)){
		bValido=false;
		oFormulario.txtNumeroT.classList.add("bg-warning");
		oFormulario.txtNumeroT.focus();
	}
	if(sResumen==""){
		oFormulario.txtResumenT.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormulario.txtResumenT.focus();
		}
	}

	if(!bValido){
		alert("Por favor rellena todos los campos");	
	}else{
		oUpoflix.modificarTemporada(sSerie,iNumTemporada,iNuevoNumT,sResumen);
		alert("Datos actualizados.");
		mostrarEditarTemporadas();
	}
}

function eliminarTemporada(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	var sSerie=oFormulario.selectSerie.value;
	var iNumTemporada=parseInt(oFormulario.selectTemporada.value);
	if(oUpoflix.borrarTemporada(sSerie,iNumTemporada)){
		alert("Temporada borrada.");
		mostrarEditarTemporadas();
	}else{
		alert("Error, pruebe de nuevo.");
	}
}

function nuevaTemporada(oEvento){
	var oE = oEvento || window.event;
	oE.target.nextSibling.classList.remove("d-none");
	document.querySelector("input[name=txtNumeroT").value="";
	document.querySelector("textarea[name=txtResumenT").value="";
	document.querySelector("input[name=modificar-temporada").classList.add("d-none");
	document.querySelector("input[name=eliminar-temporada").classList.add("d-none");
	document.querySelector("#frmEditarTemporadas").txtNumeroT.classList.remove("bg-warning");
	document.querySelector("#frmEditarTemporadas").txtResumenT.classList.remove("bg-warning");
}

function añadirTemporada(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroT.classList.remove("bg-warning");
	oFormulario.txtResumenT.classList.remove("bg-warning");
	var sSerie=oFormulario.selectSerie.value.replace(/-/g, " ");
	var iNumT=parseInt(oFormulario.txtNumeroT.value,10);
	var sResumen=oFormulario.txtResumenT.value;
	var bValido=true;
	if(isNaN(iNumT)){
		bValido=false;
		oFormulario.txtNumeroT.classList.add("bg-warning");
		oFormulario.txtNumeroT.focus();
	}
	if(sResumen==""){
		oFormulario.txtResumenT.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormulario.txtResumenT.focus();
		}
	}

	if(!bValido){
		alert("Por favor rellena todos los campos");	
	}else{
		if(oUpoflix.añadirTemporada(sSerie,iNumT,sResumen)){
			alert("Datos añadidos.");
			mostrarEditarTemporadas();
		}else{
			alert("Ya existía esa temporada.")
		}
	}
}

function crearSelectCapitulos(oEvento){
	//llenar select
	var oE = oEvento || window.event;
	var sSerie=oE.target.dataset.serie.replace(/-/g, " ");
	var iNumTemporada=parseInt(oE.target.value, 10);
	var oTemporada=oUpoflix.buscarTemporada(sSerie,iNumTemporada);
	var oCapaSelectCaptitulo=document.querySelector("#capaSelectCapitulo");
	oCapaSelectCaptitulo.empty();
	//cambiar datos temporada en capa temporada
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroT.value=iNumTemporada;
	oFormulario.txtResumenT.value=oTemporada.sResumen;
	
	if(oTemporada.aCapitulos.length==0){
		var oTexto=document.createElement("p");
		oTexto.textContent="No hay capítulos";
		oCapaSelectCaptitulo.appendChild(oTexto);
		oCapaSelectCaptitulo.appendChild(getCapaModificarCapitulo());
		document.querySelector("input[name=modificar-capitulo").classList.add("d-none");
		document.querySelector("input[name=eliminar-capitulo").classList.add("d-none");
		document.querySelector("input[name=nueva-capitulo").classList.add("d-none");
		document.querySelector("input[name=add-capitulo").classList.remove("d-none");
	}else{
		var oLabel=document.createElement("label");
		oLabel.textContent="Selecciona capítulo:";
		oCapaSelectCaptitulo.appendChild(oLabel);
		var oSelect=document.createElement("select");
		oSelect.dataset.serie=oE.target.dataset.serie;
		oSelect.dataset.temporada=iNumTemporada;
		oSelect.classList.add("custom-select");
		oSelect.classList.add("custom-select-sm");
		oSelect.name="selectCapitulo";
		for(var i=0;i<oTemporada.aCapitulos.length;i++){
			var oOption=document.createElement("option");
			oOption.value=oTemporada.aCapitulos[i].iNumCapitulo;
			oOption.textContent="Capítulo "+oTemporada.aCapitulos[i].iNumCapitulo;
			oSelect.appendChild(oOption);
		}
		oSelect.addEventListener("change", cambiarDatosCapitulos);
		oCapaSelectCaptitulo.appendChild(oSelect);
		oCapaSelectCaptitulo.appendChild(getCapaModificarCapitulo());
		var event = new Event('change');
		document.querySelector("#frmEditarTemporadas").selectCapitulo.dispatchEvent(event);
	}
}

function cambiarDatosCapitulos(oEvento){
	var oE = oEvento || window.event;
	var sSerie=oE.target.dataset.serie.replace(/-/g, " ");
	var iNumTemporada=parseInt(oE.target.dataset.temporada, 10);
	var iNumCapitulo=parseInt(oE.target.value,10);
	var oCapitulo=oUpoflix.buscarCapitulo(sSerie,iNumTemporada,iNumCapitulo);
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroC.value=iNumCapitulo;
	oFormulario.txtResumenC.value=oCapitulo.sResumen;
}

function getCapaModificarCapitulo(){
	var oCapaAdd=document.createElement("div");
	oCapaAdd.classList.add("col-8");
	oCapaAdd.classList.add("m-3");
	oLabel=document.createElement("label");
	oLabel.textContent="Número:";
	oCapaAdd.appendChild(oLabel);
	
	var oInput=document.createElement("INPUT");
	oInput.type="text";
	oInput.classList.add("form-control");
	oInput.name="txtNumeroC";
	oInput.maxLength=3;
	oInput.addEventListener("keypress", soloNumeros);
	oCapaAdd.appendChild(oInput);
	
	oLabel=document.createElement("label");
	oLabel.textContent="Resumen:";
	oCapaAdd.appendChild(oLabel);
	oInput=document.createElement("textarea");
	oInput.classList.add("form-control");
	oInput.rows=3;
	oInput.maxLength=140;
	oInput.name="txtResumenC";
	oCapaAdd.appendChild(oInput);
	
	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="modificar-capitulo";
	oBoton.value="Modificar";
	oBoton.addEventListener("click", modificarCapitulo);
	oCapaAdd.appendChild(oBoton);
			
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="eliminar-capitulo"
	oBoton.value="Eliminar";
	oBoton.addEventListener("click", eliminarCapitulo);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="nueva-capitulo"
	oBoton.value="Nuevo";
	oBoton.addEventListener("click", nuevoCapitulo);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("d-none");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="add-capitulo";
	oBoton.value="Añadir";
	oBoton.addEventListener("click", añadirCapitulo);
	oCapaAdd.appendChild(oBoton);

	return oCapaAdd;
}

function modificarCapitulo(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroC.classList.remove("bg-warning");
	oFormulario.txtResumenC.classList.remove("bg-warning");
	var sSerie=oFormulario.selectSerie.value.replace(/-/g, " ");
	var iNumTemporada=parseInt(oFormulario.selectTemporada.value, 10);
	var iNumC=parseInt(oFormulario.selectCapitulo.value, 10);
	var iNuevoNumC=parseInt(oFormulario.txtNumeroC.value,10);
	var sResumen=oFormulario.txtResumenC.value;
	var bValido=true;
	if(isNaN(iNuevoNumC)){
		bValido=false;
		oFormulario.txtNumeroC.classList.add("bg-warning");
		oFormulario.txtNumeroT.focus();
	}
	if(sResumen==""){
		oFormulario.txtResumenC.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormulario.txtResumenC.focus();
		}
	}

	if(!bValido){
		alert("Por favor rellena todos los campos");	
	}else{
		oUpoflix.modificarCapitulo(sSerie,iNumTemporada,iNumC,iNuevoNumC,sResumen);
		alert("Datos actualizados.");
		mostrarEditarTemporadas();
	}
}

function eliminarCapitulo(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	var sSerie=oFormulario.selectSerie.value;
	var iNumTemporada=parseInt(oFormulario.selectTemporada.value,10);
	var iNumCapitulo=parseInt(oFormulario.selectCapitulo.value,10);
	if(oUpoflix.borrarCapitulo(sSerie,iNumTemporada,iNumCapitulo)){
		alert("Capítulo borrado.");
		mostrarEditarTemporadas();
	}else{
		alert("Error, pruebe de nuevo.");
	}
}

function nuevoCapitulo(oEvento){
	var oE = oEvento || window.event;
	oE.target.nextSibling.classList.remove("d-none");
	document.querySelector("input[name=txtNumeroC").value="";
	document.querySelector("textarea[name=txtResumenC").value="";
	document.querySelector("input[name=modificar-capitulo").classList.add("d-none");
	document.querySelector("input[name=eliminar-capitulo").classList.add("d-none");
	document.querySelector("#frmEditarTemporadas").txtNumeroC.classList.remove("bg-warning");
	document.querySelector("#frmEditarTemporadas").txtResumenC.classList.remove("bg-warning");
}

function añadirCapitulo(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroC.classList.remove("bg-warning");
	oFormulario.txtResumenC.classList.remove("bg-warning");
	var sSerie=oFormulario.selectSerie.value.replace(/-/g, " ");
	var iNumTemporada=parseInt(oFormulario.selectTemporada.value,10);
	var iNumC=parseInt(oFormulario.txtNumeroC.value,10);
	var sResumen=oFormulario.txtResumenC.value;
	var bValido=true;
	if(isNaN(iNumC)){
		bValido=false;
		oFormulario.txtNumeroC.classList.add("bg-warning");
		oFormulario.txtNumeroC.focus();
	}
	if(sResumen==""){
		oFormulario.txtResumenC.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormulario.txtResumenC.focus();
		}
	}

	if(!bValido){
		alert("Por favor rellena todos los campos");	
	}else{
		if(oUpoflix.añadirCapitulo(sSerie,iNumTemporada,iNumC,sResumen)){
			alert("Datos añadidos.");
			mostrarEditarTemporadas();
		}else{
			alert("Ya existía el capítulo.")
		}
	}
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

function validarAñadirPersona(oFormulario){
	oFormulario.txtNombre.classList.remove("bg-warning");
	oFormulario.txtApellido.classList.remove("bg-warning");
	var sNombre=oFormulario.txtNombre.value.trim();
	var sApellido=oFormulario.txtApellido.value.trim();
	var bValido=true;
	if(sNombre==""){
		bValido=false;
		oFormulario.txtNombre.classList.add("bg-warning");
		oFormulario.txtNombre.focus();
	}
	if(sApellido==""){
		oFormulario.txtApellido.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormulario.txtApellido.focus();
		}
	}
	return bValido;
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

function editarElenco(){
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-8");
    oColumnaDatos.classList.add("m-auto");
	var oTexto=document.createElement("h4");
	oTexto.classList.add("text-warning");
	oTexto.textContent="Elenco:";
	oColumnaDatos.appendChild(oTexto);
	var aElenco=oUpoflix.aPersonas;
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
    	oFormulario.dataset.nombre=aElenco[i].sNombre.replace(/ /g, "-");
		oFormulario.dataset.apellido=aElenco[i].sApellido.replace(/ /g, "-");
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
	    oInput.value = aElenco[i].sNombre;
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
	    oInput.value = aElenco[i].sApellido;
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
	   	oBoton.addEventListener("click", mostrarEditarElenco);
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
function añadirFormularioAltaPersona(){
	document.querySelector("#capaAltaPerson").appendChild(getCapaAltaPersona(añadirPersonaDesdeElenco));
}

function eliminarPersona(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	var sNombre=oFormularioPadre.dataset.nombre.replace(/-/g, " ");
	var sApellido=oFormularioPadre.dataset.apellido.replace(/-/g, " ");
	if(oUpoflix.bajaPersona(sNombre,sApellido)){
		alert("Persona borrada.");
		mostrarEditarElenco();
	}else{
		alert("Error al borrar, prueba de nuevo.");
	}
}

function editarPersona(oEvento){
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

function aceptarEditarPersona(oEvento){
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

Date.prototype.toString=function(){
	var dia=this.getDate();
	var mes=this.getMonth()+1;
	var anio=this.getFullYear();
	var sCadena=anio+"-"+mes+"-"+dia;
	return sCadena;
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