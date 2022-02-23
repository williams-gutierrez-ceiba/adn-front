import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViviendasRoutingModule } from './viviendas-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ViviendaComponent } from './pages/vivienda/vivienda.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MaterialModule } from '../material/material.module';
import { ViviendaTarjetaComponent } from './pages/viviendatarjeta/vivienda-tarjeta/vivienda-tarjeta.component';




@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    ViviendaComponent,
    ListadoComponent,
    ViviendaTarjetaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ViviendasRoutingModule
  ]
})
export class ViviendasModule { }
