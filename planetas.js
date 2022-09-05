async function revisarPlaneta(urlLugar, nombre){
    var carga = "Cargando"
    for (var i = 0; i<urlLugar;i++){
        carga = carga + "."
    }
    borrarYAgregar(carga,"", "tabla")
    await fetch('https://swapi.dev/api/planets/?page='+urlLugar)
    .then(res => res.json())
    .then(data=> {
        var encontro = false;
        data.results.forEach(planeta => {
            if (nombre.toUpperCase() == planeta.name.toUpperCase() && !encontro){
                mostrarPlaneta(planeta);
                encontro = true;
            }
        })
        if (!encontro && data.next!=null){
            revisarPlaneta(urlLugar+1, nombre)
        } else if (data.next==null && !encontro){
            masParecido(nombre, "planets")
        }
    })
}


function mostrarPlaneta(planeta){
    borrarYAgregar("", "", "tabla")
    if (planeta.name!="N/A"){
        agregar("Nombre:", JSON.stringify(planeta.name))
    }
    if (planeta.rotation_period!="N/A"){
        agregar("Periodo de rotación:", JSON.stringify(planeta.rotation_period))
    }
    if (planeta.orbital_period!="N/A"){
        agregar("Periodo de orbitación:", JSON.stringify(planeta.orbital_period))
    }
    if (planeta.diameter!="N/A"){
        agregar("Diametro:", JSON.stringify(planeta.diameter))
    }
    if (planeta.climate!="N/A"){
        agregar("Clima:", JSON.stringify(planeta.climate))
    }
    if (planeta.gravity!="N/A"){
        agregar("Gravedad:", JSON.stringify(planeta.gravity))
    }
    if (planeta.terrain!="N/A"){
        agregar("Bioma:", JSON.stringify(planeta.terrain))
    }
    if (planeta.population!="N/A"){
        agregar("Población:", JSON.stringify(planeta.population))
    }
    if (planeta.residents.length!=0){
        mostrarResidentes(planeta.residents);
    }
    if (planeta.films.length!=0){
        mostrarPeliculas(planeta.films);
    }

}


function mostrarPlanetaCorrecto(){
    let tabla= document.getElementById("tabla"); 
    let textoTabla = tabla.textContent
    let frase = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir:"), textoTabla.indexOf("Quizas quisite decir:")+21)
    let nombre = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir: ")+22, textoTabla.length)
    if (frase == "Quizas quisite decir:"){
        revisarPlaneta(1, nombre) 
    }
}