//document.querySelector("#capaBusqueda input[type=button]").addEventListener("click", buscar);
document.querySelector("#capaBusqueda input[type=button]").addEventListener("click", function(){alert("resultados busqueda");});
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