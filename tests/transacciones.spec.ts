import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaDashboard } from '../pages/paginaDashboard';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';
import { ModalEnviarTransaccion } from '../pages/modalEnviarTransaccion';

let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;
let modalCrearCuenta: ModalCrearCuenta;
let modalEnviarTransaccion: ModalEnviarTransaccion;

const testUsuarioEnvia = test.extend({
    storageState: require.resolve('../playwright/.auth/ususarioEnvia.json')
});

const testUsuarioRecibe = test.extend({
  storageState: require.resolve('../playwright/.auth/ususarioRecibe.json')
});

test.beforeEach(async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  modalCrearCuenta = new ModalCrearCuenta(page);
  modalEnviarTransaccion = new ModalEnviarTransaccion(page);
  // await paginaLogin.visitarPaginaLogin();
  await paginaDashboard.visitar();
  
});

// ****************** eliminar cuentas manualmente, solo se puede tener 4
// test('TC5 - verificar que el cliente pueda crear una cuenta exitosamente', async ({ page }) => {
//     // await paginaLogin.visitarPaginaLogin();
//     await paginaLogin.logueoExitoso('facundohectortobio@gmail.com', 'olakomotyamas');
//     await page.waitForURL('http://localhost:3000/dashboard');
//     await paginaDashboard.botonCrearCuenta.click();
//     await modalCrearCuenta.tipoDeCuentaCombobox.click();
//     await modalCrearCuenta.opcionDebito.click();
//     await page.waitForTimeout(5000);
//     await modalCrearCuenta.montoInicialInput.fill('150');
//     await page.waitForTimeout(5000);
//     await modalCrearCuenta.botonCrearCuenta.click();
//     await page.waitForTimeout(1500);
//     await expect(page.getByText(modalCrearCuenta.cuentaCreadaExitosamente)).toBeVisible();
// });

testUsuarioEnvia('TC8 - verificar que el usuario pueda enviar dinero a otro usuario', async ({ page }) => {
    await expect(paginaDashboard.tituloDePagina).toHaveText('Tablero Principal');
    await paginaDashboard.botonEnviarDinero.click();
    await modalEnviarTransaccion.completarYEnviarTransferencia('usuariorecibe@dinero.com', '150');
    await page.waitForTimeout(3000);
});

testUsuarioRecibe('TC9 - verificar que el usuario receptor pueda recibir dinero en su cuenta', async ({ page }) => {
    await expect(paginaDashboard.tituloDePagina).toBeVisible();
    await expect(page.getByText('Transferencia de').first()).toContainText('facundohectortobio');
});