import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ViviendaComponent } from './pages/vivienda/vivienda.component';
import { HomeComponent } from './pages/home/home.component';

const rutas : Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [   
      {path: 'listado', component: ListadoComponent},
      {path: 'agregar', component: AgregarComponent},
      {path: 'editar/:id', component: AgregarComponent},
      {path: 'buscar', component: BuscarComponent},
      {path: ':id', component: ViviendaComponent},
      {path: '**', redirectTo: 'listado'}
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class ViviendasRoutingModule { }
