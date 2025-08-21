import {Page, Locator, expect} from '@playwright/test';

export class ModalEnviarTransaccion {
    // definimos los localizadores que vamos a usar
    readonly page: Page;
    readonly emailDestinatarioInput: Locator;
    readonly cuentaOrigenCombobox: Locator;
    readonly montoInput: Locator;
    readonly botonEnviar: Locator;
    readonly botonCancelar: Locator;
    readonly tipoDeCuentaOption: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.emailDestinatarioInput = page.getByRole('textbox', { name: 'Email del destinatario *' });
        this.cuentaOrigenCombobox = page.getByRole('combobox', { name: 'Cuenta origen *' });
        this.montoInput = page.getByRole('spinbutton', { name: 'Monto a enviar *' });
        this.botonEnviar = page.getByRole('button', { name: 'Enviar' });
        this.botonCancelar = page.getByRole('button', { name: 'Cancelar' });
        this.tipoDeCuentaOption = page.getByRole('option', { name: 'Débito' });
        this.tipoDeCuentaOption = page.getByRole('option', { name: '••••' });
    }

    async completarYEnviarTransferencia(emailDestinatario: string, monto: string){
        await this.emailDestinatarioInput.fill(emailDestinatario);
        await this.cuentaOrigenCombobox.click();
        await this.tipoDeCuentaOption.click();
        await this.montoInput.fill(monto);
        await this.botonEnviar.click();
        await expect(this.page.getByText('Transferencia enviada a ' + emailDestinatario)).toBeVisible();
    }    
}