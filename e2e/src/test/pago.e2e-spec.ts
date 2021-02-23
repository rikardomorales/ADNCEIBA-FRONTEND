import { browser, logging } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { PagoPage } from '../page/pago/pago.po';

describe('workspace-project Pago', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let pago: PagoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        pago = new PagoPage();
    });

    it('Deberia consultar Pago', () => {
        navBar.clickBotonPagos();
        const IDENTIFICACION = '123456789';
        
        page.navigateTo();
        pago.ingresartxtIdentificacion(IDENTIFICACION);
        pago.clickBotonConsultarPagoPendiente();

        expect(2).toBe(pago.contarPagos()); 
    });
 
});
