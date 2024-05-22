import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialRevicionDTO } from '../dto/historial-revicion-dto';
import { ActualizarClienteDTO } from '../dto/actualizar-cliente-dto';
import { ActualizarModeradorDTO } from '../dto/actualizar-moderador-dto';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadorURL = "http://localhost:8080/api/moderador"
  
  constructor(private http: HttpClient) { }

  public hacerRevision(historialRevicionDTO: HistorialRevicionDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadorURL}/hacerRevision`, historialRevicionDTO);
  }
  public actualizarModerador(actualizarModeradorDTO: ActualizarModeradorDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadorURL}/editarPerfil`, actualizarModeradorDTO);
  }
  public obtener(codigoModerador: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadorURL}/obtener/${codigoModerador}`);
  }
  public eliminarCuentaModerador(codigoModerador: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadorURL}/eliminarCuenta/${codigoModerador}`);
  }
 

}
