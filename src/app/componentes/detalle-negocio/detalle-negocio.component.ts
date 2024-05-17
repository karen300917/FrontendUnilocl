import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImagenService } from '../../servicios/imagen.service';
import { TokenService } from '../../servicios/token.service';
import { NegocioGetDTO } from '../../dto/NegocioGetDTO';
import { favoritoDTO } from '../../dto/favorito-dto';
import { ClienteService } from '../../servicios/cliente.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from "../alerta/alerta.component";
@Component({
    selector: 'app-detalle-negocio',
    standalone: true,
    templateUrl: './detalle-negocio.component.html',
    styleUrl: './detalle-negocio.component.css',
    imports: [CommonModule, FormsModule, AlertaComponent]
})
export class DetalleNegocioComponent {
    codigoNegocio: string = '';
    negocio: NegocioGetDTO ;
    favorito: favoritoDTO ;
    alerta!: Alerta


    constructor(
        private route: ActivatedRoute,
        private imagenService: ImagenService,
        // private categoriaService: CategoriaService,
        private negocioService:NegociosService,
        private clienteService: ClienteService,
        private tokenService: TokenService,
      ) {
        // this.categorias = [];
        // this.filtro = [];

        this.negocio = new NegocioGetDTO();
        this.favorito = new favoritoDTO();
    
        this.route.params.subscribe((params) => {
          this.codigoNegocio = params['codigo'];
            this.obtenerProducto(this.codigoNegocio).then(result => {
              this.negocio = result;

              console.log(this.negocio);
          });
    
          
    
        });
      }


    obtenerProducto(codigoProducto: string): Promise<NegocioGetDTO> {

        return new Promise<NegocioGetDTO>((resolve, reject) => {

            this.negocioService.obtener(codigoProducto).subscribe({
                next: data => {
                    resolve(data.respuesta);
                },
                error: error => {
                    reject();
                },
            });
        })
    }

    // private cargarCategorias() {
    //     this.categoriaService.listar().subscribe({
    //       next: (data: { respuesta: string[] }) => {
    //         this.categorias = data.respuesta;
    //       },
    //       error: (error: { error: any }) => {
    //         console.log(error.error);
    //       },
    //     });
    //   }
    
      // en data.respuesta tiene que ir url al final
      
    //   public agregarCarrito(codigoProducto : number) {
    //     this.carritoService.agregar(codigoProducto);
    //   }
      
    
      public ponerFavorito(codigo : string){
        
        let codigoUsuario = this.tokenService.getCodigo();
        this.favorito.idCliente = codigoUsuario;
        this.favorito.idProducto = codigo;
        this.clienteService.ponerFavorito(this.favorito).subscribe({
          next: data => {
            this.alerta = new Alerta("Se agrego el producto correctamente", "succes");
          },
          error : error => {
            this.alerta = new Alerta(error.error.respuesta, "danger"); 
          }
        })
      }
}