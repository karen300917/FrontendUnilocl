export class ActualizarClienteDTO {

    constructor(
        public nombre: string = '',
        public fotoPerfil: string = '',
        public email: string = '',
        public ciudadResidencia: string = ''
        ) { }
}

