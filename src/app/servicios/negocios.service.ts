import { Injectable } from '@angular/core';
import { RegistroNegocioDTO } from '../dto/registro-negocio-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ActualizarNegocioDTO } from '../dto/actualizar-negocio-dto';
import { NegocioGetDTO } from '../dto/NegocioGetDTO';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
import { BusquedaDTO } from '../dto/busqueda';
@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  
  private negociosURL = "http://localhost:8080/api/negocio";
  constructor(private http: HttpClient) { }
  public crear(negocioNuevo: RegistroNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/crearNegocio`, negocioNuevo);
  }
  public actualizar(actualizarNegocio: ActualizarNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosURL}/actualizarNegocio`, actualizarNegocio);
  }

  public obtener(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/buscarNegocio/${codigoNegocio}`);
  }

  public eliminar(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosURL}/eliminarNegocio/${codigoNegocio}`);
  }
  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listarNegociosPorCliente/${codigoCliente}`);
  }
  public listarTodosNegocios(
  ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listarNegocios`);
  }
  public buscarNegocios(codigoCliente: string, item:BusquedaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/buscadorNegocios/${codigoCliente}`, item);
  }


  public listarCategorias(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-categorias`);
  }
  

  
}