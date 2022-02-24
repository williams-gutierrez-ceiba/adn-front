import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UsuarioService } from '../../../usuario/shared/service/usuario.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';

describe('AuthService', () => {
  // let httpMock: HttpTestingController;
  let service: AuthService;
  // let usuarioService: UsuarioService;

  beforeEach(() => {
    // const injector = TestBed.configureTestingModule({
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, UsuarioService, HttpService]
    });
    // httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    // usuarioService = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
