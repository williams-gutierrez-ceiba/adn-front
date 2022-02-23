import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViviendaService } from '../../shared/service/vivienda.service';
import { Vivienda } from '../../shared/model/vivienda';
import { Archivo } from '../../../archivo/shared/model/archivo';
import { ArchivoService } from '../../../archivo/shared/service/archivo.service';

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styles: [`

  `
  ]
})
export class ViviendaComponent implements OnInit {

  id: number;
  vivienda!: Vivienda;
  archivos!: Archivo[];

  isLinear = false;

  constructor(private activatedRoute: ActivatedRoute,
              private viviendaService: ViviendaService,
              private archivoService: ArchivoService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ id }) => {
        console.log(id);
        this.id = id;

        this.viviendaService.consultarPorId(id)
          .subscribe( vivienda => {
              console.log(vivienda);
              this.vivienda = vivienda;

              this.archivoService.consultarPorViviendaId(vivienda.id)
                .subscribe(archivos => {
                  console.log(archivos);
                  this.archivos = archivos;
                  this.vivienda.archivos = archivos;

                });
          });
      });

  }

}
