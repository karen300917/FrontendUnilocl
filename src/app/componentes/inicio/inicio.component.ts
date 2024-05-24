import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  constructor(private mapaService: MapaService, private router: Router) { }
  ngOnInit(): void {
    this.mapaService.crearMapa();
  }
  textoBusqueda: string = '';
  tipoNegocio: boolean = false;
  nombre: boolean = false;

  


  
  
  
  
  onFilterChange(selectedFilter: string): void {
    if (selectedFilter === 'tipoNegocio') {
      this.nombre = false;
    } else if (selectedFilter === 'nombre') {
      this.tipoNegocio = false;
    }
  }


  public iraBusqueda(){
    
     

    
    if(this.tipoNegocio === true){
      console.log(this.textoBusqueda);
      
    this.router.navigate(["/busqueda", this.textoBusqueda,"tipoNegocio"]);
    }
    if(this.nombre === true){
      
      this.router.navigate(["/busqueda", this.textoBusqueda,"nombre"]);
      }
    }
}