function loadXMLDoc(filename){
        if (window.XMLHttpRequest)
          {
          xhttp=new XMLHttpRequest();
          }
        else // code for IE5 and IE6
          {
          xhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }
        xhttp.open("GET",filename,false);
        
        xhttp.send();
        
        return xhttp.responseXML;
}

function cargarDatosPrueba(){
  var oXML=loadXMLDoc("datos.xml");
  var oSeries=oXML.getElementsByTagName("serie");
  var oPeliculas=oXML.getElementsByTagName("pelicula");
  var oUsuarios=oXML.getElementsByTagName("usuario");
  var oPersonas=oXML.getElementsByTagName("persona");
  var oTemporadas=oXML.getElementsByTagName("temporada");
  var oCapitulos=oXML.getElementsByTagName("capitulo");
  
  for(var i=0;i<oUsuarios.length;i++){
    oUpoflix.altaUsuario(new Usuario(oUsuarios[i].querySelector("user").textContent,
              oUsuarios[i].querySelector("nombre").textContent,
              oUsuarios[i].querySelector("apellido").textContent,
              oUsuarios[i].querySelector("email").textContent,
              oUsuarios[i].querySelector("contraseña").textContent,
              new Date(oUsuarios[i].querySelector("fechaRegistro").textContent),
              oUsuarios[i].querySelector("rol").textContent));
  }
  
  for(var i=0;i<oSeries.length;i++){
    oUpoflix.añadirProduccion(new Serie(oSeries[i].querySelector("titulo").textContent,
                oSeries[i].querySelector("genero").textContent,
                [],
                [],
                oSeries[i].querySelector("resumen").textContent,
                oSeries[i].querySelector("urlImagen").textContent,
                new Date(oSeries[i].querySelector("fechaInicio").textContent),
                new Date(oSeries[i].querySelector("fechaFin").textContent)));
  }

  for(var i=0;i<oPeliculas.length;i++){
    oUpoflix.añadirProduccion(new Pelicula(oPeliculas[i].querySelector("titulo").textContent,
                oPeliculas[i].querySelector("genero").textContent,
                [],
                [],
                oPeliculas[i].querySelector("resumen").textContent,
                oPeliculas[i].querySelector("urlImagen").textContent,
                parseInt(oPeliculas[i].querySelector("añoEstreno").textContent),
                parseInt(oPeliculas[i].querySelector("duracion").textContent)));
  }
  
  for(var i=0;i<oPersonas.length;i++){
    oUpoflix.altaPersona(new Persona(oPersonas[i].querySelector("nombre").textContent,
              oPersonas[i].querySelector("apellido").textContent));
  }
  
  for(var i=0;i<oTemporadas.length;i++){
    oUpoflix.añadirTemporada(oTemporadas[i].querySelector("tituloSerie").textContent,
                oTemporadas[i].querySelector("numTemporada").textContent,
                oTemporadas[i].querySelector("resumen").textContent);
  }
  
  for(var i=0;i<oCapitulos.length;i++){
    oUpoflix.añadirCapitulo(oCapitulos[i].querySelector("tituloSerie").textContent,
                oCapitulos[i].querySelector("numTemporada").textContent,
                oCapitulos[i].querySelector("numCapitulo").textContent,
                oCapitulos[i].querySelector("resumen").textContent);
  }
  
  oUpoflix.iniciarSesion("carlos","C4rl0s");
}