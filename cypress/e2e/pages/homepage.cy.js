/// <reference types="cypress" />
const chai = require('chai');

import login from '../components/login';
import HomePage from '../components/homepage';

describe('Casa Ideas - Homepage test suite', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.acceptCookiesIfExists();
      login.loginReturningUser();
    });


    it('TC_08: Navbar Verification: user is able to see Navbar elements', () => {
      const homePage = new HomePage();
      login.elements.getHamburgerMenu().should('be.visible');
      homePage.verifyNavbarElementsAreVisible();
    });

    it('', () => {
      
    });
})