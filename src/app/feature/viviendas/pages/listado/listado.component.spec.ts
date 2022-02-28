import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ListadoComponent } from './listado.component';
import { ArchivoService } from '../../../archivo/shared/service/archivo.service';
import { ViviendaService } from '../../../viviendas/shared/service/vivienda.service';

import { HttpService } from 'src/app/core/services/http.service';
import { Vivienda } from '../../shared/model/vivienda';
import { of } from 'rxjs';
import { Archivo } from '../../../archivo/shared/model/archivo';

import {MatDividerModule} from '@angular/material/divider';
import { MaterialModule } from '../../../material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ListadoComponent', () => {
    let component: ListadoComponent;
    let fixture: ComponentFixture<ListadoComponent>;
    let archivoService: ArchivoService;
    let viviendaService: ViviendaService;

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
    dummyVivienda.id = 2;
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

    const dummyArchivo = new Archivo();
    dummyArchivo.id = 1;
    dummyArchivo.viviendaId = 1;
    dummyArchivo.ruta = 'src/public/images/image.jpg';

    const dummyArchivoDos = new Archivo();
    dummyArchivo.id = 2;
    dummyArchivo.viviendaId = 1;
    dummyArchivo.ruta = 'src/public/images/image1.jpg';

    const dummyArchivoTres = new Archivo();
    dummyArchivo.id = 3;
    dummyArchivo.viviendaId = 2;
    dummyArchivo.ruta = 'src/public/images/image2.jpg';

    const dummyArchivos = [
        dummyArchivo,
        dummyArchivoDos,
        dummyArchivoTres
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ListadoComponent ],
            imports: [
                CommonModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatDividerModule,
                MaterialModule
            ],
            providers: [
                HttpService,
                ArchivoService,
                ViviendaService
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoComponent);
        component = fixture.componentInstance;
        archivoService = TestBed.inject(ArchivoService);
        viviendaService = TestBed.inject(ViviendaService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('deberia listar viviendas', () => {
        const spyVivienda = spyOn(viviendaService, 'listar').and.callFake(() => {
                                return of(dummyViviendas);
                            });
        component.ngOnInit();
        expect(spyVivienda).toHaveBeenCalled();
    });

    it('deberia listar archivos', () => {
        const spyArchivo = spyOn(archivoService, 'listar').and.callFake(() => {
                                return of(dummyArchivos);
                            });
        component.ngOnInit();
        expect(spyArchivo).toHaveBeenCalled();
    });

    it('debería asignar correctamente los archivos a las viviendas', () => {
        component.viviendas = dummyViviendas;
        component.archivos = dummyArchivos;

        component.asignarArchivosAViviendas();

        expect(component.viviendas[0].archivos.length).toBeGreaterThan(0);
        expect(component.viviendas[1].archivos.length).toBeGreaterThan(0);
    });

});
