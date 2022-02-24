import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { Reserva } from "src/app/feature/reserva/shared/model/reserva";
import { ReservaService } from './reserva.service';

describe('ReservaService', () => {
  let service: ReservaService;
  let httpMock: HttpTestingController;
  const apiEndpointReservaConsulta = `${environment.reservas.endpoint}/reservas`;
  const apiEndpointReserva = `${environment.reservas.endpoint}/reservas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia crear una reserva', () => {
    const dummyReserva = new Reserva();
    dummyReserva.usuarioId = '320';
    dummyReserva.viviendaId = 1;
    dummyReserva.fechaInicio = '2020-10-15';
    dummyReserva.fechaFin = '2020-10-20';
    dummyReserva.valorParcial = 100000;

    service.crear(dummyReserva).subscribe(respuesta => {
      expect(respuesta).toEqual(1);
    });

    const req = httpMock.expectOne(apiEndpointReserva);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({body: 1}));
  });

  it('deberia listar reservas asociadas a un usuario', () => {
    const dummyReserva = new Reserva();
    dummyReserva.id = 1;
    dummyReserva.usuarioId = '320';
    dummyReserva.viviendaId = 1;
    dummyReserva.fechaInicio = '2020-10-15';
    dummyReserva.fechaFin = '2020-10-20';
    dummyReserva.valorParcial = 100000;
    dummyReserva.valorTotal = 1000000;

    const dummyReservaDos = new Reserva();
    dummyReserva.id = 2;
    dummyReserva.usuarioId = '320';
    dummyReserva.viviendaId = 2;
    dummyReserva.fechaInicio = '2020-11-15';
    dummyReserva.fechaFin = '2020-11-20';
    dummyReserva.valorParcial = 100000;
    dummyReserva.valorTotal = 2000000;

    const dummyReservas = [dummyReserva, dummyReservaDos];

    service.listarPorUsuario('3125469871').subscribe(reservas => {
      expect(reservas.length).toBe(2);
      expect(reservas).toEqual(dummyReservas);
    });

    const req = httpMock.expectOne(`${apiEndpointReservaConsulta}/3125469871`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservas);
  });

});
