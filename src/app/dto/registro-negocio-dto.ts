import { Horario } from "./horario";
import { Ubicacion } from "./ubicacion";
export class RegistroNegocioDTO {
constructor(
public nombre: string = '',
public descripcion: string = '',
public codigoPropietario: string = '',
public ubicacion: Ubicacion = new Ubicacion(),
public imagen: string[] = [],
public tipoNegocios: string = '',
public horario: Horario[] = [],
public telefono: string[] = []
) { }
}