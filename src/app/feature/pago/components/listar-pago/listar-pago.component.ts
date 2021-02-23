import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PagoService } from '../../shared/service/pago.service';
import { Pago } from '../../shared/model/pago';


@Component({
  selector: 'app-listar-pago',
  templateUrl: './listar-pago.component.html',
  styleUrls: ['./listar-pago.component.css']
})
export class ListarPagoComponent implements OnInit {
  public listaPagos: Observable<Pago[]>;
  public listaLocalPagos: Pago[];
  public identificacion: string = "";
  public verPagosPendientes = false;
  public exitoso = false;

  constructor(protected pagoService: PagoService) { }

  ngOnInit() {
    this.listaPagos = this.pagoService.consultar();
    this.listaPagos.subscribe(value => this.listaLocalPagos = value);
  }


  consultarPago() {
    let listaSeleccionados: Pago[];
    listaSeleccionados = [];
    for (const data of this.listaLocalPagos) {
      if (data.documentoIdentificacionDeudor === this.identificacion && data.valorPagado === '0.00') {
        listaSeleccionados.push(data);
      }
    }

    this.listaLocalPagos = listaSeleccionados;

    if (this.listaLocalPagos.length > 0) {
      this.verPagosPendientes = true;
    } else {
      this.atras();
    }
  }

  pagar(pago: Pago) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let fechaPago = '';

    if (month < 10) {
      fechaPago = `${day}-0${month}-${year}`;
    } else {
      fechaPago = `${day}-${month}-${year}`;
    }

    pago.fechaPago = fechaPago;
    pago.valorPagado = pago.valorAdeudado;
    this.pagoService.actualizar(pago).subscribe(value => this.exitoso = value);
    this.atras();
  }

  atras() {
    this.listaPagos.subscribe(value => this.listaLocalPagos = value);
    this.verPagosPendientes = false;
    this.identificacion = '';
    this.exitoso = false;
  }

}