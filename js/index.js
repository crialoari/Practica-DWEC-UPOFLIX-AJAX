//oUsuarioActivo=null;
oUsuarioActivo={nombre: "cris"};
oUsuarioActivo.sRol="admin";
aPeliculasFavoritas=[];

inicio();

function inicio(){
	cargarMenuUsuario();
	cargarMenuNavegacion();
	cargarContenidoBienvenida();
}

function cargarMenuUsuario(){
	$("#menuUsuario").empty();
	//comprobar usuario activo
	oMenuUsuario=document.querySelector("#menuUsuario");
	if(oUsuarioActivo!=null){
		//usuario registrado
		crearEnlaceMenuUsuario(oUsuarioActivo.sUser);
		document.querySelector("#menuUsuario li:first-child a").addEventListener("click", cargarDatosUsuario);
		crearEnlaceMenuUsuario("Mis pelis");
		document.querySelector("#menuUsuario li:nth-child(2) a").addEventListener("click", cargarPelisFavoritas);
		crearEnlaceMenuUsuario("Salir");
		document.querySelector("#menuUsuario li:nth-child(3) a").addEventListener("click", cerrarSesion);
	}else{
		//usuario no registrado
		crearEnlaceMenuUsuario("Usuario: No registrado");
		crearEnlaceMenuUsuario("Crear cuenta");
		document.querySelector("#menuUsuario li:nth-child(2) a").addEventListener("click", cargarCrearCuenta);
		crearEnlaceMenuUsuario("Entrar");
		document.querySelector("#menuUsuario li:nth-child(3) a").addEventListener("click", cargarIniciarSesion);
	}
}

function cargarMenuNavegacion(){
	$("#menuNavegacion").empty();
	oMenuNavegacion=document.querySelector("#menuNavegacion");
	crearEnlaceMenuNavegacion("Películas");
	document.querySelector("#menuNavegacion li:first-child a").addEventListener("click",listarPelis);
	crearEnlaceMenuNavegacion("Buscar");
	document.querySelector("#menuNavegacion li:nth-child(2) a").addEventListener("click",cargarBuscar);
	//comprobar si es administrador para añadir funciones
	if(oUsuarioActivo!=null && oUsuarioActivo.sRol=="admin"){
		crearEnlaceMenuNavegacion("Añadir producción");
		document.querySelector("#menuNavegacion li:nth-child(3) a").addEventListener("click",cargarAñadirProduccion);
		crearEnlaceMenuNavegacion("Editar elenco");
		document.querySelector("#menuNavegacion li:nth-child(4) a").addEventListener("click",cargarEditarElenco);
	}
}

function crearEnlaceMenuUsuario(sTexto){
	var oLista = document.createElement("li");
	oLista.classList.add("nav-item");
	var oEnlace = document.createElement("a");
	oEnlace.classList.add("nav-link");
	oEnlace.classList.add("text-warning");
	oEnlace.href="#";
	oEnlace.textContent=sTexto;
    oLista.appendChild(oEnlace);
    oMenuUsuario.appendChild(oLista);
}

function crearEnlaceMenuNavegacion(sTexto){
	var oLista = document.createElement("li");
	oLista.classList.add("nav-item");
	var oEnlace = document.createElement("a");
	oEnlace.classList.add("nav-link");
	oEnlace.href="#";
	oEnlace.textContent=sTexto;
    oLista.appendChild(oEnlace);
    oMenuNavegacion.appendChild(oLista);
}

function cargarContenidoBienvenida(){
	$(".row").hide();
	$("#contenido").empty();
	$("#contenido").show();
	oCapaContenido=document.querySelector("#contenido");
	var oColumna=document.createElement("div");
	oColumna.classList.add("col-4");
	var oImg=document.createElement("img");
	oImg.src="images/mando.jpg";
	oImg.classList.add("img-thumbnail");
	oImg.classList.add("d-none");
	oImg.classList.add("d-sm-block");
	oColumna.appendChild(oImg);
	oCapaContenido.appendChild(oColumna);
	oColumna=document.createElement("div");
	oColumna.classList.add("col-12");
	oColumna.classList.add("col-sm-5");
	var oBienvenida = document.createElement("h3");
	oBienvenida.classList.add("text-warning");
	oBienvenida.textContent="Bienvenido a Upoflix";
	oColumna.appendChild(oBienvenida);
	oBienvenida = document.createElement("p");
	oBienvenida.textContent="En esta aplicación puedes acceder a todo un archivo documental de películas y series. Consulta información, añádelas a favoritos y puntúalas si estás registrado. ¡El sueño de todo cinéfilo!";
	oColumna.appendChild(oBienvenida);
    oCapaContenido.appendChild(oColumna);
}