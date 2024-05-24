import { Component, OnInit } from '@angular/core';
import { ActualizarNegocioDTO } from '../../dto/actualizar-negocio-dto';
import { Horario } from '../../dto/horario';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../servicios/imagen.service';

@Component({
  selector: 'app-actualizar-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-negocio.component.html',
  styleUrl: './actualizar-negocio.component.css'
})
export class ActualizarNegocioComponent implements OnInit {


  actualizarNegocioDTO: ActualizarNegocioDTO;
  codigoNegocio: string = "";
  categorias : string[];
  horarios: Horario[];
  telefonos: string[];

  alerta!: Alerta;

  constructor(private negociosService: NegociosService, private mapaService: MapaService,private imagenService: ImagenService, private route: ActivatedRoute) {

    this.actualizarNegocioDTO = new ActualizarNegocioDTO();
    this.categorias = [];
    this.cargarTiposNegocios();

    this.route.params.subscribe(params => {
      this.codigoNegocio = params["codigo"];
      this.obtenerNegocio(this.codigoNegocio);
  
    })

    

    
    this.negocios = [];
    this.horarios = [new Horario()];
    this.telefonos = [];


  }
  public actualizarNegocio() {

    if (this.actualizarNegocioDTO.imagen.length > 0) {
      this.negociosService.actualizar(this.actualizarNegocioDTO).subscribe({
        next: data => {
          this.alerta = new Alerta("Se actualizó correctamente","succes");
        },
        error: error => {
          this.alerta = new Alerta(error.error,"danger");
        }
      });
    } else {

      this.alerta = new Alerta("Debe seleccionar al menos una imagen y subirla","danger");
    }

  }
  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public agregarTelefono() {
    this.actualizarNegocioDTO.telefono.push('');
  }

  eliminarTelefono(index: number) {
    this.actualizarNegocioDTO.telefono.splice(index, 1);
}

  negocios: string[];

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

  public obtenerNegocio(cod: string){

    this.negociosService.obtener(cod).subscribe({
      next: data => {
        this.actualizarNegocioDTO = data.respuesta;
        this.actualizarNegocioDTO.id = data.respuesta.codigoNegocio;

        console.log(this.actualizarNegocioDTO);
      },
      error: error  => {
        this.alerta = new Alerta(error.error,"danger");
      },
    });
  }

  private cargarTiposNegocios() {
    
    this.negociosService.listarCategorias().subscribe({
      next: (data) => {
        this.categorias = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar las categorias");
      }
    });

  }

  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.actualizarNegocioDTO.imagen = [];
          this.actualizarNegocioDTO.imagen.push(data.respuesta.url);
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

