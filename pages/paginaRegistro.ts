import {Page, Locator, expect} from '@playwright/test';

// definimos la clase PaginaRegistro
export class PaginaRegistro {
    // definimos los localizadores que vamos a usar
    readonly page: Page;    // siempre necesitamos el page para interactuar con la pagina del navegador
    readonly nombreInput: Locator;
    readonly apellidoInput: Locator;
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonRegistrarse: Locator;
    readonly botonIniciarSesion: Locator;
    // variables de tipo texto
    readonly mensajeDeCreacionDeCuenta: string;
    readonly mensajeDeEmailYaExiste: string;

    // constructor de la clase
    constructor (page: Page){
        // asignamos el page a la propiedad de la clase
        this.page = page;

        // definimos el localizador para el input de nombre, apellido, email, etc
        this.nombreInput = page.getByRole('textbox', { name: 'Nombre' });
        this.apellidoInput = page.locator('[name="lastName"]');
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.contrasenaInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.botonRegistrarse = page.getByTestId('boton-registrarse');
        this.botonIniciarSesion = page.getByRole('button', { name: 'Iniciar sesión' });

        // definimos las variables de tipo texto
        this.mensajeDeCreacionDeCuenta = 'Registro exitoso!';
        this.mensajeDeEmailYaExiste = 'Email already in use';
    }

    // metodo para visitar la pagina de registro
    async visitarPaginaRegistro(){
        await this.page.goto('http://localhost:3000/signup');
        // await this.page.waitForLoadState('domcontentloaded'); // esto es para esperar a que la pagina cargue completamente todos los elementos de la web
    }

    async completarFormularioRegistro(nombre: string, apellido: string, email: string, contrasena: string){
        await this.nombreInput.fill(nombre);
        await this.apellidoInput.fill(apellido);
        await this.emailInput.fill(email);
        await this.contrasenaInput.fill(contrasena);
    }

    async hacerClickEnBotonRegistrarse(){
        await this.botonRegistrarse.click();
    }

    async registrarUsuario(nombre: string, apellido: string, email: string, contrasena: string){
        await this.completarFormularioRegistro(nombre, apellido, email, contrasena);
        await this.hacerClickEnBotonRegistrarse();
        await expect(this.page.getByText(this.mensajeDeCreacionDeCuenta)).toBeVisible();
    }
}