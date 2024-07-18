describe('Casa Ideas - pruebas', () => {

    beforeEach(() => {
      cy.visit('/')
      //cy.url().should('contain', spacesNewYork)
      cy.acceptCookiesIfExists()
     //entrar directo al login en una prueba e iniciar sesion https://www.casaideas-mexico.mx/login
    });


 
      it(' TC_04 Registro inválido: email ya existente', () => {
        // Visita la página de registro
        cy.visit('/registro');
    
        // Rellena el formulario con un correo ya registrado
        cy.get('input[name="email"]').type('correo@existente.com');
        cy.get('input[name="password"]').type('contraseña');
        cy.get('input[name="confirm_password"]').type('contraseña');
    
        // Asume que hay un botón de registro y haz clic en él
        cy.get('button[type="submit"]').click();
    
        // Espera a que aparezca el mensaje de error y verifica su contenido
        cy.get('.alert.alert-danger').should('be.visible')
          .and('contain', 'El correo ya se encuentra registrado');
      });


});
