import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearComponent } from './crear.component';
import { ListadoComponent } from '../../../viviendas/pages/listado/listado.component';
import { HttpService } from 'src/app/core/services/http.service';

import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
import { ViviendaService } from '../../../viviendas/shared/service/vivienda.service';
import { ReservaService } from '../../shared/service/reserva.service';
import { Usuario } from '../../../usuario/shared/model/usuario';
import { of, throwError } from 'rxjs';
// import { of } from 'rxjs';
import { Vivienda } from '../../../viviendas/shared/model/vivienda';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Reserva } from '../../shared/model/reserva';

import { Router } from '@angular/router';

describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;
  let usuarioService: UsuarioService;
  let viviendaService: ViviendaService;
  let reservaService: ReservaService;
  let router: Router;

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

  const dummyVivienda = new Vivienda();
  dummyVivienda.id = 1;
  dummyVivienda.admiteMascotas = 1;
  dummyVivienda.aireAcondicionado = 1;
  dummyVivienda.calefaccion = 1;
  dummyVivienda.ciudad = 'ciudad';
  dummyVivienda.departamento = 'depto';
  dummyVivienda.costoDiario = 100000;
  dummyVivienda.tipoVivienda = 1;
  dummyVivienda.numeroBanios = 2;
  dummyVivienda.numeroHabitaciones = 2;
  dummyVivienda.numeroPersonas = 2;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: './viviendas/listado', component: ListadoComponent, pathMatch: 'full' }
        ]),
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        UsuarioService,
        ViviendaService,
        ReservaService,
        HttpService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    viviendaService = TestBed.inject(ViviendaService);
    reservaService = TestBed.inject(ReservaService);
    router = TestBed.inject(Router);

    spyOn(viviendaService, 'consultarPorId').and.callFake(() => {
      return of(dummyVivienda);
    });

    router.initialNavigation();

    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('deberia listar usuarios', () => {
    spyOn(usuarioService, 'listar').and.callFake(() => {
      return of(dummyUsuarios);
    });
    component.consultarUsuario();
    expect(usuarioService.listar).toHaveBeenCalled();
  });

  it('deberia verificar que el usuario existe', () => {
    const telefonoCelular = component.formGroup.get('telefonoCelular');
    telefonoCelular.setValue('300');
    spyOn(usuarioService, 'listar').and.callFake(() => {
      return of(dummyUsuarios);
    });
    component.usuario = dummyUsuarioUno;
    component.usuarios = dummyUsuarios;

    component.consultarUsuario();

    expect(usuarioService.listar).toHaveBeenCalled();
  });

  it('deberia arrojar un error cuando el backend falle', () => {
    const spyUsuario = spyOn(usuarioService, 'listar').and.callFake(() => {
                        return throwError({
                            "nombreExcepcion": 'ExcepcionTecnica',
                            "mensaje": 'error inesperado'
                          });
                      });
    component.consultarUsuario();
    expect(spyUsuario).toHaveBeenCalled();
  });

  it('deberia crear una reserva exitosamente', () => {
    component.construirFormularioReserva();
    const fechaInicio = component.formGroup.get('fechaInicio');
    const fechaFin = component.formGroup.get('fechaFin');
    fechaInicio.setValue(new Date());
    fechaFin.setValue(new Date());

    const fechaInicioStr = component.formGroup.get('fechaInicio').value.toISOString();
    const fechaFinStr = component.formGroup.get('fechaFin').value.toISOString();

    const reserva: Reserva = new Reserva();
    reserva.fechaInicio = fechaInicioStr.split('T')[0];
    reserva.fechaFin = fechaFinStr.split('T')[0];
    reserva.usuarioId = dummyUsuarioUno.telefonoCelular;
    reserva.viviendaId = dummyVivienda.id;
    reserva.valorParcial = dummyVivienda.costoDiario;
    reserva.valorTotal = undefined;

    component.usuario = dummyUsuarioUno;
    component.usuarios = dummyUsuarios;

    spyOn(reservaService, 'crear').and.callFake(() => {
      return of(1);
    });

    component.crearReserva();

    expect(reservaService.crear).toHaveBeenCalled();
  });

});
