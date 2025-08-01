import {Page, Locator, expect} from '@playwright/test';

// definimos la clase PaginaLogin
export class ModalCrearCuenta {
    // definimos los localizadores que vamos a usar
    readonly page: Page;    // siempre necesitamos el page para interactuar con la pagina del navegador
    readonly tipoDeCuentaCombobox: Locator;
    readonly opcionDebito: Locator;
    readonly montoInicialInput: Locator;
    readonly botonCrearCuenta: Locator;

    readonly cuentaCreadaExitosamente: string;

    // constructor de la clase
    constructor (page: Page){
        this.page = page;
        this.tipoDeCuentaCombobox = page.getByRole('combobox', { name: 'Tipo de cuenta *' });
        this.opcionDebito = page.getByRole('option', { name: 'Débito' });
        this.montoInicialInput = page.getByRole('spinbutton', { name: 'Monto inicial *' });
        this.botonCrearCuenta = page.getByTestId('boton-crear-cuenta');

        this.cuentaCreadaExitosamente = '¡Cuenta creada exitosamente!';
    }

    async visitar(){
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('domcontentloaded');
    }
}