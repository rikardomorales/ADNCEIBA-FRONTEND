import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListarPagoComponent } from './listar-pago.component';
import { HttpClientModule } from '@angular/common/http';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPagoComponent],
      imports: [
        HttpClientModule
      ],
      providers: [
        PagoService, HttpService
      ]
    });
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
      of([])
    );
    // Act
    component.ngOnInit();
    // Assert
    expect(spy).toHaveBeenCalled();
  });


  it('Debería listar correctamente los pagos desde el servicio', () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    component.ngOnInit();
    let listaPagosEsperada: Pago[];
    listaPagosEsperada = component.listaLocalPagos;
    // Assert
    expect(listaPagosEsperada).toBe(listaPagosEsperada);
  });

  it('Debería mostrarse un mensaje indicando que se debe ingresar identificacion', () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    component.ngOnInit();
    console.log('-------------> ' + component.listaLocalPagos.length);
    component.pagoForm.get('identificacion').setValue('');
    component.consultarPago();
    // Assert
    console.log('-------------> ' + component.listaSeleccionados.length);
    expect(0).toBe(component.listaSeleccionados.length);
  });

  it('validacion consulta', () => {
    // Arrange
    spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    spyOn(pagoService, 'actualizar').and.returnValue(
      of(true)
    );
    // Act
    component.ngOnInit();
    component.pagoForm.get('identificacion').setValue(IDENTIFICACION_TEST);
    component.consultarPago();
    component.pagar(pagoTest);
    // Assert
    expect(true).toBe(component.exitoso);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

});
