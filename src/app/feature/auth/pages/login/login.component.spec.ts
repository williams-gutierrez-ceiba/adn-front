import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
import { HttpService } from 'src/app/core/services/http.service';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Usuario } from '../../../usuario/shared/model/usuario';
import { Vivienda } from '../../../viviendas/shared/model/vivienda';
import { ListadoComponent } from '../../../viviendas/pages/listado/listado.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usuarioService: UsuarioService;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        ListadoComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: './viviendas/listado', component: ListadoComponent, pathMatch: 'full' }
        ]),
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [UsuarioService, HttpService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    router = TestBed.inject(Router);

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
    expect(router.navigate).toHaveBeenCalledWith(['./viviendas/listado']);
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
