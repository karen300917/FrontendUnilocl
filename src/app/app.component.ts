import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TokenService } from './servicios/token.service';
import { ClienteService } from './servicios/cliente.service';
import { ModeradorService } from './servicios/moderador.service';
import { Alerta } from './dto/alerta';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    alerta!: Alerta;
eliminarCuentaCliente() {
    
    const codigoCliente = this.tokenService.getCodigo();
   

    this.clienteService.eliminarCuentaCliente(codigoCliente)
    

}
eliminarCuentaModerador() {
    const codigoModerador = this.tokenService.getCodigo();
   

    this.moderadorService.eliminarCuentaModerador(codigoModerador).subscribe({
        next: (data) => {
          this.alerta = new Alerta(data.respuesta, "success");
        },
        error: (error) => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });

}

    title = 'Unilocal';
    isLogged = false;
    email: string = "";
    rol: string = "";
    constructor(private tokenService: TokenService,private clienteService: ClienteService,private moderadorService: ModeradorService) { }
    ngOnInit(): void {
        this.isLogged = this.tokenService.isLogged();
        if (this.isLogged) {
            this.email = this.tokenService.getEmail();
            this.rol = this.tokenService.getRole();
            console.log(this.rol);
        }
    }
    public logout() {
        
        this.tokenService.logout();
    }
}
