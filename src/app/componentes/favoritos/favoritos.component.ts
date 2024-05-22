import { Component } from '@angular/core';
import { TokenService } from '../../servicios/token.service';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { NegocioGetDTO } from '../../dto/NegocioGetDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  negocios: NegocioGetDTO[];

  constructor(private clienteService: ClienteService, private router: Router, private tokenService: TokenService) {
    this.negocios=[];
    this.listarNegocios();
  }

   public listarNegocios() {
    const codigoCliente = this.tokenService.getCodigo();
    this.clienteService.listarfavoritos(codigoCliente).subscribe({
        next: (data) => {
            console.log(data.respuesta)
            this.clienteService= data.respuesta;
        },
        error: (error) => {
            console.error(error);
        }
    });
}


}
