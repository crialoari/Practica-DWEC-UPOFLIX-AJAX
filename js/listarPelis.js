function pedirListado() {
    var oAjax = instanciarXHR();
    oAjax.open("GET", "./php/listadoPeliculasXML.php");
    oAjax.addEventListener("readystatechange", procesoRespuestalistadoPeliculasXML, false);
    oAjax.send(null);
}
function instanciarXHR() {
    var xhttp = null;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhttp;
}

function procesoRespuestalistadoPeliculasXML() {
    var oAjax = this;
    if (oAjax.readyState == 4 && oAjax.status == 200) {
        //console.log(oAjax.responseText);
        var oXML = oAjax.responseXML;
        construirListado(oXML);
    }
}

function construirListado(oXML){
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
    var aPelis=oXML.querySelectorAll("produccion");
    for(var i=0; i<aPelis.length;i++){
        //fila principal
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.rowSpan=2;
        var oImagen=document.createElement("IMG");
        oImagen.src =(aPelis[i].querySelector("cartel").textContent=="" ? "./images/no-image.jpg" : aPelis[i].querySelector("cartel").textContent);
        oImagen.style.width = "100px";
        oCelda.appendChild(oImagen);
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = aPelis[i].querySelector("titulo").textContent;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = aPelis[i].querySelector("genero").textContent;
        oCelda = oFila.insertCell(-1);
        //oCelda.appendChild(crearPuntuacion(aPelis[i]));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(crearAcciones(aPelis[i].querySelector("titulo").textContent));

        //fila datos
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.colSpan=4;
        oCelda.classList.add("col-12");
        //oCelda.appendChild(crearCapaMasDatos(aPelis[i]));
    }
    oColumnaDatos.appendChild(oTabla);
    $("#contenido").append(oColumnaDatos);
}

function mostrarMasDatos(oEvento){
    var oE = oEvento || window.event;
    var sProduccion=oE.target.parentElement.dataset.produccion;
    document.querySelector("div#"+sProduccion).classList.toggle("d-none");
}

function crearAcciones(titulo){
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
    
    if(oUsuarioActivo!=null){
        oBoton=document.createElement("INPUT");
        oBoton.type="button";
        oBoton.classList.add("btn");
        oBoton.classList.add("btn-sm");
        var aFavs=aPeliculasFavoritas;
        if(aFavs.length>0){
            oBoton.classList.add("btn-danger");
            oBoton.addEventListener("click", eliminarPeliFavNavegacion);
        }else{
            oBoton.classList.add("btn-outline-danger");
            oBoton.addEventListener("click", agregarPeliFavNavegacion);
        }
        oBoton.classList.add("mr-1");
        oBoton.value="❤";
        oFormulario.appendChild(oBoton);
        if(oUsuarioActivo.sRol=="admin"){
            oBoton=document.createElement("INPUT");
            oBoton.type="button";
            oBoton.classList.add("btn");
            oBoton.classList.add("btn-sm");
            oBoton.classList.add("btn-outline-dark");
            oBoton.classList.add("mr-1");
            oBoton.value="X";
            oBoton.addEventListener("click", eliminarPeli);
            oFormulario.appendChild(oBoton);

            oBoton=document.createElement("INPUT");
            oBoton.type="button";
            oBoton.classList.add("btn");
            oBoton.classList.add("btn-sm");
            oBoton.classList.add("btn-outline-dark");
            oBoton.value="edit";
            oBoton.addEventListener("click", cargarModificarProduccion);
            oFormulario.appendChild(oBoton);
        }
    }
    return oFormulario;
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