import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../usuario/shared/model/usuario';
import { Reserva } from '../../shared/model/reserva';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
import { ReservaService } from '../../shared/service/reserva.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  numeroTelefono: string;
  formGroup: FormGroup;
  usuario: Usuario = undefined;
  usuarios: Usuario[] = [];
  reservas: Reserva[] = undefined;
  esUsuarioRegistrado = false;

  displayedColumns: string[] = ['id', 'viviendaId', 'fechaInicio', 'fechaFin', 'valorParcial', 'valorTotal'];

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private usuarioService: UsuarioService,
              private reservaService: ReservaService) { }

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
          this.esUsuarioRegistrado = true;
          this.reservaService.listarPorUsuario(this.usuario.telefonoCelular)
            .subscribe(reservas => {
              this.reservas = reservas;
            });
          this.mostrarSnackbar(`Bienvenido ${this.usuario.nombres}`);
        } else {
          this.mostrarSnackbar('El usuario no existe');
        }
      },
      error => {
        this.mostrarSnackbar(error.error.mensaje);
      });
  }

  mostrarSnackbar( mensaje: string ){
    this.snackBar.open( mensaje, 'Cerrar', {
      duration: 3500
    });
  }

}
