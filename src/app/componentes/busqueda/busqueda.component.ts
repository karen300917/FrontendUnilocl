import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { TokenService } from '../../servicios/token.service';
import { BusquedaDTO } from '../../dto/busqueda';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-busqueda',
  standalone: true,
    imports: [CommonModule, RouterModule],
   
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
  textoBusqueda: string;
  tipo: string;
  resultados: ItemNegocioDTO[];

  id: string = '';
  

  constructor(private router: Router, private mapaService:MapaService, private route: ActivatedRoute, private negociosService: NegociosService, private tokekenService: TokenService) {
    this.resultados = [];
    
    this.tipo = "";
    this.textoBusqueda = "";
  
    this.route.params.subscribe(params => {
      this.textoBusqueda = params['texto'];
      this.tipo= params['tipo']
      this.busqueda();
    });
    
  }
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
    
  }

  public busqueda() {


    if (this.tipo=="tipoNegocio") {
      
      this.id = this.tokekenService.getCodigo();
      const busquedaItem = new BusquedaDTO( this.textoBusqueda, null);
      this.negociosService.buscarNegocios(this.id, busquedaItem).subscribe({
        next: data => {
          console.log(data.respuesta);
          this.resultados = data.respuesta;
          this.mapaService.pintarMarcadores(this.resultados);
        }

      })
    } else {
      this.id = this.tokekenService.getCodigo();
      console.log(this.textoBusqueda)
     const busquedaItem = new BusquedaDTO( null, this.textoBusqueda);
     this.negociosService.buscarNegocios(this.id, busquedaItem).subscribe({
      next: data => {
        console.log(data.respuesta);
        this.resultados = data.respuesta;
        this.mapaService.pintarMarcadores(this.resultados);
        
      }
    })
     
      }
    
  

  
  }

}
