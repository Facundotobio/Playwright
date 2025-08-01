import {Page, Locator, expect} from '@playwright/test';

// definimos la clase PaginaLogin
export class PaginaLogin {
    // definimos los localizadores que vamos a usar
    readonly page: Page;    // siempre necesitamos el page para interactuar con la pagina del navegador
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonIniciarSesion: Locator;
    readonly linkRegistrarse: Locator;
    readonly botonCrearCuenta: Locator;

    readonly loginExitoso : string;

    // constructor de la clase
    constructor (page: Page){
        // asignamos el page a la propiedad de la clase
        this.page = page;
        // definimos el localizador para el input de nombre, apellido, email, etc
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.contrasenaInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.botonIniciarSesion = page.getByTestId('boton-login');
        this.linkRegistrarse = page.getByTestId('link-registrarse-login');
        this.botonCrearCuenta = page.getByTestId('boton-signup-header');

        // definimos las variables de tipo texto
        this.loginExitoso = 'Inicio de sesión exitoso';
    }

    async visitarPaginaLogin(){
        await this.page.goto('http://localhost:3000/login');
         await this.page.waitForLoadState('domcontentloaded'); 
    }

    async completarFormularioLogin(email: string, contrasena: string){
        await this.emailInput.fill(email);
        await this.contrasenaInput.fill(contrasena);
    }
    
    async hacerClickBotonLogin(){
        await this.botonIniciarSesion.click();
    }

    async logueoExitoso(email: string, contrasena: string){
        await this.completarFormularioLogin(email, contrasena);
        await this.hacerClickBotonLogin();
        await expect(this.page.getByText(this.loginExitoso)).toBeVisible();
    }
}