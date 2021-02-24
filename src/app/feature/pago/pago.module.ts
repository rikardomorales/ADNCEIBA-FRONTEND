import { NgModule } from '@angular/core';

import { PagoRoutingModule } from './pago-routing.module';
import { ListarPagoComponent } from './components/listar-pago/listar-pago.component';
import { PagoComponent } from './components/pago/pago.component';
import { PagoService } from './shared/service/pago.service';

@NgModule({
  declarations: [ListarPagoComponent, PagoComponent],
  imports: [PagoRoutingModule],
  providers: [PagoService],
})
export class PagoModule {}
