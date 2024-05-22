import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../servicios/imagen.service';
import { ActualizarClienteDTO } from '../../dto/actualizar-cliente-dto';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ActualizarModeradorDTO } from '../../dto/actualizar-moderador-dto';
import { ModeradorService } from '../../servicios/moderador.service';

@Component({
  selector: 'app-actualizar-moderaador',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaComponent],
  templateUrl: './actualizar-moderaador.component.html',
  styleUrl: './actualizar-moderaador.component.css'
})
export class ActualizarModeraadorComponent {
  codigoModerador: string = "";
  alerta!: Alerta;


  actualizarModeradorDTO: ActualizarModeradorDTO;
  constructor(private tokenService: TokenService, private moderadorService: ModeradorService, private imagenService: ImagenService, private authService: AuthService, private route: ActivatedRoute) {
    this.actualizarModeradorDTO = new ActualizarModeradorDTO();

    this.route.params.subscribe(params => {
      this.codigoModerador = params["codigo"];
      this.obtenerModerador();

    })

  }

  public actualizar() {
    
      this.moderadorService.actualizarModerador(this.actualizarModeradorDTO).subscribe({
        next: (data) => {
          this.alerta = new Alerta(data.respuesta, "success");
        },
        error: (error) => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
  
  }
  public obtenerModerador() {
    const codigoModerador = this.tokenService.getCodigo();
   

    this.moderadorService.obtener(codigoModerador).subscribe({
      next: data => {
        this.actualizarModeradorDTO = data.respuesta;

        // this.actualizarModeradorDTO.id  = codigoCliente;
         console.log(this.actualizarModeradorDTO);


      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

}
