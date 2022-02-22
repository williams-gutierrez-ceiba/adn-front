import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../viviendas/pages/home/home.component';
import { CrearComponent } from './components/crear/crear.component';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar.component';

const rutas : Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [   
      {path: 'listar', component: ListarComponent},
      {path: 'crear/:viviendaId', component: CrearComponent},
      {path: '**', redirectTo: 'listar'}
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class ReservaRoutingModule { }
