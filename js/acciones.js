function cargarDatosUsuario(){
    $(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    //ENVIAR USUARIO ACTIVO
    //GET DATOS USUARIO
    //FORMAR HTML
}

function cargarPelisFavoritas(){
    $(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    //ENVIAR USUARIO ACTIVO
    //GET TODAS LAS PRODUCCIONES PUNTUADAS
    //FORMAR HTML
}

function cerrarSesion(oEvento){
    var oE = oEvento || window.event;
    oE.preventDefault();
    var bSalir = confirm("¿Quiere cerrar sesión?");
    if (bSalir){
        oUsuarioActivo=null;
        inicio();
    }
}

function cargarCrearCuenta(){
    $(".row").hide();
    $('#capaCrearCuenta').show();
    if($('#capaCrearCuenta div').size() == 0) 
        $("#capaCrearCuenta").load("formularios/crearCuenta.html", function(){$.getScript("js/crearCuenta.js");});
}

function cargarIniciarSesion(){
    $(".row").hide();
    $('#capaIniciarSesion').show();
    if($('#capaIniciarSesion div').size() == 0) 
        $("#capaIniciarSesion").load("formularios/iniciarSesion.html", function(){$.getScript("js/iniciarSesion.js");});
}

function listarPelis(){
    $(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    pedirListado();
    //GET DATOS TODAS LAS PRODUCCIONES DE BBDD
    //FORMAR HTML
}

function cargarBuscar(){
    $(".row").hide();
    $('#capaBusqueda').show();
    if($('#capaBusqueda div').size() == 0) 
        $("#capaBusqueda").load("formularios/busqueda.html", function(){$.getScript("js/busqueda.js");});
    else{
        $("#capaResultado").empty();
        frmABuscador.reset();
    }
}

function cargarAñadirProduccion(){
    $(".row").hide();
    $('#capaAddProduccion').show();
    if($('#capaAddProduccion div').size() == 0) 
        $("#capaAddProduccion").load("formularios/addProduccion.html", function(){$.getScript("js/addProduccion.js");});
    else{
        frmAddProduccion.reset();
        $(".elegir-actor").remove();
        $(".elegir-director").remove();
        $(".nuevo-actor").remove();
        $(".nuevo-director").remove();
    }
}

function cargarModificarProduccion(oEvento){
    var oE = oEvento || window.event;
    
    $(".row").hide();
    $('#capaModificarProduccion').show();
    if($('#capaModificarProduccion div').size() == 0) 
        $("#capaModificarProduccion").load("formularios/modificarProduccion.html", function(){
            document.querySelector("#frmModificarProduccion").dataset.titulo=oE.target.parentElement.dataset.produccion;
            $.getScript("js/modProduccion.js");});
    else{
        frmModificarProduccion.reset();
        $(".elegir-actor").remove();
        $(".elegir-director").remove();
        $(".nuevo-actor").remove();
        $(".nuevo-director").remove();
        cargarDatosProduccion();
    }
}

function cargarEditarElenco(){
    $(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    $.ajax({
        url: "./php/getPersonas.php",
        dataType: 'json',
        cache: false,
        async: true, 
        method: "GET",
        success: procesarEditarPersonas
    });

}

//necesarias para varios archivos
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

function instanciarXHR() {
    var xhttp = null;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhttp;
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