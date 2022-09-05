window.addEventListener("load", inicio);

function inicio(){
	document.getElementById("boton").addEventListener("click", click);
	document.getElementById("tabla").addEventListener("click", mostrarCorrecto);
    document.getElementById("frase").addEventListener("keypress", function(event){
        if (event.key=="Enter"){
            click()
        }
    })
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

async function masParecido(nombre, que){
    var respuesta = "";
    var cantidad = 0;
    var urlLugar = 1;
    var fin = false;
    while(!fin){
        try{
            var carga = "Cargando"
            for (var i = 0; i<urlLugar;i++){
                carga = carga + "."
            }
            borrarYAgregar(carga,"", "tabla")
            await fetch('https://swapi.dev/api/' + que + '/?page=' + urlLugar)
            .then(res => res.json())
            .then(data=> {
                data.results.forEach(persona=>{
                    var recorrido = 0;
                    var auxCant = 0;
                    while (nombre.length>recorrido && persona.name.length>recorrido){
                        if (nombre[recorrido].toUpperCase()==persona.name[recorrido].toUpperCase()){
                            auxCant++
                        }
                        recorrido++
                    }
                    if (auxCant>cantidad){
                        cantidad = auxCant
                        respuesta = persona.name
                    }
                })
                    urlLugar++;
            })
        } catch (e) {
            fin = true;
        }
    }
    borrarYAgregar("Quizas quisite decir: " + respuesta, "", "tabla")
    let tabla = document.getElementById("tabla");
    tabla.setAttribute("class", que);
}

async function listaFiltrada(comando){
    borrarYAgregar("", "", "tabla")
    var filtro = comando.split(":")
    var fin = false;
    var urlLugar = 1;
    if (filtro[0]=="especie"){
        while(!fin){
            try{
                await fetch('https://swapi.dev/api/people/?page='+urlLugar)
                .then(res => res.json())
                .then(data=> {
                    data.results.forEach(persona=>{
                        esEspecie(persona, filtro[1])
                    })
                    urlLugar++;
                })
            } catch (e) {
                fin = true;
            }
        }
    }
    if (tablaPantalla.innerHTML==""){
        agregar("No se encontro ningun personaje de esa especie.", "");
    }
}

async function esEspecie(persona, especie){
    if (persona.species.length!=0){
        await fetch(persona.species[0])
        .then(res => res.json())
        .then(data=> {
            if (data.name.toUpperCase()==especie.toUpperCase()){
                agregar(persona.name, "")
            }
        })
    }
}

async function mostrarEspecie(especie){
    await fetch(especie)
    .then(res => res.json())
    .then(data=> {
        agregar("Especie: ", JSON.stringify(data.name))
    })
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
    agregar("Peliculas: ", toString(peliculasAparece), "tabla");
}

async function mostrarPlanetaDeNacimiento(url){
    await fetch(url)
    .then(res => res.json())
    .then(data =>{
        agregar("Planeta de nacimiento: ", JSON.stringify(data.name), "tabla")
    })
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
    agregar("Vehiculos: ", toString(vehiculosAparece), "tabla");
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
    agregar("Naves espaciales: ", toString(navesEspaciales), "tabla");
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

function click(){
    var comando = document.getElementById("frase").value.split("/")
    var textoAyuda = document.getElementsByClassName("ayuda")
    if (textoAyuda.length!=0){
        for (let i = 0; i<textoAyuda.length; i++){
            textoAyuda[i].innerHTML = ""
        }
    }
    if (comando[0].toLowerCase()=="lista"){
        if (comando[1].toLowerCase()=="personajes"){
            if (comando[2]!=null && comando[2].toLowerCase()=="filtrar"){    
                listaFiltrada(comando[3])
            } else { 
                todosLosPersonajes();
            }
        }
    } else if (comando[0].toLowerCase()=="personaje"){ 
        revisarPersonas(1, comando[1]);
    } else if (comando[0].toLowerCase()=="planeta"){
        revisarPlaneta(1, comando[1]);
    } else if (comando[0].toLowerCase()=="ayuda"){
        explicacion();
    } else {
        borrarYAgregar("Error al escribir comando, escriba ayuda para ver una guía de cómo hacerlo.", "", "tabla")
    }
    
}