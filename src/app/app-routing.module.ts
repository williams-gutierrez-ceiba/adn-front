import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

//import { HomeComponent } from '@home/home.component';
import { HomeComponent } from './feature/viviendas/pages/home/home.component';
import { ErrorPageComponent } from './feature/shared/error-page/error-page.component';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./feature/auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'usuarios', loadChildren: () => import('./feature/usuario/usuario.module').then(mod => mod.UsuarioModule) },
  { path: 'reservas', loadChildren: () => import('./feature/reserva/reserva.module').then(mod => mod.ReservaModule) },
  { path: 'viviendas', loadChildren: () => import('./feature/viviendas/viviendas.module').then(mod => mod.ViviendasModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule) },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
