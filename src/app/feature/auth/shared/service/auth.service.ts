import { Injectable } from '@angular/core';
import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
import { Usuario } from '../../../usuario/shared/model/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario = undefined;
  usuarios: Usuario[] = [];

  constructor( private usuarioService: UsuarioService ) { }


  loguear( telefonoCelular: string ): Observable<Usuario>{
    this.usuarioService.listar()
      .subscribe(
        resp => {
        this.usuarios = resp;
        this.usuario = this.usuarios.find(usuario => usuario.telefonoCelular === telefonoCelular);
        console.log('Desde autenticación: ' + this.usuario.telefonoCelular);
        return this.construirObservable();
      },
      error => {
        console.log('http error', error.error.mensaje);
    });
    return this.construirObservable();
  }

  construirObservable(): Observable<Usuario> {
    return new Observable(observer => {
      observer.next(this.usuario);

      observer.complete();
    });
  }

}
