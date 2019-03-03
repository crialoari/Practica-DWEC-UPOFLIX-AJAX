function pedirListadoFavs(){
	var sParametros = "usuario=" + oUsuarioActivo.user;
    $.get("./php/listadoPeliculasFavsXML.php", sParametros, procesoRespuestaFavsXML, 'xml');
}

function procesoRespuestaFavsXML(oXML){
	//aPeliculasFavoritas=oXML.querySelectorAll("produccion");
	var aPelisFav=oXML.querySelectorAll("produccion");

	var oCapaContenido=document.querySelector("#contenido");
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
	
	for(var i=0; i<aPelisFav.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=2;
    	var oImagen = document.createElement("IMG");
    	oImagen.src =(aPelisFav[i].querySelector("cartel").textContent=="" ? "./images/no-image.jpg" : aPelisFav[i].querySelector("cartel").textContent);
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelisFav[i].querySelector("titulo").textContent;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelisFav[i].querySelector("genero").textContent;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearPuntuar(aPelisFav[i].querySelector("titulo").textContent,aPelisFav[i].querySelector("puntuacion").textContent));
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAccionesFav(aPelisFav[i].querySelector("titulo").textContent));

    	//fila datos
    	        //fila datos
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.colSpan=4;
        oCelda.classList.add("col-12");

        var oCapaDatos=document.createElement("div");
        oCapaDatos.id=aPelisFav[i].querySelector("titulo").textContent.replace(/ /g, "-");
        oCapaDatos.classList.add("d-none");
    
        var oResumen=document.createElement("p");
        oResumen.textContent=aPelisFav[i].querySelector("resumen").textContent;
        oCapaDatos.appendChild(oResumen);
    
        var oLista=document.createElement("ul");
        var aActores=aPelisFav[i].querySelectorAll("actor");
        for(var j=0; j<aActores.length;j++){
            var actor=document.createElement("li");
            actor.textContent=aActores[j].querySelector("nombre").textContent+" "+aActores[j].querySelector("apellidos").textContent;
            oLista.appendChild(actor);
        }
        oCapaDatos.appendChild(oLista);

        oLista=document.createElement("ul");
        var aDirectores=aPelisFav[i].querySelectorAll("director");
        for(var j=0; j<aDirectores.length;j++){
            var director=document.createElement("li");
            director.textContent=aDirectores[j].querySelector("nombre").textContent+" "+aDirectores[j].querySelector("apellidos").textContent;
            oLista.appendChild(director);
        }
        oCapaDatos.appendChild(oLista);

        var oAnio=document.createElement("p");
        oAnio.textContent=aPelisFav[i].querySelector("estreno").textContent;
        oCapaDatos.appendChild(oAnio);
        oCelda.appendChild(oCapaDatos);
	}
	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function crearPuntuar(titulo,puntuacion){
	var oCapaPuntuar=document.createElement("div");
    oCapaPuntuar.classList.add("rating-stars");
    oCapaPuntuar.dataset.produccion=titulo.replace(/ /g, "-");

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
	var ancho=puntuacion*20;
    oCapaTapar.style.width=ancho+"px";
    return oCapaPuntuar;
}

function crearAccionesFav(titulo){
	var oFormulario=document.createElement("form");
    oFormulario.dataset.produccion=titulo.replace(/ /g, "-");

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
    oBoton.addEventListener("click", eliminarPeliFavUsuario);
    oFormulario.appendChild(oBoton);
    return oFormulario;
}

function eliminarPeliFavUsuario(oEvento){
    var oE = oEvento || window.event;
    var sTitulo=oE.target.parentElement.dataset.produccion;
    //ELIMINAR DE FAVORITO
    crearDialog("falta eliminar favorito usuario");
}

function puntuarProduccion(oEvento){
	var oE = oEvento || window.event;
	/*var sTitulo=oE.target.parentElement.dataset.produccion.replace(/-/g, " ");
    var iNota=parseInt(oE.target.dataset.value,10);
    var ancho=iNota*20;
    var oCapaTapar=oE.target.parentElement.lastElementChild;
    oCapaTapar.style.width=ancho+"px";
    if(oUpoflix.puntuar(iNota,sTitulo))
	   crearDialog("Puntuación añadida.");
    else
        crearDialog("Puntuación cambiada.");*/
    crearDialog("falta puntuar");
}