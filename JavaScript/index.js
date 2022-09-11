window.addEventListener("load", inicio);

let datosPersonajesYaCargados = false;
let ListaPersonajes = new listaPersonajes();
let datosPlanetasYaCargados = false;
let ListaPlanetas = new listaPlanetas();


function inicio(){
	document.getElementById("boton").addEventListener("click", click);
	document.getElementById("tabla").addEventListener("click", mostrarCorrecto);
    document.getElementById("frase").addEventListener("keypress", function(event){
        if (event.key=="Enter"){
            click()
        }
    })
}

async function guardarDatos(que){
    var queLista;
    switch (que) {
        case "people":
          queLista = ListaPersonajes;
          break;
        case "planets":
          queLista = ListaPlanetas;
          break;
      }
    var fin = false;
    var urlLugar = 1;
    while(!fin){
        var carga = "Cargando"
        for (var i = 0; i<urlLugar;i++){
            carga = carga + "."
        }
        borrarYAgregar(carga,"", "tabla")
        await fetch('https://swapi.dev/api/' + que + '/?page='+urlLugar)
        .then(res => res.json())
        .then(data=> {
            data.results.forEach(personaje=>{
                queLista.agregar(personaje);
            })
            urlLugar++;
            if (data.next==null){
                fin = true;
            }
        })
        .catch((Error)=>{
            guardarDatos(que);
            queLista.borrarDatos();
        })
    }
    borrarYAgregar("Fin guardar datos", "", "tabla")
    console.log(ListaPersonajes.getListaPersonajes())
    console.log(ListaPlanetas.getListaPlanetas())
}

function mostrarCorrecto(){
    let tabla = document.getElementById("tabla");
    let nombreClaseTabla = tabla.className
    switch (nombreClaseTabla){
        case "people": 
            mostrarPersonajeCorrecto();
        break;
        case "planets": 
            mostrarPlanetaCorrecto()
        break;
    }
}

function agregar(que, info){
    let tablaPantalla= document.getElementById("tabla");
	let fila=tablaPantalla.insertRow();
	let palabra=fila.insertCell(0);
	let resp=fila.insertCell(1);
	palabra.innerHTML=que;
	resp.innerHTML=info;
}

function borrarYAgregar(que, info, donde){
    let tablaPantalla= document.getElementById(donde);
    tablaPantalla.innerHTML = ""
    agregar(que, info)
    if (donde == "tabla"){
        tablaPantalla.setAttribute("class", "");
    }
}

function masParecido(lista, nombre, que){
    var respuesta = "";
    var cantidad = 0;
    for (let i = 0; i<lista.length; i++){
        var recorrido = 0;
        var auxCant = 0;
        while (nombre.length>recorrido && lista[i].name.length>recorrido){
            if (nombre[recorrido].toUpperCase()==lista[i].name[recorrido].toUpperCase()){
                auxCant++
            }
            recorrido++
        }
        if (auxCant>cantidad){
            cantidad = auxCant
            respuesta = lista[i].name
        }
    }
    return respuesta;
}

async function listaFiltrada(lista, comando){
    let tablaPantalla = document.getElementById("tabla");
    borrarYAgregar("", "", "tabla")
    var filtro = comando.split(":")
    if (filtro[0]=="especie"){
        for (let i = 0; i<lista.length; i++){
            if (lista[i].species.length>0){
                var especie = await mostrarEspecie(lista[i].species);
                if (filtro[1].toUpperCase()== especie.slice(1, -1).toUpperCase()){
                    agregar(lista[i].name, "");
                }
            }
        }
        agregar("Fin", "");
    }
    if (tablaPantalla.innerHTML==""){
        agregar("No se encontro ningun personaje de esa especie.", "");
    }
}

async function mostrarEspecie(url){
    var especie = null;
    await fetch(url)
    .then(res => res.json())
    .then(data=> {
        especie = JSON.stringify(data.name)
    })
    return especie;
}

async function mostrarPeliculas(urls){
    var peliculasAparece = [];
    for (let i = 0; i<urls.length;i++){
        await fetch(urls[i])
        .then(res => res.json())
        .then(data=> {
            peliculasAparece.push(data.title)
        })
    }
    return peliculasAparece;
}

async function mostrarPlanetaDeNacimiento(url){
    var planeta = null;
    await fetch(url)
    .then(res => res.json())
    .then(data =>{
        planeta = JSON.stringify(data.name);
    })
    return planeta;
}

async function mostrarVehiculos(urls){
    var vehiculosAparece = [];
    for (let i = 0; i<urls.length;i++){
        await fetch(urls[i])
        .then(res => res.json())
        .then(data=> {
            vehiculosAparece.push(data.name)
        })
    }
    return vehiculosAparece;
}

