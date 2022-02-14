import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViviendasRoutingModule } from './viviendas-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ViviendaComponent } from './pages/vivienda/vivienda.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';




@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    ViviendaComponent,
    HomeComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    ViviendasRoutingModule
  ]
})
export class ViviendasModule { }
