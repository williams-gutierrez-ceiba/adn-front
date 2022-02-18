import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './components/crear/crear.component';
import { ListarComponent } from './components/listar/listar.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    MaterialModule
  ]
})
export class ReservaModule { }
