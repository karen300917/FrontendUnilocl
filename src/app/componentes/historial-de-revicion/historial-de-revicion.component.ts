import { Component } from '@angular/core';
import { NegocioGetDTO } from '../../dto/NegocioGetDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-historial-de-revicion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historial-de-revicion.component.html',
  styleUrl: './historial-de-revicion.component.css'
})
export class HistorialDeRevicionComponent {
  negocios: NegocioGetDTO[];
  seleccionados: NegocioGetDTO[];
  textoBtnSolicitud: string | undefined;

  constructor(private negocioService: NegociosService,private tokenService: TokenService) {
    this.negocios = [];
    this.seleccionados = [];
    this.listarNegocios();


}

  public seleccionar(producto: NegocioGetDTO, estado: boolean) {
    if (estado) {
        this.seleccionados.push(producto);
    } else {
        this.seleccionados.splice(this.seleccionados.indexOf(producto), 1);
    }
    this.solicitud();
    

}
public listarNegocios() {
  const codigoModerador = this.tokenService.getCodigo();
  this.negocioService.listarNegociosPropietario(codigoModerador).subscribe({
      next: (data) => {
          console.log(data.respuesta)
          this.negocios = data.respuesta;
      },
      error: (error) => {
          console.error(error);
      }
  });
}

private solicitud() {
  const tam = this.seleccionados.length;
  if (tam != 0) {
      if (tam == 1) {
          this.textoBtnSolicitud = "1 elemento";
      } else {
          this.textoBtnSolicitud = "";
      }
  }

}
}
