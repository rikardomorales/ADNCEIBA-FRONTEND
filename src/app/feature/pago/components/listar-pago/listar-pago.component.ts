import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../shared/service/pago.service';
import { Pago } from '../../shared/model/pago';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Notificacion } from '@shared/copmponents/notificacion/model/notificacion';
import { NotificacionService } from '@shared/copmponents/notificacion/service/notificacion.service';

@Component({
  selector: 'app-listar-pago',
  templateUrl: './listar-pago.component.html'
})
export class ListarPagoComponent implements OnInit {
  public pagoForm: FormGroup;
  public listaLocalPagos: Pago[];
  public verPagosPendientes = false;
  public tituloExito = '¡Éxito!';
  public pagoExitoso = '¡Pago realizado con Exito!';
  public tituloAdvertencia = '¡Advertencia!';
  public pagoNoEncontrado = '¡No Existen Pagos asociados!';
  public notificacion: Notificacion;
  public tituloError = '¡Error!';
  public descripcionError = '¡Ocurrio un error de conexión al realizar la consulta!';
  constructor(protected pagoService: PagoService, private notificacionService: NotificacionService) { }

  ngOnInit() {
    this.construirFormulario();
  }

  construirFormulario(): void {
    this.pagoForm = new FormGroup({
      identificacion: new FormControl('', [Validators.required])
    });
  }

  consultarPorCedula() {
    this.pagoService.consultarIdentificacion(this.pagoForm.get('identificacion').value).subscribe(respuesta => {
      this.listaLocalPagos = respuesta;
      if (this.listaLocalPagos.length > 0) {
        this.verPagosPendientes = true;
      } else {
        this.notificacion = new Notificacion(this.tituloAdvertencia, this.pagoNoEncontrado, true);
        this.notificacionService.emiteAdvertencia(this.notificacion);
        this.limpiarFormulario();
      }
    }, err => {
      this.notificacion = new Notificacion(this.tituloError, this.descripcionError, true);
      this.notificacionService.emiteAdvertencia(this.notificacion);
      console.log(err);
      this.limpiarFormulario();
    });
  }

    pagar(pago: Pago) {
    pago.fechaPago = this.obtenerFechaActual();
    pago.valorPagado = pago.valorAdeudado;

    this.pagoService.actualizar(pago).subscribe(() => {
      this.notificacion = new Notificacion(this.tituloExito, this.pagoExitoso, true);
      this.notificacionService.emiteAdvertencia(this.notificacion);
    }, err => {
      this.notificacion = new Notificacion(this.tituloError, this.descripcionError, true);
      this.notificacionService.emiteAdvertencia(this.notificacion);
      console.log(err);
    });

  }

  limpiarFormulario() {
    this.verPagosPendientes = false;
    this.pagoForm.get('identificacion').setValue('');
  }

  obtenerFechaActual() {
    const date = new Date();
    const day = '' + date.getDate();
    const month = '' + (date.getMonth() + 1);
    const year = '' + date.getFullYear();
    let fechaActual = '';

    fechaActual = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return fechaActual;
  }
}
