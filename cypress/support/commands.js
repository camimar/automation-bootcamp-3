// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.Commands.add("getIfExists", (selector) => {
  cy.document().then(($document) => {
    const documentResult = $document.querySelectorAll(selector)
    if (documentResult.length) {
      return cy.get(selector)
    }

    return null
  })
})

Cypress.Commands.add('acceptCookiesIfExists', () => {
  cy.wait(4000)
  cy.getIfExists('[class="btn btn-block btn-primary w-auto"]').then(element => {
    if (element != null) {
      cy.log('Found the Accept cookies button, will click it');
      cy.get('[class="btn btn-block btn-primary w-auto"]').contains('Aceptar Cookies').click({force: true});
    } else {
      cy.log('Didnt found the Accept cookies button');
    }
  });


})