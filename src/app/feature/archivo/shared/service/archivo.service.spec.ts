import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';

import { ArchivoService } from './archivo.service';
import { Archivo } from '../model/archivo';

describe('ArchivoService', () => {
  let service: ArchivoService;
  let httpMock: HttpTestingController;
  const apiEndpointArchivosConsulta = `${environment.archivos.endpoint}/archivos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArchivoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar todos los archivos', () => {
    const dummyArchivo = new Archivo();
    dummyArchivo.id = 1;
    dummyArchivo.viviendaId = 1;
    dummyArchivo.ruta = 'src/public/images/image.jpg';

    const dummyArchivoDos = new Archivo();
    dummyArchivo.id = 2;
    dummyArchivo.viviendaId = 1;
    dummyArchivo.ruta = 'src/public/images/image.jpg';

    const dummyArchivos = [dummyArchivo, dummyArchivoDos];

    service.listar().subscribe(archivos => {
      expect(archivos.length).toBe(2);
      expect(archivos).toEqual(dummyArchivos);
    });

    const req = httpMock.expectOne(apiEndpointArchivosConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArchivos);

  });

  it('deberia listar todos los archivos para una vivienda', () => {
    const dummyArchivo = new Archivo();
    dummyArchivo.id = 1;
    dummyArchivo.viviendaId = 1;
    dummyArchivo.ruta = 'src/public/images/image.jpg';

    const dummyArchivoDos = new Archivo();
    dummyArchivo.id = 2;
    dummyArchivo.viviendaId = 1;
    dummyArchivo.ruta = 'src/public/images/image.jpg';

    const dummyArchivos = [dummyArchivo, dummyArchivoDos];

    service.consultarPorViviendaId(1).subscribe(archivos => {
      expect(archivos.length).toBe(2);
      expect(archivos).toEqual(dummyArchivos);
    });

    const req = httpMock.expectOne(`${apiEndpointArchivosConsulta}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArchivos);

  });

});
