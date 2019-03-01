function mostrarPelisFavoritas(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	ocultarFormularios();
	
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTitulo=document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Películas favoritas";
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
    oCelda.textContent = "Puntuar";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
	var aPelisFav=oUpoflix.oUsuarioActivo.aFavoritos.filter(Produccion => Produccion instanceof Pelicula);
	for(var i=0; i<aPelisFav.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=2;
    	var oImagen = document.createElement("IMG");
    	oImagen.src =(aPelisFav[i].sUrlImagen=="" ? "images/no-image.jpg" : aPelisFav[i].sUrlImagen);
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelisFav[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelisFav[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearPuntuar(aPelisFav[i]));
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAccionesFav(aPelisFav[i]));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=4;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aPelisFav[i]));
	}
	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function mostrarSeriesFavoritas(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	ocultarFormularios();
	
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTitulo=document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Series favoritas";
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
    oCelda.textContent = "Puntuar";
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

	var aSeriesFav=oUpoflix.oUsuarioActivo.aFavoritos.filter(Produccion => Produccion instanceof Serie);
	for(var i=0; i<aSeriesFav.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=3;
    	var oImagen=document.createElement("IMG");
    	oImagen.src =(aSeriesFav[i].sUrlImagen=="" ? "images/no-image.jpg" : aSeriesFav[i].sUrlImagen);
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeriesFav[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeriesFav[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearPuntuar(aSeriesFav[i]));
    	oCelda = oFila.insertCell(-1);
    	var oBoton=document.createElement("INPUT");
   		oBoton.type="button";
    	oBoton.classList.add("btn");
    	oBoton.classList.add("btn-sm");
    	oBoton.classList.add("btn-outline-warning");
    	oBoton.classList.add("mr-1");
    	oBoton.dataset.produccion=aSeriesFav[i].sTitulo.replace(/ /g,"-");
    	oBoton.value=aSeriesFav[i].aTemporadas.length;
    	oBoton.addEventListener("click", mostrarTemporadas);
    	oCelda.appendChild(oBoton);
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAccionesFav(aSeriesFav[i]));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aSeriesFav[i]));

		//fila temporadas
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaTemporadas(aSeriesFav[i]));
	}
	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function crearPuntuar(oProduccion){
	var oCapaPuntuar=document.createElement("div");
    oCapaPuntuar.classList.add("rating-stars");
    oCapaPuntuar.dataset.produccion=oProduccion.sTitulo.replace(/ /g, "-");

    var oStar=document.createElement("span");
    oStar.title="Malísima";
    oStar.dataset.value=1;
    oStar.classList.add("star-1");
    oStar.addEventListener("click", puntuarProduccion);
    oCapaPuntuar.appendChild(oStar);

    var oStar=document.createElement("span");
    oStar.title="Mala";
    oStar.dataset.value=2;
    oStar.classList.add("star-2");
    oStar.addEventListener("click", puntuarProduccion);
    oCapaPuntuar.appendChild(oStar);

    var oStar=document.createElement("span");
    oStar.title="Normal";
    oStar.dataset.value=3;
    oStar.classList.add("star-3");
    oStar.addEventListener("click", puntuarProduccion);
    oCapaPuntuar.appendChild(oStar);

    var oStar=document.createElement("span");
    oStar.title="Buena";
    oStar.dataset.value=4;
    oStar.classList.add("star-4");
    oStar.addEventListener("click", puntuarProduccion);
    oCapaPuntuar.appendChild(oStar);

    var oStar=document.createElement("span");
    oStar.title="Obra maestra";
    oStar.dataset.value=5;
    oStar.classList.add("star-5");
    oStar.addEventListener("click", puntuarProduccion);
    oCapaPuntuar.appendChild(oStar);

    var oCapaTapar=document.createElement("div");
    oCapaTapar.classList.add("cover");
    oCapaPuntuar.appendChild(oCapaTapar);

    for(var i=0;i<oProduccion.aPuntuaciones.length;i++){
        if(oProduccion.aPuntuaciones[i].oUsuario==oUpoflix.oUsuarioActivo){
            var ancho=oProduccion.aPuntuaciones[i].iNota*20;
            oCapaTapar.style.width=ancho+"px";
        }
    }
    return oCapaPuntuar;
}

