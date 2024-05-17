import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs/internal/Observable';
import { ActualizarClienteDTO } from '../dto/actualizar-cliente-dto';
import { favoritoDTO } from '../dto/favorito-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteURL = "http://localhost:8080/api/cliente";
  constructor(private http: HttpClient) { }

  public actualizarCliente(actualizarCliente: ActualizarClienteDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.clienteURL}/actualizarNegocio`, actualizarCliente);
  }

  public ponerFavorito(favorito: favoritoDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.clienteURL}/agregarFavoritos`, favorito );
  }

}
