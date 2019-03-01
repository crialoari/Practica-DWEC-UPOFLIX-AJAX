function listarPelis(){
	oCapaContenido.empty();
	ocultarFormularios();
	
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTitulo=document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Películas";
	oColumnaDatos.appendChild(oTitulo);

	var oTabla=document.createElement("table");
	oTabla.classList.add("table");
    oTabla.classList.add("table-sm");

    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Cartel";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Puntuación";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
	var aPelis=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Pelicula);
	for(var i=0; i<aPelis.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=2;
    	var oImagen=document.createElement("IMG");
    	oImagen.src =(aPelis[i].sUrlImagen=="" ? "images/no-image.jpg" : aPelis[i].sUrlImagen);
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelis[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelis[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearPuntuacion(aPelis[i]));
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAcciones(aPelis[i]));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=4;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aPelis[i]));
	}
	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function crearAcciones(oProduccion){
	var oFormulario=document.createElement("form");
    oFormulario.dataset.produccion=oProduccion.sTitulo.replace(/ /g, "-");

    var oBoton=document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-sm");
    oBoton.classList.add("btn-success");
    oBoton.classList.add("mr-1");
    oBoton.value="+";
    oBoton.addEventListener("click", mostrarMasDatos);
    oFormulario.appendChild(oBoton);
    if(oUpoflix.oUsuarioActivo!=null){
		oBoton=document.createElement("INPUT");
	    oBoton.type="button";
	    oBoton.classList.add("btn");
	    oBoton.classList.add("btn-sm");
	    var aFavs=oUpoflix.oUsuarioActivo.aFavoritos.filter(Produccion => Produccion==oProduccion);
	    if(aFavs.length>0){
	    	oBoton.classList.add("btn-danger");
	    	if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", eliminarSerieFavNavegacion);
		    else
		    	oBoton.addEventListener("click", eliminarPeliFavNavegacion);
	    }else{
			oBoton.classList.add("btn-outline-danger");
	    	if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", agregarSerieFavNavegacion);
		    else
		    	oBoton.addEventListener("click", agregarPeliFavNavegacion);
	    }
	    oBoton.classList.add("mr-1");
	    oBoton.value="❤";
	    oFormulario.appendChild(oBoton);
	    if(oUpoflix.oUsuarioActivo.sRol=="admin"){
			oBoton=document.createElement("INPUT");
		    oBoton.type="button";
		    oBoton.classList.add("btn");
		    oBoton.classList.add("btn-sm");
		    oBoton.classList.add("btn-outline-dark");
		    oBoton.classList.add("mr-1");
		    oBoton.value="X";
		    if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", eliminarSerie);
		    else
		    	oBoton.addEventListener("click", eliminarPeli);
		    oFormulario.appendChild(oBoton);

			oBoton=document.createElement("INPUT");
		    oBoton.type="button";
		    oBoton.classList.add("btn");
		    oBoton.classList.add("btn-sm");
		    oBoton.classList.add("btn-outline-dark");
		    oBoton.value="edit";
			oBoton.addEventListener("click", editar);
		    oFormulario.appendChild(oBoton);
		}
	}
    return oFormulario;
}

function eliminarPeli(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.bajaProduccion(sTitulo.replace(/-/g, " "))){
		alert("Película eliminada de recursos.");
		listarPelis();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function eliminarPeliFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.eliminarFavorito(sTitulo.replace(/-/g, " "))){
		alert("Película eliminada de favoritos");
		listarPelis();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function agregarPeliFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.añadirFavorito(sTitulo.replace(/-/g, " "))){
		alert("Película agregada a favoritos");
		listarPelis();
	}else{
		alert("Error al agregar, inténtelo de nuevo.");
	}
}

