import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { HomeComponent } from '@home/home.component';
//import { HomeComponent } from './feature/viviendas/pages/home/home.component';
import { ProductoModule } from '@producto/producto.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './feature/shared/error-page/error-page.component';
import { MaterialModule } from './feature/material/material.module';
import { HomeComponent } from './feature/viviendas/pages/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    //HomeComponent,
    HomeComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductoModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [CookieService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
