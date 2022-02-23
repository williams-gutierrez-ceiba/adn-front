import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/feature/usuario/shared/model/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../usuario/shared/service/usuario.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  numeroTelefono: string;
  formGroup: FormGroup;
  usuario: Usuario = undefined;
  usuarios: Usuario[] = [];

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar,
              private router: Router ) { }

  ngOnInit(): void {
    this.construirFormularioUsuario();
  }

  construirFormularioUsuario(): void {
    this.formGroup = this.formBuilder.group({
      telefonoCelular: ['', [Validators.required]]
    });
  }

  consultarUsuario() {
    this.usuarioService.listar()
      .subscribe(
        resp => {
        this.usuarios = resp;
        this.usuario = this.usuarios.find(usuario => usuario.telefonoCelular === this.formGroup.get('telefonoCelular').value);
        if (this.usuario !== undefined) {
          this.mostrarSnackbar(`Bienvenido ${this.usuario.nombres}`);
          this.router.navigate(['./viviendas/listado']);
        } else {
          this.mostrarSnackbar('El usuario no existe');
        }
        console.log(this.usuarios);
      },
      error => {
        this.mostrarSnackbar(error.error.mensaje);
        console.log('http error', error.error.mensaje);
      });
  }

  mostrarSnackbar( mensaje: string ) {
    this.snackBar.open( mensaje, 'Cerrar', {
      duration: 3000
    });
  }

}
