import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListarPagoComponent } from './listar-pago.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PagoService } from '../../shared/service/pago.service';
import { Pago } from '../../shared/model/pago';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListarPagoComponent', () => {
  let component: ListarPagoComponent;
  let fixture: ComponentFixture<ListarPagoComponent>;
  let pagoService: PagoService;
  const listaPagos: Pago[] = [new Pago('1', '123456789', 'FV-1982', '500000.00', '0.00', '2020-01-30', ''),
  new Pago('2', '1111758458', 'FV-1983', '1000000.00', '0.00', '2020-02-28', ''),
  new Pago('3', '1111758458', 'FV-1984', '350000.00', '0.00', '2020-02-28', '')];
  const IDENTIFICACION_TEST = '1111758458';
  const pagoTest = new Pago('3', '1111758458', 'FV-1984', '350000.00', '0.00', '2020-02-28', '');
  const exitoso = true;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPagoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [PagoService, HttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarPagoComponent);
    pagoService = TestBed.inject(PagoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería llamarse el servicio que lista los pagos', () => {
    // Arrange
    const spy = spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    component.ngOnInit();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('Deberia listar correctamente los pagos desde el servicio', () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    component.ngOnInit();
    // Assert
    expect(listaPagos).toBe(component.listaLocalPagos);
  });

  it('No deberia seleccionar pagos', async () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    component.ngOnInit();
    component.pagoForm.get('identificacion').setValue('');
    component.consultarPago();
    // Assert
    expect(0).toBe(component.listaSeleccionados.length);
  });

  it('Deberia encontrar pagos', async () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    component.construirFormulario();
    component.pagoForm.get('identificacion').setValue('1111758458');
    component.consultarPago();
    // Assert
    expect(true).toEqual(component.verPagosPendientes);
  });

  it('no deberia encontrar pagos', async () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    component.ngOnInit();
    component.pagoForm.get('identificacion').setValue('654987');
    component.consultarPago();
    // Assert
    expect(false).toEqual(component.verPagosPendientes);
  });

  it('validacion consulta', () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    spyOn(pagoService, 'actualizar').and.returnValue(
      of(exitoso)
    );
    component.pagoForm.get('identificacion').setValue(IDENTIFICACION_TEST);
    // Act
    component.ngOnInit();
    pagoService.actualizar(pagoTest);
    component.pagar(pagoTest);
    // Assert
    expect(exitoso).toEqual(component.exitoso);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

});
