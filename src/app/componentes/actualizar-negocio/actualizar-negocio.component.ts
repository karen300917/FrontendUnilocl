import { Component, OnInit } from '@angular/core';
import { ActualizarNegocioDTO } from '../../dto/actualizar-negocio-dto';
import { Horario } from '../../dto/horario';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-negocio.component.html',
  styleUrl: './actualizar-negocio.component.css'
})
export class ActualizarNegocioComponent implements OnInit {


  actualizarNegocioDTO : ActualizarNegocioDTO ;
  horarios: Horario[];
  telefonos: string[];

  constructor(private negociosService: NegociosService, private mapaService: MapaService) {
    
    this.actualizarNegocioDTO = new  ActualizarNegocioDTO();
    this.negocios = [];
    this.horarios = [ new Horario() ];
    this.telefonos = [];
  
  
  }
  public actualizarNegocio() {
  this.actualizarNegocioDTO.horarios = this.horarios;
  this.negociosService.actualizar(this.actualizarNegocioDTO);
  console.log(this.actualizarNegocioDTO);
  }
  public agregarHorario() {
  this.horarios.push(new Horario());
  }

  public agregarTelefono() {
    this.horarios.push();
    }

  negocios : string[];

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
  
    }
    
    }
    ngOnInit(): void {
      this.mapaService.crearMapa();
      this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.actualizarNegocioDTO.ubicacion.latitud = marcador.lat;
      this.actualizarNegocioDTO.ubicacion.longitud = marcador.lng;
      });
      }
    archivos!:FileList;

  }

