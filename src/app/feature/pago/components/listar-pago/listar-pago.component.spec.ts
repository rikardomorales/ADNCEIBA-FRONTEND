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
  const listaPagos: Pago[] = [new Pago('3' , '123456789' , 'FV-1984', '500000.00' , '0.00' , '2020-01-30' , ''),
                              new Pago('5' , '1111758458' , 'FV-1986' , '1000000.00' , '0.00' , '2020-02-28', '')];

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

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaPagos.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
