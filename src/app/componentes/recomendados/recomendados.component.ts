import { Component } from '@angular/core';
import { NegocioGetDTO } from '../../dto/NegocioGetDTO';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recomendados.component.html',
  styleUrl: './recomendados.component.css'
})
export class RecomendadosComponent {

  negocios: NegocioGetDTO[];

  constructor(private clienteService: ClienteService, private router: Router, private tokenService: TokenService) {
    this.negocios=[];
    this.listarNegocios();
  }

   public listarNegocios() {
    const codigoCliente = this.tokenService.getCodigo();
    this.clienteService.listarRecomendaciones(codigoCliente).subscribe({
        next: (data) => {
            console.log(data.respuesta)
            this.negocios= data.respuesta;
        },
        error: (error) => {
            console.error(error);
        }
    });
}


}
