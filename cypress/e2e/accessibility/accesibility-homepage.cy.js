/// <reference types="cypress" />

import login from "../components/login";

describe('Casa Ideas: Accesibility tests with Axe Core', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.acceptCookiesIfExists();
        cy.injectAxe();
    });

    it('Home page should have no detectable a11y violations on load', () => {
        cy.checkA11y(); 
    });
    
    it('Has no detectable a11y violations in Navigation menu', () => {
        cy.get('cx-hamburger-menu').click();
        cy.checkA11y('cx-hamburger-menu', {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa'],
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
      cy.contains('span', 'Productos').click();
      cy.contains('span', 'VER TODO').should('be.visible').click();
      cy.get('cx-product-list').should('be.visible');
      cy.checkA11y('cx-product-list', {
        runOnly: {
          type: 'tag',
          values: ['wcag2a'], 
        },
      });
    });
      //TODO add more tests
      

});
