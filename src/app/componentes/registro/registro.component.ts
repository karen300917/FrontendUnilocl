import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroClienteDTO: RegistroClienteDTO;
  constructor() {
  this.registroClienteDTO = new RegistroClienteDTO();
  this.ciudades = [];
  this.cargarCiudades(); 
  
  }

  public registrar() {
    if (this.registroClienteDTO.fotoPerfil != "") {
    console.log(this.registroClienteDTO);
    } else {
    console.log("Debe cargar una foto");
    }
    }

  public sonIguales(): boolean {
      return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
   }

   ciudades: string[];

   private cargarCiudades() {
    this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
    }

  public onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.archivos = event.target.files;
        this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
      }
      }

      archivos!:FileList;

}


