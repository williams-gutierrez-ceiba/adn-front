import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Archivo } from '../model/archivo';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor( protected http: HttpService ) { }

  consultarPorViviendaId(viviendaId: number) {
    // return this.http.doGet<Archivo[]>(`http://localhost:8082/archivos/archivos/${viviendaId}`, 
    //                                     this.http.optsName('consultar archivos por vivienda'));
    return this.http.doGet<Archivo[]>(`${environment.archivos.endpoint}/archivos/${viviendaId}`, 
                                        this.http.optsName('consultar archivos por vivienda'));
  }

  listar() {
    return this.http.doGet<Archivo[]>(`http://localhost:8082/archivos/archivos`, 
                                        this.http.optsName('consultar archivos'));
  }

}
