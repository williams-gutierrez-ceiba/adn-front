import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearComponent } from './crear.component';
import { UsuarioService } from '../../shared/service/usuario.service';
import { HttpService } from 'src/app/core/services/http.service';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Usuario } from '../../shared/model/usuario';
import { of, throwError } from 'rxjs';

describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;
  let usuarioService: UsuarioService;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [ CrearComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('formulario es valido cuando no esta vacio', () => {
    const formulario = component.formGroup;
    const telefonoCelular = component.formGroup.get('telefonoCelular');
    const nombres = component.formGroup.get('nombres');
    const apellidos = component.formGroup.get('apellidos');
    const correoElectronico = component.formGroup.get('correoElectronico');
    const tipoDocumento = component.formGroup.get('tipoDocumento');
    const numeroDocumento = component.formGroup.get('numeroDocumento');

    telefonoCelular.setValue('3126547896');
    nombres.setValue('Juan');
    apellidos.setValue('Perez');
    correoElectronico.setValue('test@test.com');
    tipoDocumento.setValue('CC');
    numeroDocumento.setValue('40402228');

    expect(formulario.valid).toBeTrue();
  });

  it('se debe crear un usuario correctamente', () => {
    const formulario = component.formGroup;

    const telefonoCelular = component.formGroup.get('telefonoCelular');
    const nombres = component.formGroup.get('nombres');
    const apellidos = component.formGroup.get('apellidos');
    const correoElectronico = component.formGroup.get('correoElectronico');
    const tipoDocumento = component.formGroup.get('tipoDocumento');
    const numeroDocumento = component.formGroup.get('numeroDocumento');

    telefonoCelular.setValue('3126547896');
    nombres.setValue('Juan');
    apellidos.setValue('Perez');
    correoElectronico.setValue('test@test.com');
    tipoDocumento.setValue('CC');
    numeroDocumento.setValue('40402228');

    const usuario = new Usuario();

    usuario.telefonoCelular = formulario.get('telefonoCelular').value;
    usuario.nombres = formulario.get('nombres').value;
    usuario.apellidos = formulario.get('apellidos').value;
    usuario.correoElectronico = formulario.get('correoElectronico').value;
    usuario.tipoDocumento = formulario.get('tipoDocumento').value;
    usuario.numeroDocumento = formulario.get('numeroDocumento').value;

    spyOn(usuarioService, 'crear').and.callFake(() => {
      return of(true);
    });

    component.crear();
    expect(usuarioService.crear).toHaveBeenCalled();

  });

  it('deberia arrojar un error creando un usuario con un telefono celular existente', () => {
    spyOn(usuarioService, 'crear').and.returnValue(
      throwError({
        "nombreExcepcion": "ExcepcionDuplicidad",
        "mensaje": "El usuario ya existe en el sistema"
      }));
    component.crear();
    expect(usuarioService.crear).toHaveBeenCalled();
  });

});
