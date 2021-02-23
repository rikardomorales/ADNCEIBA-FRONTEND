import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  const listaPagos: Pago[] = [new Pago('1' , '123456789' , 'FV-1982', '500000.00' , '0.00' , '2020-01-30' , ''),
                              new Pago('2' , '1111758458' , 'FV-1983' , '1000000.00' , '0.00' , '2020-02-28', ''),
                              new Pago('3' , '1111758458' , 'FV-1984' , '350000.00' , '0.00' , '2020-02-28', '')];
  
  const IDENTIFICACION_TEST = '1111758458';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPagoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [PagoService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPagoComponent);
    component = fixture.componentInstance;
    pagoService = TestBed.inject(PagoService);
    spyOn(pagoService, 'consultar').and.returnValue(of(listaPagos));
    fixture.detectChanges();
  });
 
it('validacion identificacion vacia', () => {
    expect(component).toBeTruthy();
    component.identificacion = '';
    component.consultarPago();
    
    expect(0).toBe(component.listaSeleccionados.length);
  });


  it('validacion consulta', () => {
    expect(component).toBeTruthy();
    component.identificacion = IDENTIFICACION_TEST;
    
    component.consultarPago();
    component.pagar(component.listaSeleccionados[0]);

    expect(0).toBe(component.listaSeleccionados.length);
});

});
