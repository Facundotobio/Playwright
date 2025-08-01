import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginaRegistro;

test('TC1 - registro exitoso', async ({ page }) => {
  
  paginaRegistro = new PaginaRegistro(page);
  
  const emailAleatorio = 'Facundo.tobio' + Math.floor(Math.random() * 1000) + '@gmail.com';

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario("Facundo", "Tobio", emailAleatorio, "123456");

  // await paginaRegistro.hacerClickEnBotonRegistrarse(); // esto es lo mismo q las 2 lineas de abajo.
  // await page.getByTestId('boton-registrarse').click();
  // await paginaRegistro.botonRegistrarse.click();

  await expect(paginaRegistro.page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();
  // await expect(page.getByText('Registro exitoso!')).toBeVisible(); 
});

test('TC2 - registro no exitoso, mail existente', async ({ page }) => {

  paginaRegistro = new PaginaRegistro(page); // x cada test case se debe crear una instancia de la clase PaginaRegistro

  await paginaRegistro.visitarPaginaRegistro();
  // await page.goto('http://localhost:3000/signup');
  await paginaRegistro.nombreInput.fill("Facundo"); // hacer esto desde el archivo paginaRegistro.ts es lo mismo q buscarlo x role, aunque de esta forma queda mejor estructurado y mas limpio
  // await page.getByRole('textbox', { name: 'Nombre' }).fill("Facundo");
  await paginaRegistro.apellidoInput.fill("Tobio");
  // await page.getByRole('textbox', { name: 'Apellido' }).fill("Tobio");
  await paginaRegistro.emailInput.fill('facundohectortobio@gmail.com');
  // await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('facundohectortobio@gmail.com');
  await paginaRegistro.contrasenaInput.fill('olakomotyamas');
  // await page.getByRole('textbox', { name: 'Contraseña' }).fill('olakomotyamas');
  await paginaRegistro.botonRegistrarse.click();
  // await page.getByTestId('boton-registrarse').click();
  await page.waitForTimeout(1500);
  await expect(paginaRegistro.page.getByText(paginaRegistro.mensajeDeEmailYaExiste)).toBeVisible();
  // await expect(page.getByText('Email already in use')).toBeVisible();
});

test('TC3 - verificar redireccionamiento al login despues de crear un usuario', async ({ page }) => {

  paginaRegistro = new PaginaRegistro(page);
  
  const emailAleatorio = 'Facundo.tobio' + Math.floor(Math.random() * 1000) + '@gmail.com';

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario("Facundo", "Tobio", emailAleatorio, "123456");

  await page.waitForTimeout(1500);
  await expect(paginaRegistro.page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();
  await page.waitForTimeout(2000);
  await page.waitForURL('http://localhost:3000/login');
});
