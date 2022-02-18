import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Vivienda } from '../model/vivienda';

@Injectable({
  providedIn: 'root'
})
export class ViviendaService {

  constructor( protected http: HttpService ) {}

  public listar() {
    return this.http.doGet<Vivienda[]>(`${environment.viviendas.endpoint}/viviendas`, 
                                        this.http.optsName('consultar viviendas'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Vivienda>(`${environment.viviendas.endpoint}/viviendas/${id}`, 
                                        this.http.optsName('consultar vivienda'));
  }

}
