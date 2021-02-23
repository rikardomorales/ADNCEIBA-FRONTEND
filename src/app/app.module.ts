import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { PagoModule } from '@pago/pago.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { PagoComponent } from '@pago/components/pago/pago.component';
import { ListarPagoComponent } from '@pago/components/listar-pago/listar-pago.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagoComponent,
    ListarPagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagoModule,
    CoreModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
