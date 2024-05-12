import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { CommonModule } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';
import { AuthService } from '../../servicios/auth.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  alerta!:Alerta;

  registroClienteDTO: RegistroClienteDTO;
  constructor(private publicoService: PublicoService, private authService: AuthService) {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.ciudades = [];
    this.cargarCiudades();

  }

  public registrar() {
    if (this.registroClienteDTO.fotoPerfil != "") {
    this.authService.registrarCliente(this.registroClienteDTO).subscribe({
    next: (data) => {
    this.alerta = new Alerta(data.respuesta, "success");
    },
    error: (error) => {
    this.alerta = new Alerta(error.error.respuesta, "danger");
    }
    });
    } else {
    this.alerta = new Alerta("Debe subir una imagen", "danger");
    }
    }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }

  ciudades: string[];

  private cargarCiudades() {
    this.publicoService.listarCiudades().subscribe({
    next: (data) => {
    this.ciudades = data.respuesta;
    },
    error: (error) => {
    console.log("Error al cargar las ciudades");
    }
    });
    }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }

  archivos!: FileList;

}


