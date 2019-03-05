function cargarDatosUsuario(){
    $(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    mostrarDatosUsuario();
}

function cargarPelisFavoritas(){
    $(".row").hide();
    $("#contenido").empty();
    $("#contenido").show();
    pedirListadoFavs();
}

function cerrarSesion(){
    var capaDialog="<div title='Alerta'><p>¿Quiere cerrar sesión?</p></div>";
    $(capaDialog).dialog({
      resizable:false,
      modal: true,
      buttons: {
        Aceptar: function() {
            oUsuarioActivo=null;
            inicio();
            $( this ).dialog("close");
        },
        Cancelar: function() {
          $( this ).dialog("close");
        }
      }
    });
}

function cargarCrearCuenta(){
    $(".row").hide();
    $('#capaCrearCuenta').show();
    if($('#capaCrearCuenta div').size() == 0) 
        $("#capaCrearCuenta").load("formularios/crearCuenta.html", function(){$.getScript("js/crearCuenta.js");});
    else
        frmCrearCuenta.reset();
}

function cargarIniciarSesion(){
    $(".row").hide();
    $('#capaIniciarSesion').show();
    if($('#capaIniciarSesion div').size() == 0) 
        $("#capaIniciarSesion").load("formularios/iniciarSesion.html", function(){$.getScript("js/iniciarSesion.js");});
    else
        frmIniciarSesion.reset();
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