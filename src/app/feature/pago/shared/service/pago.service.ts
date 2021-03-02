import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import {  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pago } from '../model/pago';

@Injectable()
export class PagoService {
  private URL_PAGOS: string;
  private URL_CONSULTA_PAGOS: string;

  constructor(protected http: HttpService) {
    this.URL_PAGOS = '/pagos';
    this.URL_CONSULTA_PAGOS = '/id?identificacion=';
  }

  public consultar() {
    return this.http.doGet<Pago[]>(`${environment.endpoint}${this.URL_PAGOS}`, this.http.optsName('consultar pagos'));
  }

  public consultarIdentificacion(identificacion: string) {
    return this.http.doGet<Pago[]>(`${environment.endpoint}${this.URL_PAGOS}${this.URL_CONSULTA_PAGOS}${identificacion}`,
           this.http.optsName('consultar pagos por identificacion'));
  }


  public actualizar(pago: Pago) {
    return this.http.doPut<Pago, boolean>(`${environment.endpoint}${this.URL_PAGOS}`, pago, this.http.optsName('actualizar pagos'));
  }
}
