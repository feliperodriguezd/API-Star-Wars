class listaPersonajes{
    constructor(){
        this.listaPersonajes = [];
    }

    agregar (personaje){
        this.listaPersonajes.push(personaje);
    }

    getListaPersonajes(){
        return this.listaPersonajes;
    }
    todosLosPersonajes(){
        for (let i = 0; i<this.listaPersonajes.length; i++){
            agregar(this.listaPersonajes[i].name, "");
        }
    }
    borrarDatos(){
        this.listaPersonajes = [];
    }
}