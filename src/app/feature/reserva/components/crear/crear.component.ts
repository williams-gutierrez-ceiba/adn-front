import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/feature/usuario/shared/model/usuario';
import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
import { Reserva } from '../../shared/model/reserva';
import { ViviendaService } from '../../../viviendas/shared/service/vivienda.service';
import { ReservaService } from '../../shared/service/reserva.service';
import { Vivienda } from '../../../viviendas/shared/model/vivienda';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  numeroTelefono: string;
  formGroup: FormGroup;
  usuario: Usuario = undefined;
  usuarios: Usuario[] = [];
  reserva: Reserva = new Reserva();
  vivienda: Vivienda = undefined;
  esUsuarioRegistrado = false;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private usuarioService: UsuarioService,
              private viviendaService: ViviendaService,
              private reservaService: ReservaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( ({ viviendaId }) => {
      this.viviendaService.consultarPorId(viviendaId)
        .subscribe( vivienda => {
            this.vivienda = vivienda;
        });
    });
    this.construirFormularioUsuario();
  }

  construirFormularioUsuario(): void {
    this.formGroup = this.formBuilder.group({
      telefonoCelular: ['', [Validators.required]]
    });
  }

  construirFormularioReserva() {
    this.formGroup = this.formBuilder.group({
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
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
          this.construirFormularioReserva();
          this.mostrarSnackbar(`Bienvenido ${this.usuario.nombres}`);
        } else {
          this.mostrarSnackbar('El usuario no existe');
        }
      },
      error => {
        this.mostrarSnackbar(error.error.mensaje);
      });
  }

  crearReserva() {
    const fechaInicioStr = this.formGroup.get('fechaInicio').value.toISOString();
    const fechaFinStr = this.formGroup.get('fechaFin').value.toISOString();
    this.reserva.fechaInicio = fechaInicioStr.split('T')[0];
    this.reserva.fechaFin = fechaFinStr.split('T')[0];
    this.reserva.usuarioId = this.usuario.telefonoCelular;
    this.reserva.viviendaId = this.vivienda.id;
    this.reserva.valorParcial = this.vivienda.costoDiario;
    this.reserva.valorTotal = undefined;

    console.log(this.reserva);

    this.reservaService.crear(this.reserva)
      .subscribe(
        resp => {
        console.log(resp);
        this.mostrarSnackbar(`Reserva creada exitosamente`);
        this.router.navigate(['./viviendas/listado']);
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
