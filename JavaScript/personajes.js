async function todosLosPersonajes(){
    let tablaPantalla= document.getElementById("tabla");
    tablaPantalla.innerHTML = ""
    var fin = false;
    var urlLugar = 1;
    while(!fin){
        try{
            await fetch('https://swapi.dev/api/people/?page='+urlLugar)
            .then(res => res.json())
            .then(data=> {
                data.results.forEach(persona=>{
                    agregar(persona.name, "")
                })
                urlLugar++;
            })
        } catch (e) {
            fin = true;
        }
    }
}

async function revisarPersonas (urlLugar, nombre){
    var respuesta = null;
    var encontro = false;
    var carga = "Cargando"
    for (var i = 0; i<urlLugar;i++){
        carga = carga + "."
    }
    borrarYAgregar(carga,"", "tabla")
    var preDatos = await fetch('https://swapi.dev/api/people/?page='+urlLugar)
    var data = await preDatos.json();
        data.results.forEach(persona => {
            if (nombre.toUpperCase() == persona.name.toUpperCase() && !encontro){
                respuesta = persona;
                encontro = true;
            }
        })
        if (data.next!=null && !encontro){
            respuesta = revisarPersonas(urlLugar+1, nombre)
        }
    return respuesta;
}

async function mostrarPersona(persona){
    borrarYAgregar("", "", "tabla")
    if (persona.name!="n/a"){
        agregar("Nombre:", JSON.stringify(persona.name))
    }
    if (persona.height!="n/a"){
        agregar("Altura:", JSON.stringify(persona.height))
    }
    if (persona.mass!="n/a"){
        agregar("Peso: " , JSON.stringify(persona.mass))
    }
    if (persona.eye_color!="n/a"){
        agregar("Color de ojos:", JSON.stringify(persona.eye_color))
    }
    if (persona.skin_color!="n/a"){
        agregar("Color de piel:", JSON.stringify(persona.skin_color))
    }
    if (persona.hair_color!="n/a"){
        agregar("Color de pelo:", JSON.stringify(persona.hair_color))
    }
    if (persona.birth_year!="n/a"){
        agregar("Año de nacimiento:", JSON.stringify(persona.birth_year))
    }
    if (persona.homeworld!="n/a"){
        var planeta = await mostrarPlanetaDeNacimiento(persona.homeworld)
        agregar("Planeta de nacimiento: ", planeta, "tabla")
    }
    if (persona.species.length!=0){   
        var especie = await mostrarEspecie(persona.species[0]);
        agregar("Especie: ", especie)
    }
    if (persona.vehicles.length!=0){
        var vehiculos = await mostrarVehiculos(persona.vehicles);
        agregar("Vehiculos: ", toString(vehiculos), "tabla");
    }
    if (persona.starships.length!=0){
        var naves = await mostrarNavesEspaciales(persona.starships);
        agregar("Naves espaciales: ", toString(naves), "tabla");
    }
    if (persona.films.length!=0){
        var peliculas = await mostrarPeliculas(persona.films);
        agregar("Peliculas: ", toString(peliculas), "tabla");
    }
}

async function mostrarPersonajeCorrecto(){
    let tabla= document.getElementById("tabla"); 
    let textoTabla = tabla.textContent
    let frase = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir:"), textoTabla.indexOf("Quizas quisite decir:")+21)
    let nombre = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir: ")+22, textoTabla.length)
    if (frase == "Quizas quisite decir:"){
        var persona = await revisarPersonas(1, nombre)
        mostrarPersona(persona); 
    }  
}