async function mostrarNavesEspaciales(urls){
    var navesEspaciales = [];
    for (let i = 0; i<urls.length;i++){
        await fetch(urls[i])
        .then(res => res.json())
        .then(data=> {
            navesEspaciales.push(data.name)
        })
    }
    return navesEspaciales;
}

async function mostrarResidentes(urls){
    var residentes = [];
    for (let i = 0; i<urls.length;i++){
        await fetch(urls[i])
        .then(res => res.json())
        .then(data=> {
            residentes.push(data.name)
        })
    }
    return residentes;
}

function explicacion(){
    borrarYAgregar("", "", "tabla")
    let intro = document.createElement("p");
    let introTexto = document.createTextNode("Esto es una base de datos de información sobre star wars. Todos los comandos van seguidos de /.");
    intro.appendChild(introTexto);
    intro.setAttribute("class", "ayuda");
    document.body.appendChild(intro);

    let comandoLista = document.createElement("p");
    let comandoListaTexto = document.createTextNode("Poniendo lista / (lo que que quieras mostrar) te despliega una lista de todos.");
    comandoLista.appendChild(comandoListaTexto);
    comandoLista.setAttribute("class", "ayuda");
    document.body.appendChild(comandoLista);

    let comandoBuscador = document.createElement("p");
    let comandoBuscadorTexto = document.createTextNode("Poniendo personaje o nave espacial u otro / seguido del nombre de ese personaje o nave espacial u otro te muestra sus características.");
    comandoBuscador.appendChild(comandoBuscadorTexto);
    comandoBuscador.setAttribute("class", "ayuda");
    document.body.appendChild(comandoBuscador);

    let comandoFiltro = document.createElement("p");
    let comandoFiltroTexto = document.createTextNode("Por ejemplo si se desea buscar todos los personajes de la especie doride se debe poner: lista/personajes/filtrar/especie:droide.");
    comandoFiltro.appendChild(comandoFiltroTexto);
    comandoFiltro.setAttribute("class", "ayuda");
    document.body.appendChild(comandoFiltro);
}

function toString(array){
    let respuesta = ""
    for (let i = 0; i<array.length; i++){
        if (i+1==array.length){
            respuesta = respuesta + array[i]
        } else {
            respuesta = respuesta + array[i] + ", "
        }
    }
    return respuesta;
}

function mostrarParecido(nombre, que){
    borrarYAgregar("Quizas quisite decir: " + nombre, "", "tabla")
    let tabla = document.getElementById("tabla");
    tabla.setAttribute("class", que);
}

async function click(){
    var comando = document.getElementById("frase").value.split("/")
    var textoAyuda = document.getElementsByClassName("ayuda")
    if (textoAyuda.length!=0){
        for (let i = 0; i<textoAyuda.length; i++){
            textoAyuda[i].innerHTML = ""
        }
    }
    if (comando[0].toLowerCase()=="lista"){
        if (comando[1].toLowerCase() == "personajes"){
            if (!datosPersonajesYaCargados){
                await guardarDatos("people");
                datosPersonajesYaCargados = true;
            }
            if (comando[2]!=null && comando[2].toLowerCase()=="filtrar"){    
                listaFiltrada(ListaPersonajes.getListaPersonajes(), comando[3])
            } else {
                borrarYAgregar("", "", "tabla");
                ListaPersonajes.todosLosPersonajes();
            }
        } else if (comando[1].toLowerCase() == "planetas"){
            if (!datosPlanetasYaCargados){
                await guardarDatos("planets");
                datosPlanetasYaCargados = true;
            }
            borrarYAgregar("", "", "tabla");
            ListaPlanetas.todosLosPlanetas();
        }
    } else if (comando[0].toLowerCase()=="personaje"){
        if (!datosPersonajesYaCargados){
            await guardarDatos("people");
            datosPersonajesYaCargados = true;
        }
        var persona = buscarObjeto(ListaPersonajes.getListaPersonajes(), comando[1]);
        if (persona != null){
            mostrarPersona(persona);
        } else {
            persona = masParecido(ListaPersonajes.getListaPersonajes(), comando[1], "people")
            mostrarParecido(persona, "people");
        }
    } else if (comando[0].toLowerCase()=="planeta"){
        if (!datosPlanetasYaCargados){
            await guardarDatos("planets");
            datosPlanetasYaCargados = true;
        }
        var planeta = buscarObjeto(ListaPlanetas.getListaPlanetas(), comando[1]);
        if (planeta != null){
            mostrarPlaneta(planeta);
        } else {
            var planeta = masParecido(ListaPlanetas.getListaPlanetas(), comando[1], "planets")
            mostrarParecido(planeta, "planets");
        }
    } else if (comando[0].toLowerCase()=="ayuda"){
        explicacion();
    } else {
        borrarYAgregar("Error al escribir comando, escriba ayuda para ver una guía de cómo hacerlo.", "", "tabla")
    }
    
}