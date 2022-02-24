import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComponent } from './crear.component';
import { HttpService } from 'src/app/core/services/http.service';

import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
import { ViviendaService } from '../../../viviendas/shared/service/vivienda.service';
import { ReservaService } from '../../shared/service/reserva.service';
import { Usuario } from '../../../usuario/shared/model/usuario';
import { of } from 'rxjs';
import { Vivienda } from '../../../viviendas/shared/model/vivienda';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;
  let usuarioService: UsuarioService;
  let viviendaService: ViviendaService;
  let reservaService: ReservaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearComponent ],
      imports: [
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    viviendaService = TestBed.inject(ViviendaService);
    reservaService = TestBed.inject(ReservaService);

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
    

    spyOn(usuarioService, 'listar').and.returnValue(
      of(dummyUsuarios)
    );

    spyOn(viviendaService, 'consultarPorId').and.returnValue(
      of(dummyVivienda)
    );

    spyOn(reservaService, 'crear').and.returnValue(
      of(1)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

});
