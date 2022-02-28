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
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Usuario } from '../../../usuario/shared/model/usuario';
import { of } from 'rxjs';
import { Reserva } from '../../shared/model/reserva';

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
  dummyUsuarioDos.telefonoCelular = '300';
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
        HttpClientModule,
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
    spyOn(usuarioService, 'listar').and.returnValue(
      of(dummyUsuarios)
    );
    spyOn(reservaService, 'listarPorUsuario').and.returnValue(
      of(dummyReservas)
    );

    component.usuario = dummyUsuarioUno;
    component.usuarios = dummyUsuarios;

    component.consultarUsuario();

    expect(usuarioService.listar).toHaveBeenCalled();
    expect(reservaService.listarPorUsuario).toHaveBeenCalled();
  });

  it('deberia mostrar mesaje cuando usuario no existe', () => {
    const telefonoCelular = component.formGroup.get('telefonoCelular');
    telefonoCelular.setValue('300');
    spyOn(usuarioService, 'listar').and.returnValue(
      of(dummyUsuarios)
    );

    component.usuarios = dummyUsuarios;
    component.usuario = undefined;

    component.consultarUsuario();

    expect(usuarioService.listar).toHaveBeenCalled();
  });

});
