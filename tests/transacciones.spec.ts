import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaDashboard } from '../pages/paginaDashboard';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';

let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;
let modalCrearCuenta: ModalCrearCuenta;

test.beforeEach(async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  modalCrearCuenta = new ModalCrearCuenta(page);
  await paginaLogin.visitarPaginaLogin();
  
});

test('TC5 - verificar que el cliente pueda crear una cuenta exitosamente', async ({ page }) => {
  
    await paginaLogin.logueoExitoso('facundohectortobio@gmail.com', 'olakomotyamas');
    await page.waitForURL('http://localhost:3000/dashboard');
    await paginaDashboard.botonCrearCuenta.click();
    await modalCrearCuenta.tipoDeCuentaCombobox.click();
    await modalCrearCuenta.opcionDebito.click();
    await page.waitForTimeout(5000);
    await modalCrearCuenta.montoInicialInput.fill('150');
    await page.waitForTimeout(5000);
    await modalCrearCuenta.botonCrearCuenta.click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(modalCrearCuenta.cuentaCreadaExitosamente)).toBeVisible();
});