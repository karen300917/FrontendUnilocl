import { Horario } from "./horario"
import { Ubicacion } from "./ubicacion"

export class NegocioGetDTO{
    constructor(
        public codigoNegocio:string = "",
        public nombre:string = "",
        public ubicacion: Ubicacion = new Ubicacion(),
        public horario:Horario[] = [],
        public imagen: string[] = [],
        public descripcion:string = "",
        public tipoNegocio:string = "",
        public telefono:string[] = [],
        public estadoRegistro:string = "",
        public estaAbierto: boolean = false){

        }
}