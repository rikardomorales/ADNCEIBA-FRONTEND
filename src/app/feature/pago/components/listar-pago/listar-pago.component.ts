import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoService } from '../../shared/service/pago.service';
import { Pago } from '../../shared/model/pago';
import swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar-pago',
  templateUrl: './listar-pago.component.html',
  styleUrls: ['./listar-pago.component.css']
})
export class ListarPagoComponent implements OnInit {
  pagoForm: FormGroup;
  public listaPagos: Observable<Pago[]>;
  public listaLocalPagos: Pago[];
  public listaSeleccionados: Pago[];
  public identificacion = '';
  public verPagosPendientes = false;
  public exitoso = false;
  public tituloExito = '¡Éxito!';
  public pagoExitoso = '¡Pago realizado con Exito!';
  public tituloAdvertencia = '¡Advertencia!';
  public pagoNoEncontrado = '¡No Existen Pagos asociados!';
  public identificacionVacia = '¡Por favor ingrese una identificación!';
  constructor(protected pagoService: PagoService) { }

  ngOnInit() {
   this.listarPagos();
   this.construirFormulario();
  }

  listarPagos() {
    this.pagoService.consultar().subscribe(
      response => {
        this.listaLocalPagos = response;
      });
  }

  construirFormulario(): void {
    this.pagoForm = new FormGroup({
      identificacion: new FormControl('')
    });
  }

  consultarPago() {
    this.listaSeleccionados = [];
    this.identificacion = this.pagoForm.get('identificacion').value;
    if (this.identificacion === '') {
      swal.fire(this.tituloAdvertencia, this.identificacionVacia, 'warning');
      return;
    }

    for (const data of this.listaLocalPagos) {
      if (data.documentoIdentificacionDeudor === this.identificacion) {
        this.listaSeleccionados.push(data);
      }
    }

    this.listaLocalPagos = this.listaSeleccionados;

    if (this.listaLocalPagos.length > 0) {
      this.verPagosPendientes = true;
    } else {
      swal.fire(this.tituloAdvertencia, this.pagoNoEncontrado, 'warning');
      this.atras();
    }
  }

  pagar(pago: Pago): any {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const tamano = 10;
    let strFechaPago = '';

    if (month < tamano) {
      strFechaPago = strFechaPago + `${year}-0${month}-${day}`;
    } else {
      strFechaPago = strFechaPago + `${year}-${month}-${day}`;
    }
    pago.fechaPago = strFechaPago;
    pago.valorPagado = pago.valorAdeudado;
    this.pagoService.actualizar(pago).subscribe(value => this.exitoso = value);
    swal.fire(this.tituloExito, this.pagoExitoso, 'success');
    this.atras();
    return this.exitoso;
  }

  atras() {
    this.listarPagos();
    this.verPagosPendientes = false;
    this.identificacion = '';
    this.pagoForm.get('identificacion').setValue('');
    this.listaSeleccionados = [];
  }

}
