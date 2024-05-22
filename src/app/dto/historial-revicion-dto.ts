export class HistorialRevicionDTO {
    constructor(
        public fecha: string = '',
        public descripcion: string = '',
        public estadoNegocio: string = '',//EstadoNegocio = new EstadoNegocio, //
        public imagenes: string = ''
        ) { }
}