function listarSeries(){
	oCapaContenido.empty();
	ocultarFormularios();
	
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTitulo=document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Series";
	oColumnaDatos.appendChild(oTitulo);

	var oTabla=document.createElement("table");
	oTabla.classList.add("table");
    oTabla.classList.add("table-sm");

    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Cartel";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Puntuación";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Temporadas";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);

	var aSeries=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Serie);
	for(var i=0; i<aSeries.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=3;
    	var oImagen=document.createElement("IMG");
    	oImagen.src =(aSeries[i].sUrlImagen=="" ? "images/no-image.jpg" : aSeries[i].sUrlImagen);
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeries[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeries[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearPuntuacion(aSeries[i]));
    	oCelda = oFila.insertCell(-1);
    	var oBoton=document.createElement("INPUT");
   		oBoton.type="button";
    	oBoton.classList.add("btn");
    	oBoton.classList.add("btn-sm");
    	oBoton.classList.add("btn-outline-warning");
    	oBoton.classList.add("mr-1");
    	oBoton.dataset.produccion=aSeries[i].sTitulo.replace(/ /g,"-");;
    	oBoton.value=aSeries[i].aTemporadas.length;
    	oBoton.addEventListener("click", mostrarTemporadas);
    	oCelda.appendChild(oBoton);
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAcciones(aSeries[i]));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aSeries[i]));

		//fila temporadas
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaTemporadas(aSeries[i]));
	}

	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function eliminarSerie(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.bajaProduccion(sTitulo.replace(/-/g, " "))){
		alert("Serie eliminada de recursos.");
		listarSeries();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function eliminarSerieFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.eliminarFavorito(sTitulo.replace(/-/g, " "))){
		alert("Serie eliminada de favoritos");
		listarSeries();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function agregarSerieFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.añadirFavorito(sTitulo.replace(/-/g, " "))){
		alert("Serie agregada a favoritos");
		listarSeries();
	}else{
		alert("Error al agregar, inténtelo de nuevo.");
	}
}

function crearPuntuacion(oProduccion){
	var oCapaPuntuacion=document.createElement("div");
	var oPuntuacion=document.createElement("p");
	oPuntuacion.textContent=(oProduccion.fNotaMedia==0 ? "Sin puntuación" : oProduccion.fNotaMedia);
	var oStar=document.createElement("span");
	oCapaPuntuacion.appendChild(oStar);
	oCapaPuntuacion.appendChild(oPuntuacion);
	return oCapaPuntuacion;
}

