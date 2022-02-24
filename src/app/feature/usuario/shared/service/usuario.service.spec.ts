import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Usuario } from '../model/usuario';
import { HttpResponse } from '@angular/common/http';


describe('UsuarioService', () => {
  let httpMock: HttpTestingController;
  let service: UsuarioService;
  const apiEndpointUsuarioConsulta = `${environment.usuarios.endpoint}/usuarios`;
  const apiEndpointUsuarios = `${environment.usuarios.endpoint}/usuarios`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia crear un usuario', () => {
    const dummyUsuario = new Usuario();
    dummyUsuario.id = 1;
    dummyUsuario.telefonoCelular = '300';
    dummyUsuario.nombres = 'Juan';
    dummyUsuario.apellidos = 'Perez';
    dummyUsuario.correoElectronico = 'test@test.com';
    dummyUsuario.tipoDocumento = 'CC';
    dummyUsuario.numeroDocumento = '123';

    service.crear(dummyUsuario).subscribe(respuesta => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointUsuarios);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar usuarios', () => {
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

    service.listar().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });

    const req = httpMock.expectOne(apiEndpointUsuarioConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

});
