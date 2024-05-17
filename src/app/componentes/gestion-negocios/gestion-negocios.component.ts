import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { NegocioGetDTO } from '../../dto/NegocioGetDTO';
@Component({
    selector: 'app-gestion-negocios',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './gestion-negocios.component.html',
    styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {


    negocios: NegocioGetDTO[];
    seleccionados: NegocioGetDTO[];
    textoBtnEliminar: string | undefined;
    textoBtnActualizar: string | undefined;


    constructor(private negocioService: NegociosService, private router: Router, private tokenService: TokenService) {
        this.negocios = [];
        this.seleccionados = [];
        this.listarNegocios();

    }

    public listarNegocios() {
        const codigoCliente = this.tokenService.getCodigo();
        this.negocioService.listarNegociosPropietario(codigoCliente).subscribe({
            next: (data) => {
                console.log(data.respuesta)
                this.negocios = data.respuesta;
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    public seleccionar(producto: NegocioGetDTO, estado: boolean) {
        if (estado) {
            this.seleccionados.push(producto);
        } else {
            this.seleccionados.splice(this.seleccionados.indexOf(producto), 1);
        }
        this.actualizarMensaje();
        this.actualizarMensaje1();
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

    private actualizarMensaje1() {
        const tam = this.seleccionados.length;
        if (tam != 0) {
            if (tam == 1) {
                this.textoBtnActualizar = "1 elemento";
            } else {
                this.textoBtnActualizar = "";
            }
        }

    }



}

// navegarLogin() {
//     this.router.navigate(["/login"]);
// }

