import { Component, OnInit } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dto/horario';
import { MapaService } from '../../servicios/mapa.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { ImagenService } from '../../servicios/imagen.service';
import { TokenService } from '../../servicios/token.service';

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
  telefono: string[];

  alerta!: Alerta;

  constructor(private negociosService: NegociosService, private imagenService: ImagenService,private tokenService: TokenService, private mapaService: MapaService) {

    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.negocios = [];
    this.cargarTiposNegocios();


    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    this.telefono = [];


  }
  public crearNegocio() {
    const codigoCliente = this.tokenService.getCodigo();
    this.registroNegocioDTO.horario = this.horarios;
    this.registroNegocioDTO.codigoPropietario = codigoCliente;

    console.log("Esto es codigo cliente: " + codigoCliente);
    this.negociosService.crear(this.registroNegocioDTO).subscribe({
      next :data => {
        this.alerta = new Alerta("Negocio creado con exito", "succes");
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
    console.log(this.registroNegocioDTO);
  }
  public agregarHorario() {
    this.horarios.push(new Horario());
  }
 
  eliminarTelefono(index: number) {
    this.registroNegocioDTO.telefono.splice(index, 1);
}
  public agregarTelefono() {
    
    this.registroNegocioDTO.telefono.push('');
  }

  negocios: string[];

  private cargarTiposNegocios() {
    
    this.negociosService.listarCategorias().subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar las categorias");
      }
    });

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


  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.registroNegocioDTO.imagen.push(data.respuesta.url);
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


  archivos!: FileList;

}