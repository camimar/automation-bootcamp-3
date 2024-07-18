describe('Casa Ideas - pruebas', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.acceptCookiesIfExists()
     //entrar directo al login en una prueba e iniciar sesion https://www.casaideas-mexico.mx/login
    });


it.only('TC-01: Acceso al sitio', () => {
  cy.url().should('eql', 'https://www.casaideas-mexico.mx/')
});


})