async function mostrarPlaneta(planeta){
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
        var residentes = await mostrarResidentes(planeta.residents);
        agregar("Residentes: ", toString(residentes), "tabla");
    }
    if (planeta.films.length!=0){
        var peliculas = await mostrarPeliculas(planeta.films);
        agregar("Peliculas: ", toString(peliculas), "tabla");
    }

}

function mostrarPlanetaCorrecto(){
    let tabla= document.getElementById("tabla"); 
    let textoTabla = tabla.textContent
    let frase = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir:"), textoTabla.indexOf("Quizas quisite decir:")+21)
    let nombre = textoTabla.substring(textoTabla.indexOf("Quizas quisite decir: ")+22, textoTabla.length)
    if (frase == "Quizas quisite decir:"){
        var planeta = buscarObjeto(ListaPlanetas.getListaPlanetas(), nombre);
        mostrarPlaneta(planeta);
    }
}