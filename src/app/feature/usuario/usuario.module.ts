import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './components/crear/crear.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule
  ]
})
export class UsuarioModule { }
