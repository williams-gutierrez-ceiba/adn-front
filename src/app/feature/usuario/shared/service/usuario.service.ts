import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  constructor( protected http: HttpService ) { }

  public listar() {
    return this.http.doGet<Usuario[]>(`${environment.usuarios.endpoint}/usuarios`, 
                                          this.http.optsName('consultar usuarios'));
  }

  public crear(usuario: Usuario) {
    return this.http.doPost<Usuario,boolean>(`${environment.usuarios.endpoint}/usuarios`, 
                                              usuario,
                                              this.http.optsName('crear usuario'));
  }

}
