import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor( protected http: HttpService ) { }

  public listarPorUsuario(usuarioId: string) {
    return this.http.doGet<Reserva[]>(`${environment.reservas.endpoint}/reservas/${usuarioId}`, 
                                        this.http.optsName('consultar reservas'));
  }

  public crear(reserva: Reserva) {
    return this.http.doPost<Reserva,number>(`${environment.reservas.endpoint}/reservas`, 
                                              reserva,
                                              this.http.optsName('crear reserva'));
  }

}
