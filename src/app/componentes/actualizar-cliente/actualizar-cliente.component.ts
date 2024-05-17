import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../servicios/imagen.service';
import { ActualizarClienteDTO } from '../../dto/actualizar-cliente-dto';
import { ClienteService } from '../../servicios/cliente.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaComponent],
  templateUrl: './actualizar-cliente.component.html',
  styleUrl: './actualizar-cliente.component.css'
})
export class ActualizarClienteComponent {

  alerta!:Alerta;
  
  actualizarClienteDTO: ActualizarClienteDTO;
  constructor( private clienteService: ClienteService, private imagenService: ImagenService, private authService: AuthService) {
    this.actualizarClienteDTO = new ActualizarClienteDTO();
    this.ciudades = [];
    this.cargarCiudades();

  }

  public actualizar() {
    if (this.actualizarClienteDTO.fotoPerfil != "") {
    this.clienteService.actualizarCliente(this.actualizarClienteDTO).subscribe({
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

  

  ciudades: string[];

  private cargarCiudades() {
    this.authService.listarCiudades().subscribe({
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
      this.actualizarClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }

  archivos!: FileList;


  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
    const formData = new FormData();
    formData.append('file', this.archivos[0]);
    this.imagenService.subir(formData).subscribe({
    next: data => {
    this.actualizarClienteDTO.fotoPerfil = data.respuesta.url;
    this.alerta = new Alerta("Se ha subido la foto", "success");
    },
    error: error => {
    this.alerta = new Alerta(error.error, "danger");
    }
    });
    } else {
    this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
    }

}

