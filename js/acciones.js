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
    pedirListadoFavs();
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
        $("#datosEstrenoDuracion").show();
    }
}

function cargarModificarProduccion(oEvento){
    var oE = oEvento || window.event;
    $(".row").hide();
    $('#capaModificarProduccion').show();
    var sTituloAntiguo=oE.target.parentElement.dataset.produccion.replace("_-_",":")
    sTituloAntiguo=sTituloAntiguo.replace(/-/g, " ");
    sTituloAntiguo=sTituloAntiguo.replace("__","¿");
    sTituloAntiguo=sTituloAntiguo.replace("_","?");
    if($('#capaModificarProduccion div').size() == 0) 
        $("#capaModificarProduccion").load("formularios/modificarProduccion.html", function(){
            document.querySelector("#frmModificarProduccion #txtTituloAntiguo").value=sTituloAntiguo;
            $.getScript("js/modProduccion.js");});
    else{
        frmModificarProduccion.reset();
        document.querySelector("#frmModificarProduccion #txtTituloAntiguo").value=sTituloAntiguo;
        $(".elegir-actor").remove();
        $(".elegir-director").remove();
        $(".nuevo-actor").remove();
        $(".nuevo-director").remove();
        $("#datosEstrenoDuracionMod").show();
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