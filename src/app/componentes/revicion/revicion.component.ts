import { Component } from '@angular/core';
import { AlertaComponent } from '../alerta/alerta.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HistorialRevicionDTO } from '../../dto/historial-revicion-dto';
import { Alerta } from '../../dto/alerta';
import { ModeradorService } from '../../servicios/moderador.service';

@Component({
  selector: 'app-revicion',
  standalone: true,
  imports: [FormsModule, CommonModule,AlertaComponent ],
  templateUrl: './revicion.component.html',
  styleUrl: './revicion.component.css'
})
export class RevicionComponent {


historialRevicionDTO: HistorialRevicionDTO;


alerta!: Alerta;

  constructor(private moderadorserver: ModeradorService) {

    this.historialRevicionDTO = new HistorialRevicionDTO();
   

}
public crearHistorial() {

  this.moderadorserver.hacerRevision(this.historialRevicionDTO).subscribe({
    next :data => {
      this.alerta = new Alerta(data.respuesta, "succes")
    },
    error:error => {
      this.alerta = new Alerta(error.respuesta, "danger")
    }
  });
  console.log(this.historialRevicionDTO);
}
}
