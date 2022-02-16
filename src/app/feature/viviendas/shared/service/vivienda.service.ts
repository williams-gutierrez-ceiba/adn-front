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
    // return this.http.doGet<Vivienda[]>(environment.viviendas.endpoint, 
    //                                     this.http.optsName('consultar viviendas'));
    return this.http.doGet<Vivienda[]>(`http://localhost:8083/viviendas/viviendas`, 
                                        this.http.optsName('consultar viviendas'));
  }

  public consultarPorId(vivienda: Vivienda) {
    return this.http.doGet<Vivienda>(`${environment.viviendas.endpoint}/${vivienda.id}`, 
                                        this.http.optsName('consultar vivienda'));
  }

}
