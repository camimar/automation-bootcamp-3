/// <reference types="cypress" />

import login from "../components/login";

describe('Casa Ideas: Accesibility tests with Axe Core', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.acceptCookiesIfExists();
        cy.injectAxe();
        //incluir console.logs asi se ven los errores 
        //agregar en el README que este tipo de prueba conviene correrlas por consola para saber de 
        //qué errores se trata
    });

    it('Home page should have no detectable a11y violations on load', () => {
        cy.checkA11y(); 
    });
    
    it('Has no detectable a11y violations in Navigation menu', () => {
        cy.get('cx-hamburger-menu').click();
        cy.checkA11y('cx-hamburger-menu', {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa'], // tal vez dejar el nivel básico
          },
        });
    });

    it('Has no detectable a11y violations in searchBox', () => {
      cy.checkA11y('cx-searchbox',{
        runOnly: {
          type: 'tag',
          values: ['wcag2a'], 
        },
      });
    });

    it('Performs a11y test within a user flow', () => {
      login.clickHamburgerMenu();
      //cy.contains('PRODUCTOS').click() // Haz clic en la primera categoría
      cy.contains('span', 'Productos').click();
      cy.contains('span', 'VER TODO').should('be.visible').click();
      cy.get('cx-product-list').should('be.visible');
      cy.checkA11y('cx-product-list', {
        runOnly: {
          type: 'tag',
          values: ['wcag2a'], // Solo verifica el nivel A
        },
      });
    });
      // Más pruebas para otras partes de la página...
      // Si tengo tiempo > Desglosar por elementos del Homepage y luego hacer otro archivo para productos
      //    y colocar en una carpeta
      // Si NO tengo tiempo > solo agregar algunas generales más del homepage
      

});
