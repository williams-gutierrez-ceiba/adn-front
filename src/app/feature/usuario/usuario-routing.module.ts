import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../viviendas/pages/home/home.component';
import { CrearComponent } from './components/crear/crear.component';

const rutas : Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [   
      {path: 'crear', component: CrearComponent},
      {path: '**', redirectTo: 'crear'}
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
export class UsuarioRoutingModule { }
