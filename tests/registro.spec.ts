import { test, expect, request } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';
import TestData from '../data/testData.json';

let paginaRegistro: PaginaRegistro;

//se ejecuta antes de cada prueba (precondiciones)
test.beforeEach(async ({ page }) => {
  // usos comunes: 
  // 1. navegar a una pagna inicial del feature
  // 2. inicializar page objects
  // 3. autenticaciones de usuario
  // 4. limpiar local storage y cache

  paginaRegistro = new PaginaRegistro(page);
  await paginaRegistro.visitarPaginaRegistro();
});

test('TC1 - registro exitoso', async ({ page }) => {
  
  // paginaRegistro = new PaginaRegistro(page);
  
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

  // paginaRegistro = new PaginaRegistro(page); // x cada test case se debe crear una instancia de la clase PaginaRegistro

  await paginaRegistro.visitarPaginaRegistro();
  // await page.goto('http://localhost:3000/signup');
  await paginaRegistro.nombreInput.fill(TestData.usuarioValido.nombre); // hacer esto desde el archivo paginaRegistro.ts es lo mismo q buscarlo x role, aunque de esta forma queda mejor estructurado y mas limpio
  // await page.getByRole('textbox', { name: 'Nombre' }).fill("Facundo");
  await paginaRegistro.apellidoInput.fill(TestData.usuarioValido.apellido);
  // await page.getByRole('textbox', { name: 'Apellido' }).fill("Tobio");
  await paginaRegistro.emailInput.fill(TestData.usuarioValido.email);
  // await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('facundohectortobio@gmail.com');
  await paginaRegistro.contrasenaInput.fill(TestData.usuarioValido.contrasena);
  // await page.getByRole('textbox', { name: 'Contraseña' }).fill('olakomotyamas');
  await paginaRegistro.botonRegistrarse.click();
  // await page.getByTestId('boton-registrarse').click();
  await page.waitForTimeout(1500);
  await expect(paginaRegistro.page.getByText(paginaRegistro.mensajeDeEmailYaExiste)).toBeVisible();
  // await expect(page.getByText('Email already in use')).toBeVisible();
});

test('TC3 - verificar redireccionamiento al login despues de crear un usuario', async ({ page }) => {

  // paginaRegistro = new PaginaRegistro(page);
  
  const emailAleatorio = 'Facundo.tobio' + Math.floor(Math.random() * 1000) + '@gmail.com';

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario("Facundo", "Tobio", emailAleatorio, "123456");

  await page.waitForTimeout(1500);
  await expect(paginaRegistro.page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();
  await page.waitForTimeout(2000);
  await page.waitForURL('http://localhost:3000/login');
});

test('TC6 - verificar que podemos crear un usuario desde la API', async ({ page }) => {

  const emailAleatorio = 'Facundo.tobio' + Math.floor(Math.random() * 1000) + '@gmail.com';
  const email = (TestData.usuarioValido.email.split('@')[0] + emailAleatorio.split('@')[1]);
   // 1️⃣ Crear un contexto de request
   const apiContext = await request.newContext();
const response = await apiContext.post('http://localhost:6007/api/auth/signup', {
  headers: {
        'Content-Type': 'application/json'
      },
      data: {
        firstName: TestData.usuarioValido.nombre,
        lastName: TestData.usuarioValido.apellido,
        email: emailAleatorio,
        password: TestData.usuarioValido.contrasena
      }
})

  //guardamos la respuesta en una variable
   const responseBody = await response.json();
  const contentType = response.headers()['content-type'];

if (contentType && contentType.includes('application/json')) {
  const responseBody = await response.json();
  console.log(responseBody);
} else {
  const text = await response.text();
  console.error('Respuesta no JSON:', text);
}
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty('token');
  expect(responseBody).toHaveProperty('user');
  expect(typeof responseBody.token).toBe('string');
  expect(responseBody.user).toEqual( expect.objectContaining({
    id: expect.any(String),
    firstName: TestData.usuarioValido.nombre,
    lastName: TestData.usuarioValido.apellido,
    email: emailAleatorio
  }))
})

test('TC7 - verificar registro exitoso con datos validos verificando respuesta de la API', async ({ page }) => {
   await test.step('Completar el formulario de registro', async () => {
    const email = (TestData.usuarioValido.email.split('@')[0] + Math.floor(Math.random() * 1000) + '@' + TestData.usuarioValido.email.split('@')[1]);
    await paginaRegistro.completarFormularioRegistro(
      TestData.usuarioValido.nombre,
       TestData.usuarioValido.apellido,
        email,
         TestData.usuarioValido.contrasena);
    const mensajeDeCreacionDeCuenta = page.waitForResponse('**/api/auth/signup');
    await paginaRegistro.hacerClickEnBotonRegistrarse();
    const respuesta = await mensajeDeCreacionDeCuenta;
    const responseBody = await respuesta.json();

    expect(respuesta.status()).toBe(201);
    expect(responseBody).toHaveProperty('token');
    expect(typeof responseBody.token).toBe('string');
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user).toEqual( expect.objectContaining({
      id: expect.any(String),
      firstName: TestData.usuarioValido.nombre,
      lastName: TestData.usuarioValido.apellido,
      email: email
    }))

    await expect(paginaRegistro.page.getByText('Registro exitoso!')).toBeVisible();
   });
})