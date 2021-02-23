import { by, element } from 'protractor';

export class PagoPage {
    private consultarPagoPendiente = element(by.id('btnConsultar')); 
    private inputIdentificacion = element(by.id('txtIdentificacion')); 
    private listaPagos = element.all(by.className('btnPagar')); 
 
    async ingresartxtIdentificacion(identificacion:any) {
        await this.inputIdentificacion.sendKeys(identificacion);
    }
 
    async clickBotonConsultarPagoPendiente() {
        await this.consultarPagoPendiente.click();
    }
 
    async contarPagos() {
        return this.listaPagos.count();
    }
}