function buscar(){
	document.querySelector("#capaResultado").empty();
	var oTitulo=document.createElement("h4");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Resultados:";
	document.querySelector("#capaResultado").appendChild(oTitulo);
	var frmFormulario=document.querySelector("#frmABuscador");
	var sTipo=document.querySelector("#frmABuscador input:checked").value;
	var sGenero=frmFormulario.selectGenero.value;
	var sDate=Date.parse(frmFormulario.busqfechaInicio.value);
	var dFechaInicio=(isNaN(sDate) ? null : new Date(sDate));
	sDate=Date.parse(frmFormulario.busqfechaFin.value);
	var dFechaFin=(isNaN(sDate) ? null : new Date(sDate));
	var iPuntuacion=(frmFormulario.txtPuntuacionMinima.value=="" ? 0 : parseInt(frmFormulario.txtPuntuacionMinima.value, 10));

	switch (sTipo) {
		case "all":
			var aResultadoPelis=oUpoflix.buscarPelicula(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			var aResultadoSeries=oUpoflix.buscarSerie(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			var aResultado=aResultadoPelis.concat(aResultadoSeries);
			if(aResultado.length==0){
				document.querySelector("#capaResultado").textContent="La búsqueda no ha devuelto resultados";
			}else{
				document.querySelector("#capaResultado").appendChild(mostrarResultados(aResultado));
			}
			break;
		case "Pelicula":
			var aResultado=oUpoflix.buscarPelicula(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			if(aResultado.length==0){
				document.querySelector("#capaResultado").textContent="La búsqueda no ha devuelto resultados";
			}else{
				document.querySelector("#capaResultado").appendChild(mostrarResultados(aResultado));
			}
			break;
		case "Serie":
			var aResultado=oUpoflix.buscarSerie(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			if(aResultado.length==0){
				document.querySelector("#capaResultado").textContent="La búsqueda no ha devuelto resultados";
			}else{
				document.querySelector("#capaResultado").appendChild(mostrarResultados(aResultado));
			}
			break;
		default:
			alert("Error desconocido, vuelve a intentarlo");
			break;
	}
}

function mostrarResultados(aProducciones){
	var oTabla = document.createElement("table");
    oTabla.classList.add("table");
    oTabla.classList.add("table-sm");
    oTabla.classList.add("table-hover");
    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Tipo";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    
    oCelda = document.createElement("TH");
    oCelda.textContent = "Puntuación";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Año";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);
    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
    
	for(var i=0; i<aProducciones.length;i++){
        oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aProducciones[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = (aProducciones[i] instanceof Serie ? "Serie" : "Película");
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aProducciones[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearPuntuacion(aProducciones[i]));
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = (aProducciones[i] instanceof Serie ? aProducciones[i].dFechaInicio.getFullYear()+"-"+aProducciones[i].dFechaFin.getFullYear() : aProducciones[i].iAñoEstreno);
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAccionesBusqueda(aProducciones[i]));
    }
	return oTabla;
}

function crearAccionesBusqueda(oProduccion){
var oFormulario=document.createElement("form");
    oFormulario.dataset.produccion=oProduccion.sTitulo.replace(/ /g, "-");
   
    if(oUpoflix.oUsuarioActivo!=null){
		var oBoton=document.createElement("INPUT");
	    oBoton.type="button";
	    oBoton.classList.add("btn");
	    oBoton.classList.add("btn-sm");
	    var aFavs=oUpoflix.oUsuarioActivo.aFavoritos.filter(Produccion => Produccion==oProduccion);
	    if(aFavs.length>0){
	    	oBoton.classList.add("btn-danger");
	    	if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", eliminarSerieFavNavegacion);
		    else
		    	oBoton.addEventListener("click", eliminarPeliFavNavegacion);
	    }else{
			oBoton.classList.add("btn-outline-danger");
	    	if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", agregarSerieFavNavegacion);
		    else
		    	oBoton.addEventListener("click", agregarPeliFavNavegacion);
	    }
	    oBoton.classList.add("mr-1");
	    oBoton.value="❤";
	    oFormulario.appendChild(oBoton);
	    if(oUpoflix.oUsuarioActivo.sRol=="admin"){
			oBoton=document.createElement("INPUT");
		    oBoton.type="button";
		    oBoton.classList.add("btn");
		    oBoton.classList.add("btn-sm");
		    oBoton.classList.add("btn-outline-dark");
		    oBoton.classList.add("mr-1");
		    oBoton.value="X";
		    if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", eliminarSerie);
		    else
		    	oBoton.addEventListener("click", eliminarPeli);
		    oFormulario.appendChild(oBoton);

			oBoton=document.createElement("INPUT");
		    oBoton.type="button";
		    oBoton.classList.add("btn");
		    oBoton.classList.add("btn-sm");
		    oBoton.classList.add("btn-outline-dark");
		    oBoton.value="edit";
			oBoton.addEventListener("click", editar);
		    oFormulario.appendChild(oBoton);
		}
	}
    return oFormulario;
}

function getSelectGenero(){
	var aGeneros=["Acción","Aventuras","Comedia","Drama","Terror","Musical","Ciencia ficción","Bélica","Western","Thriller","Infantil"];
	aGeneros=aGeneros.sort();
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectGenero";
	var oOption=document.createElement("option");
	oOption.value="cualquiera";
	oOption.textContent="Todos los géneros";
	oSelect.appendChild(oOption);
	for(var i=0;i<aGeneros.length;i++){
		oOption=document.createElement("option");
		oOption.value=aGeneros[i];
		oOption.textContent=aGeneros[i];
		oSelect.appendChild(oOption);
	}
	return oSelect;
}