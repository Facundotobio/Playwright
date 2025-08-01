import {Page, Locator, expect} from '@playwright/test';

// definimos la clase PaginaLogin
export class PaginaDashboard {
    // definimos los localizadores que vamos a usar
    readonly page: Page;    // siempre necesitamos el page para interactuar con la pagina del navegador
    readonly botonCrearCuenta: Locator;

    // constructor de la clase
    constructor (page: Page){
        this.page = page;
        this.botonCrearCuenta = page.getByTestId('tarjeta-agregar-cuenta');
    }

    async visitar(){
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('domcontentloaded');
    }
}