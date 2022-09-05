
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
    var carga = "Cargando"
    for (var i = 0; i<urlLugar;i++){
        carga = carga + "."
    }
    borrarYAgregar(carga,"", "tabla")
    await fetch('https://swapi.dev/api/people/?page='+urlLugar)
    .then(res => res.json())
    .then(data=> {
        var encontro = false;
        data.results.forEach(persona => {
            if (nombre.toUpperCase() == persona.name.toUpperCase() && !encontro){
                mostrarPersona(persona);
                encontro = true;
            }
        })
        if (!encontro && data.next!=null){
            revisarPersonas(urlLugar+1, nombre)
        } else if (data.next==null && !encontro){
            masParecido(nombre, "people")
        }
    })
}

function mostrarPersona(persona){
    borrarYAgregar("", "", "tabla")
    if (persona.name!="n/a"){
        agregar("Nombre:", JSON.stringify(persona.name))
    }
    if (persona.height!="n/a"){
        agregar("Altura:", JSON.stringify(persona.height))
    }
    if (persona.mass!="n/a"){
        agregar("Peso: " + JSON.stringify(persona.mass))
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
        mostrarPlanetaDeNacimiento(persona.homeworld)
    }
    if (persona.species.length!=0){   
        mostrarEspecie(persona.species[0]);
    }
    if (persona.vehicles.length!=0){
        mostrarVehiculos(persona.vehicles);
    }
    if (persona.starships.length!=0){
        mostrarNavesEspaciales(persona.starships);
    }
    if (persona.films.length!=0){
        mostrarPeliculas(persona.films);
    }
}

function mostrarPersonajeCorrecto(){
    let tabla= document.getElementById("tabla"); 
    let textoTabla = tabla.textContent
    let frase = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir:"), textoTabla.indexOf("Quizas quisite decir:")+21)
    let nombre = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir: ")+22, textoTabla.length)
    if (frase == "Quizas quisite decir:"){
        revisarPersonas(1, nombre) 
    }  
}