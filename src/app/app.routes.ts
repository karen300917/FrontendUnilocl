import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { InicioClienteComponent } from './componentes/inicio-cliente/inicio-cliente.component';
import { InicioModeradorComponent } from './componentes/inicio-moderador/inicio-moderador.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: "gestion-negocios", component: GestionNegociosComponent },
    { path: "crear-negocio", component: CrearNegocioComponent },
    { path: "inicio-cliente", component: InicioClienteComponent },
    { path: "inicio-moderador", component: InicioModeradorComponent },
    { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent },
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: "**", pathMatch: "full", redirectTo: "" }
];