import { Horario } from "./horario";
import { Ubicacion } from "./ubicacion";

export class ActualizarNegocioDTO {
    

    constructor(
        public id: string = '',
        public nombre: string = '',
        public descripcion: string = '',
        public ubicacion: Ubicacion = new Ubicacion(),
        public imagen: string[] = [],
        public horario: Horario[] = [],
        public telefono: string[] = []
        ) { }
}
