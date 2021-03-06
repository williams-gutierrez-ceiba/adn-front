import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { ListarComponent } from './listar.component';
import { HttpService } from 'src/app/core/services/http.service';

import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
import { ReservaService } from '../../shared/service/reserva.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Usuario } from '../../../usuario/shared/model/usuario';
import { of, throwError } from 'rxjs';
import { Reserva } from '../../shared/model/reserva';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListarComponent', () => {
  let component: ListarComponent;
  let fixture: ComponentFixture<ListarComponent>;
  let usuarioService: UsuarioService;
  let reservaService: ReservaService;

  const dummyUsuarioUno = new Usuario();
  dummyUsuarioUno.id = 1;
  dummyUsuarioUno.telefonoCelular = '300';
  dummyUsuarioUno.nombres = 'Juan';
  dummyUsuarioUno.apellidos = 'Perez';
  dummyUsuarioUno.correoElectronico = 'test@test.com';
  dummyUsuarioUno.tipoDocumento = 'CC';
  dummyUsuarioUno.numeroDocumento = '123';

  const dummyUsuarioDos = new Usuario();
  dummyUsuarioDos.id = 2;
  dummyUsuarioDos.telefonoCelular = '500';
  dummyUsuarioDos.nombres = 'Juan';
  dummyUsuarioDos.apellidos = 'Perez';
  dummyUsuarioDos.correoElectronico = 'test@test.com';
  dummyUsuarioDos.tipoDocumento = 'CC';
  dummyUsuarioDos.numeroDocumento = '123';

  const dummyUsuarios = [dummyUsuarioUno, dummyUsuarioDos];

  const dummyReserva = new Reserva();
  dummyReserva.usuarioId = '300';
  dummyReserva.viviendaId = 1;
  dummyReserva.fechaInicio = '2020-10-15';
  dummyReserva.fechaFin = '2020-10-20';
  dummyReserva.valorParcial = 100000;

  const dummyReservas = [dummyReserva];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        UsuarioService,
        ReservaService,
        HttpService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    reservaService = TestBed.inject(ReservaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia verificar que el usuario existe', () => {
    const telefonoCelular = component.formGroup.get('telefonoCelular');
    telefonoCelular.setValue('300');
    const spyUsuario = spyOn(usuarioService, 'listar').and.callFake(() => {
                        return of(dummyUsuarios);
                      });
    const spyReserva = spyOn(reservaService, 'listarPorUsuario').and.callFake(() => {
                        return of(dummyReservas);
                      });

    component.usuario = dummyUsuarioUno;
    component.usuarios = dummyUsuarios;

    component.consultarUsuario();

    expect(spyUsuario).toHaveBeenCalled();
    expect(spyReserva).toHaveBeenCalled();
  });

  it('deberia mostrar mesaje cuando usuario no existe', () => {
    const telefonoCelular = component.formGroup.get('telefonoCelular');
    telefonoCelular.setValue('600');
    const spyUsuario = spyOn(usuarioService, 'listar').and.callFake(() => {
                        return of(dummyUsuarios);
                      });

    component.usuarios = dummyUsuarios;
    component.usuario = undefined;

    component.consultarUsuario();

    expect(spyUsuario).toHaveBeenCalled();
  });

  it('deberia arrojar un error cuando el backend falle', () => {
    const mensajeError = 'error inesperado';
    const spyUsuario = spyOn(usuarioService, 'listar').and.callFake(() => {
                        return throwError({status: 404, error: {mensaje: mensajeError}});
                      });
    const spySnackBar = spyOn(component, 'mostrarSnackbar');
    component.consultarUsuario();
    expect(spyUsuario).toHaveBeenCalled();
    expect(spySnackBar).toHaveBeenCalledOnceWith(mensajeError);
  });

});
