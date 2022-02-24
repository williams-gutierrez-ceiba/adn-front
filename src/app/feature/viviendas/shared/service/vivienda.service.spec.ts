import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ViviendaService } from './vivienda.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Vivienda } from '../model/vivienda';

describe('ViviendaService', () => {
  let httpMock: HttpTestingController;
  let service: ViviendaService;
  const apiEndpointViviendaConsulta = `${environment.viviendas.endpoint}/viviendas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViviendaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ViviendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar viviendas', () => {
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

    const dummyViviendaDos = new Vivienda();
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

    const dummyViviendas = [dummyVivienda, dummyViviendaDos];

    service.listar().subscribe(viviendas => {
      expect(viviendas.length).toBe(2);
      expect(viviendas).toEqual(dummyViviendas);

      const req = httpMock.expectOne(apiEndpointViviendaConsulta);
      expect(req.request.method).toBe('GET');
      req.flush(dummyViviendas);
    });

  });

  it('deberia consultar una vivienda', () => {
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

    service.consultarPorId(1).subscribe(vivienda => {
      expect(vivienda).toEqual(dummyVivienda);
    });

    const req = httpMock.expectOne(`${apiEndpointViviendaConsulta}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyVivienda);
  });


});

