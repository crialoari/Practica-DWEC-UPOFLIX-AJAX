document.querySelector("#capaBusqueda #btnBuscar").addEventListener("click", buscar);
document.querySelector("#capaBusqueda #btnBorrar").addEventListener("click", function(){document.querySelector("#frmABuscador").reset();});

document.querySelector("input#txtPuntuacionMinima").addEventListener("keypress", soloPuntuacion);
rellenarDesplegableGenero();

//DATEPICKER FECHAS BUSQUEDA
    $("#busqfechaInicio").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "+1Y",
    }).on("change", function() {
          $("#busqfechaFin").datepicker("option", "minDate", getDate(this));
        });

    $("#busqfechaFin").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "+1Y",
    }).on( "change", function() {
        $("#busqfechaInicio").datepicker("option", "maxDate", getDate(this));
      });

   function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( "yy-mm-dd", element.value );
      } catch( error ) {
        date = null;
      }
       return date;
    }
  
function rellenarDesplegableGenero() {
    if (localStorage["generos"] != undefined) {
        $("#capaCriterios select").html(localStorage["generos"]);
    } else {
        $.get("./php/getGeneros.php", null, procesoRespuestaGetGeneros, 'html');
    }
}

function procesoRespuestaGetGeneros(sHTML) {
    localStorage["generos"] = sHTML;
    $("#capaCriterios select").html(localStorage["generos"]);
}

function buscar(){
	var frmFormulario=document.querySelector("#frmABuscador");
	var oCriterios = {
        genero: frmFormulario.selectGenero.value,
        from: frmFormulario.busqfechaInicio.value,
        to: frmFormulario.busqfechaFin.value,
        puntuacion: frmFormulario.txtPuntuacionMinima.value
    };
    
    var sParametros = "criterios=" + JSON.stringify(oCriterios);

    $.get("./php/listadoPeliculasXML.php", sParametros, procesoRespuestaBusquedaXML, 'xml');
}

function procesoRespuestaBusquedaXML(oXML){
	$("#capaResultado").empty();
	var aProducciones=oXML.querySelectorAll("produccion");
	if(aProducciones.length>0){
		document.querySelector("#capaResultado").appendChild(mostrarResultados(aProducciones));
	}else{
		document.querySelector("#capaResultado").textContent="La búsqueda no ha devuelto resultados";
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
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Puntuación";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Estreno";
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
    	oCelda.textContent = aProducciones[i].querySelector("titulo").textContent;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aProducciones[i].querySelector("genero").textContent;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearPuntuacion(aProducciones[i].querySelector("puntuacion").textContent));
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = (aProducciones[i].querySelector("estreno").textContent);
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAccionesBusqueda(aProducciones[i].querySelector("titulo").textContent));
    }
	return oTabla;
}

function crearAccionesBusqueda(titulo){
    var oFormulario=document.createElement("form");
    oFormulario.dataset.produccion=titulo.replace(/ /g, "-");
   
    if(oUsuarioActivo!=null){
		var oBoton=document.createElement("INPUT");
	    oBoton.type="button";
	    oBoton.classList.add("btn");
	    oBoton.classList.add("btn-sm");
	    //COMPROBAR SI ESTÁ ENTRE LAS PELICULAS FAVORITAS
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
    //ELIMINAR DE FAVORITO
    alert("falta eliminar favorito");
}

function agregarPeliFavNavegacion(oEvento){
    var oE = oEvento || window.event;
    var sTitulo=oE.target.parentElement.dataset.produccion;
    //AGREGAR A FAVORITO
    alert("falta agregar favorito");
}

function getSelectGenero(){
	//carga con localstorage
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

function soloPuntuacion(elEvento) {
    var oEvento = elEvento || window.event;
    var codigoChar = oEvento.charCode || oEvento.keyCode;
    var caracter = String.fromCharCode(codigoChar);
    // Cancelar comportamiento predeterminado si no es numero
    if (caracter == "0" || caracter == "1" || caracter == "2" || caracter == "3" || caracter == "4" || caracter == "5"){
    }else{
        oEvento.preventDefault();
    }
}