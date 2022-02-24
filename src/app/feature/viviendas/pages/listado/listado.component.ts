import { Component, OnInit } from '@angular/core';
import { ViviendaService } from '../../shared/service/vivienda.service';
import { Vivienda } from '../../shared/model/vivienda';
import { ArchivoService } from '../../../archivo/shared/service/archivo.service';
import { Archivo } from '../../../archivo/shared/model/archivo';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  viviendas: Vivienda[] = [];
  archivos: Archivo[] = [];

  constructor(private viviendaService: ViviendaService,
              private archivoService: ArchivoService ) { }

  ngOnInit(): void {

      const obsViviendas = this.obtenerViviendas();
      const obsArchivos = this.obtenerArchivos();

      forkJoin([obsViviendas, obsArchivos]).subscribe(resp => {
        this.viviendas = resp[0];
        this.archivos = resp[1];
        this.asignarArchivosAViviendas();
      });

  }

  public obtenerViviendas(): Observable<Vivienda[]> {
    return this.viviendaService.listar();
  }

  public obtenerArchivos(): Observable<Archivo[]> {
    return this.archivoService.listar();
  }

  asignarArchivosAViviendas() {
    const copiaViviendas: Vivienda[] = this.viviendas;
    const copiaArchivos: Archivo[] = this.archivos;
    for (const vivienda of copiaViviendas) {
      vivienda.archivos = copiaArchivos
        .filter(archivo => archivo.viviendaId === vivienda.id);
    }
    this.viviendas = copiaViviendas;
  }

}
