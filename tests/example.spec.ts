import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginaRegistro;

test('TC1 - registro exitoso', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  
  const emailAleatorio = 'Facundo.tobio' + Math.floor(Math.random() * 1000) + '@gmail.com';

  await page.goto('http://localhost:3000/signup');
  await paginaRegistro.nombreInput.fill("Facundo"); // har esto desde la pagina registro es lo mismo q buscarlo x role
  await page.getByRole('textbox', { name: 'Apellido' }).fill("Tobio"); // aunque de esta forma queda mejor estructurado
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill(emailAleatorio);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible();
});

test('TC2 - registro no exitoso, mail existente', async ({ page }) => {
 
  await page.goto('http://localhost:3000/signup');
  await page.getByRole('textbox', { name: 'Nombre' }).fill("Facundo");
  await page.getByRole('textbox', { name: 'Apellido' }).fill("Tobio");
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('facundohectortobio@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('olakomotyamas');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  
});
