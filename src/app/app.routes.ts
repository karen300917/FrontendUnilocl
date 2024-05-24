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
import { LoginGuard } from './guards/permiso.service';
import { ActualizarNegocioComponent } from './componentes/actualizar-negocio/actualizar-negocio.component';
import { ActualizarClienteComponent } from './componentes/actualizar-cliente/actualizar-cliente.component';
import { RolesGuard } from './servicios/roles.service';
import { HistorialDeRevicionComponent } from './componentes/historial-de-revicion/historial-de-revicion.component';
import { RevicionComponent } from './componentes/revicion/revicion.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { RecomendadosComponent } from './componentes/recomendados/recomendados.component';
import { ActualizarModeraadorComponent } from './componentes/actualizar-moderaador/actualizar-moderaador.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'historial-de-revicion', component: HistorialDeRevicionComponent},
    { path: 'revicion', component:RevicionComponent},
    { path: 'favoritos', component:FavoritosComponent},
    
    { path: 'recomendados', component:RecomendadosComponent, canActivate: [RolesGuard],data: {
            expectedRole: ["CLIENTE"]
        }
    },

    {
        path: "gestion-negocios", component: GestionNegociosComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["CLIENTE"] }
    },
    {
        path: "crear-negocio", component: CrearNegocioComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["CLIENTE"]
        }
    },
    {
        path: "gestio-negocios-admin", component: GestionNegociosComponent, canActivate:
            [RolesGuard], data: { expectedRole: ["MODERADOR"] }
    },

    { path: "inicio-cliente", component: InicioClienteComponent },
    { path: "inicio-moderador", component: InicioModeradorComponent },
    {
        path: "detalle-negocio/:codigo", component: DetalleNegocioComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["CLIENTE"] }
    },
    { path: "busqueda/:texto/:tipo", component: BusquedaComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
    {
        path: "actualizar-negocio/:codigo", component: ActualizarNegocioComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["CLIENTE"] }
    },
    {
        path: "actualizar-cliente", component: ActualizarClienteComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["CLIENTE"] }
    },
    {
        path: "actualizar-moderador", component: ActualizarModeraadorComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["MODERADOR"] }
    },

    { path: "**", pathMatch: "full", redirectTo: "" }
];