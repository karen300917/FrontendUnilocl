import { Component } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dto/horario';

@Component({
selector: 'app-crear-negocio',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './crear-negocio.component.html',
styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent {

  

  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  telefonos: string[];

  constructor(private negociosService: NegociosService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.negocios = [];
    this.cargarNegocios(); 

  this.registroNegocioDTO = new RegistroNegocioDTO();
  this.horarios = [ new Horario() ];
  this.telefonos = [];
  }
  public crearNegocio() {
  this.registroNegocioDTO.horarios = this.horarios;
  this.negociosService.crear(this.registroNegocioDTO);
  console.log(this.registroNegocioDTO);
  }
  public agregarHorario() {
  this.horarios.push(new Horario());
  }

  public agregarTelefono() {
    this.horarios.push();
    }

  negocios : string[];

  private cargarNegocios() {
     this.negocios = ["Hotel", "Cageteria", "Restaurante ", "Museo", "Cartagena"];
     console.log(this.negocios)
    }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
  
    }
    
    }
    archivos!:FileList;

  }