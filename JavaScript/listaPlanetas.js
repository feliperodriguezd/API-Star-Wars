class listaPlanetas{
    constructor(){
        this.listaPlaneta = [];
    }

    agregar (planeta){
        this.listaPlaneta.push(planeta);
    }

    getListaPlanetas(){
        return this.listaPlaneta;
    }
    todosLosPlanetas(){
        for (let i = 0; i<this.listaPlaneta.length; i++){
            agregar(this.listaPlaneta[i].name, "");
        }
    }
    borrarDatos(){
        this.listaPlaneta = [];
    }
}