function puntuarProduccion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion.replace(/-/g, " ");
    var iNota=parseInt(oE.target.dataset.value,10);
    var ancho=iNota*20;
    var oCapaTapar=oE.target.parentElement.lastElementChild;
    oCapaTapar.style.width=ancho+"px";
    if(oUpoflix.puntuar(iNota,sTitulo))
	   alert("Puntuación añadida.");
    else
        alert("Puntuación cambiada.");
}

function crearAccionesFav(oProduccion){
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

	oBoton=document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-sm");
    oBoton.classList.add("btn-danger");
    oBoton.classList.add("mr-1");
    oBoton.value="❤";
    if(oProduccion instanceof Serie)
                oBoton.addEventListener("click", eliminarSerieFavUsuario);
            else
                oBoton.addEventListener("click", eliminarPeliFavUsuario);
    oFormulario.appendChild(oBoton);
    return oFormulario;
}

function crearCapaMasDatos(oProduccion){
	var oCapaDatos=document.createElement("div");
    oCapaDatos.id=oProduccion.sTitulo.replace(/ /g, "-");
    oCapaDatos.classList.add("d-none");
    
    var oResumen=document.createElement("p");
    oResumen.textContent=oProduccion.sResumen;
   	oCapaDatos.appendChild(oResumen);
    
    var oLista=document.createElement("ul");
    for(var j=0; j<oProduccion.aActores.length;j++){
    	var actor=document.createElement("li");
    	actor.textContent=oProduccion.aActores[j].sNombre+" "+oProduccion.aActores[j].sApellido;
    	oLista.appendChild(actor);
    }
    oCapaDatos.appendChild(oLista);
    oLista=document.createElement("ul");
	for(var j=0; j<oProduccion.aDirectores.length;j++){
    	var director=document.createElement("li");
    	director.textContent=oProduccion.aDirectores[j].sNombre+" "+oProduccion.aDirectores[j].sApellido;
    	oLista.appendChild(director);
    }
    oCapaDatos.appendChild(oLista);

	var oAnio=document.createElement("p");
	oAnio.textContent=(oProduccion instanceof Serie ? oProduccion.dFechaInicio.getFullYear()+"-"+oProduccion.dFechaFin.getFullYear() : oProduccion.iAñoEstreno);
	oCapaDatos.appendChild(oAnio);
	return oCapaDatos;
}

function mostrarMasDatos(oEvento){
	var oE = oEvento || window.event;
	var sProduccion=oE.target.parentElement.dataset.produccion;
	document.querySelector("div#"+sProduccion).classList.toggle("d-none");
}

function crearCapaTemporadas(oSerie){
var oCapaDatos=document.createElement("div");
    oCapaDatos.id="temp"+oSerie.sTitulo.replace(/ /g, "-");
    oCapaDatos.classList.add("d-none");
    var oTitulo=document.createElement("h6");
    oTitulo.textContent="Temporadas:";
    oCapaDatos.appendChild(oTitulo);
	var oListaTemp=document.createElement("ul");
    for(var i=0; i<oSerie.aTemporadas.length;i++){
    	var oLi=document.createElement("li");
    	oLi.textContent="Temporada "+oSerie.aTemporadas[i].iNumTemporada;
    	oListaTemp.appendChild(oLi);
    	var oListaCap=document.createElement("ul");
    	for(var j=0; j<oSerie.aTemporadas[i].aCapitulos.length;j++){
			var oLi=document.createElement("li");
			oLi.textContent="Capítulo "+oSerie.aTemporadas[i].aCapitulos[j].iNumCapitulo+": "+oSerie.aTemporadas[i].aCapitulos[j].sResumen;
			oListaCap.appendChild(oLi);
    	}
    	oListaTemp.appendChild(oListaCap);
    }
    oCapaDatos.appendChild(oListaTemp);
	return oCapaDatos;
}

function mostrarTemporadas(oEvento){
	var oE = oEvento || window.event;
	var sSerie=oE.target.dataset.produccion;
	document.querySelector("div#temp"+sSerie).classList.toggle("d-none");
}

function eliminarPeliFavUsuario(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
    if(oUpoflix.eliminarFavorito(sTitulo.replace(/-/g, " "))){
        alert("Película eliminada de favoritos");
        mostrarPelisFavoritas();
    }else{
        alert("Error al eliminar, inténtelo de nuevo.");
    }
}

function eliminarSerieFavUsuario(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.eliminarFavorito(sTitulo.replace(/-/g, " "))){
        alert("Serie eliminada de favoritos");
        mostrarSeriesFavoritas();
    }else{
        alert("Error al eliminar, inténtelo de nuevo.");
    }
}