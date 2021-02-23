import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Pago } from '../model/pago';

@Injectable()
export class PagoService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Pago[]>(`${environment.endpoint}/pagos`, this.http.optsName('consultar pagos'));
  }

  public actualizar(pago: Pago) {
    return this.http.doPut<Pago, boolean>(`${environment.endpoint}/pagos`, pago, this.http.optsName('actualizar pagos'));
  }
}
