import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialRevicionDTO } from '../dto/historial-revicion-dto';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadorURL = "http://localhost:8080/api/moderador"
  
  constructor(private http: HttpClient) { }

  public hacerRevision(historialRevicionDTO: HistorialRevicionDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadorURL}/hacerRevision`, historialRevicionDTO);
  }

 

}
