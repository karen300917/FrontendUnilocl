export class HistorialRevicionDTO {
    constructor(
        public fecha: string = '',
        public descripcion: string = '',
        public estadoNegocio: string = '' , 
        public imagenes: string = ''
        ) { }
}

