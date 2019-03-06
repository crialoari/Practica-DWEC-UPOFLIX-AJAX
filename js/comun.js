//DIALOG JQUERY UI
function crearDialog(mensaje){
    var capaDialog="<div title='Información'><p>"+mensaje+"</p></div>";
    $(capaDialog).dialog(
        {resizable:false,modal:true});
}

//INSTANCIAR OBJETO XHR
function instanciarXHR() {
    var xhttp = null;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhttp;
}

//ELIMINAR CAPA ACTOR/DIRECTOR CON BOTON
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

//CREAR CAPA PUNTUACION CON NOTA
function crearPuntuacion(nota){
    var oCapaPuntuacion=document.createElement("div");
    var oPuntuacion=document.createElement("p");
    oPuntuacion.textContent=(nota=="0" ? "Sin puntuación" : parseFloat(nota).toFixed(2));
    var oStar=document.createElement("span");
    oStar.classList.add("puntuacion");
    oCapaPuntuacion.appendChild(oStar);
    oCapaPuntuacion.appendChild(oPuntuacion);
    return oCapaPuntuacion;
}

//ELIMINAR PRODUCCION
function eliminarPeli(oEvento){
    var oE = oEvento || window.event;
    var sTitulo=oE.target.parentElement.dataset.produccion.replace("_-_",":");
    sTitulo=sTitulo.replace(/-/g, " ");
    sTitulo=sTitulo.replace("__","¿");
    sTitulo=sTitulo.replace("_","?");
    $.ajax({
        url: "./php/deleteProduccion.php",
        dataType: 'json',
        cache: false,
        async: true, 
        data: "titulo="+sTitulo,
        method: "POST",
        success: procesoRespuestaEliminarPeli
    });
}

function procesoRespuestaEliminarPeli(oDatos) {
    if (oDatos.error == 0)
        listarPelis();
    alert(oDatos.mensaje);
}

//ELIMINAR-AGREGAR FAVS
function eliminarPeliFavLista(oEvento){
    var oE = oEvento || window.event;
    var sTitulo=oE.target.parentElement.dataset.produccion.replace("_-_",":");
    sTitulo=sTitulo.replace(/-/g, " ");
    sTitulo=sTitulo.replace("__","¿");
    sTitulo=sTitulo.replace("_","?");
    var oAjax=instanciarXHR();
    var sURL="./php/deletePuntuacion.php";
    var sParametros="titulo="+sTitulo+"&usuario="+oUsuarioActivo.user;
    oAjax.addEventListener("readystatechange", respuestaFavLista);
    oAjax.open("POST", encodeURI(sURL), true);
    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oAjax.send(encodeURI(sParametros));
}

function agregarPeliFavLista(oEvento){
    var oE = oEvento || window.event;
    var sTitulo=oE.target.parentElement.dataset.produccion.replace("_-_",":");
    sTitulo=sTitulo.replace(/-/g, " ");
    sTitulo=sTitulo.replace("__","¿");
    sTitulo=sTitulo.replace("_","?");
    var oAjax=instanciarXHR();
    var sURL="./php/addPuntuacion.php";
    var sParametros="nota=0&titulo="+sTitulo+"&usuario="+oUsuarioActivo.user;
    oAjax.addEventListener("readystatechange", respuestaFavLista);
    oAjax.open("POST", encodeURI(sURL), true);
    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oAjax.send(encodeURI(sParametros));
}

function respuestaFavLista(){
    var oAjax=this;
    if(oAjax.readyState==4 && oAjax.status==200){
        //console.log(oAjax.responseText);
        var oRespuesta=JSON.parse(oAjax.responseText);
        if(oRespuesta.error==0){
            listarPelis();
        }
        crearDialog(oRespuesta.mensaje);
    }
}

//MOSTRAR CAPA DATOS PRODUCCION
function mostrarMasDatos(oEvento){
    var oE = oEvento || window.event;
    var sProduccion=oE.target.parentElement.dataset.produccion;
    document.querySelector("div#"+sProduccion).classList.toggle("d-none");
}

//GET PERSONAS PARA SELECT
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

//GET GENERO PARA SELECT
function rellenarDesplegableGenero() {
    if (localStorage["generos"] != undefined) {
        $("select[name=selectGenero]").html(localStorage["generos"]);
    } else {
        $.get("./php/getGeneros.php", null, procesoRespuestaGetGeneros, 'html');
    }
}

function procesoRespuestaGetGeneros(sHTML) {
    localStorage["generos"] = sHTML;
    $("select[name=selectGenero]").html(localStorage["generos"]);
}

//SOLO NUMEROS PARA DURACION
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

//CREAR CAPA DIRECTOR EXISTENTE
function capaDirectorExistente(){
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
    return oCapa;
}

//CREAR CAPA ACTOR EXISTENTE
function capaActorExistente(){
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
    return oCapa;
}

//CREAR CAPA ACTOR NUEVO
function capaActorNuevo(){
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
    return oCapa;
}
//CREAR CAPA DIRECTOR NUEVO
function capaDirectorNuevo(){
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
    return oCapa
}