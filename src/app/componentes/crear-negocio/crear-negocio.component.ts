import { Component, OnInit } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dto/horario';
import { MapaService } from '../../servicios/mapa.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule,AlertaComponent],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit {



  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  telefonos: string[];

  alerta!: Alerta;

  constructor(private negociosService: NegociosService, private mapaService: MapaService) {

    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.negocios = [];
    this.cargarNegocios();


    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    this.telefonos = [];


  }
  public crearNegocio() {
    this.registroNegocioDTO.horarios = this.horarios;
    this.negociosService.crear(this.registroNegocioDTO).subscribe({
      next :data => {
        this.alerta = new Alerta(data.respuesta, "succes")
      },
      error: error => {
        this.alerta = new Alerta(error.respuesta, "danger")
      }
    });
    console.log(this.registroNegocioDTO);
  }
  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public agregarTelefono() {
    this.horarios.push();
  }

  negocios: string[];

  private cargarNegocios() {
    this.negocios = ["Hotel", "Cageteria", "Restaurante ", "Museo", "Cartagena"];
    console.log(this.negocios)
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;

    }

  }
  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }
  archivos!: FileList;

}