export class BusquedaDTO{
    public tipoNegocio: string | null;
    public nombre: string | null;

    constructor(tipoNegocio:string | null, nombre:string | null){
        this.tipoNegocio = tipoNegocio;
        this.nombre = nombre;
    }

}