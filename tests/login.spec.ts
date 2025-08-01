import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';

let paginaLogin: PaginaLogin;

test('TC4 - login exitoso', async ({ page }) => {
  
    paginaLogin = new PaginaLogin(page);

    await paginaLogin.visitarPaginaLogin();
    await paginaLogin.logueoExitoso('facundohectortobio@gmail.com', 'olakomotyamas');
    await page.waitForTimeout(1500);
    await expect(paginaLogin.page.getByText(paginaLogin.loginExitoso)).toBeVisible();
});