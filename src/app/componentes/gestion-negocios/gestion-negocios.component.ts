import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
    selector: 'app-gestion-negocios',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './gestion-negocios.component.html',
    styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
    

    negocios: ItemNegocioDTO[];
    seleccionados: ItemNegocioDTO[];
    textoBtnEliminar: string | undefined;

    constructor(private negocioService: NegociosService, private router: Router) {
        this.negocios = [];
        this.seleccionados = [];
        this.listarNegocios();
    }

    public listarNegocios() {
        this.negocios = this.negocioService.listar();
        console.log(this.negocios);
    }

    public seleccionar(producto: ItemNegocioDTO, estado: boolean) {
        if (estado) {
            this.seleccionados.push(producto);
        } else {
            this.seleccionados.splice(this.seleccionados.indexOf(producto), 1);
        }
        this.actualizarMensaje();
    }
    private actualizarMensaje() {
        const tam = this.seleccionados.length;
        if (tam != 0) {
            if (tam == 1) {
                this.textoBtnEliminar = "1 elemento";
            } else {
                this.textoBtnEliminar = tam + " elementos";
            }
        } else {
            this.textoBtnEliminar = "";
        }
    }
    public borrarNegocios() {
        this.seleccionados.forEach((n: { codigoNegocio: string; }) => {
            this.negocioService.eliminar(n.codigoNegocio);
            this.negocios = this.negocios.filter(negocio => negocio.codigoNegocio !== n.codigoNegocio);
        });
        this.seleccionados = [];
        this.actualizarMensaje();
    }

    // navegarLogin() {
    //     this.router.navigate(["/login"]);
    // }

}