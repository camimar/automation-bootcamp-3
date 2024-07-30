/// <reference types="cypress" />
const chai = require('chai');

import login from '../components/login';
import HomePage from '../components/homepage';

describe('Casa Ideas - Homepage test suite', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.acceptCookiesIfExists();
    });


    it('TC_08: Navbar Verification: user is able to see Navbar elements', () => {
      const homePage = new HomePage();
      login.elements.getHamburgerMenu().should('be.visible');
      homePage.verifyNavbarElementsAreVisible();
    });

    //TODO TC for Categories Dropdown functionality

    it('TC_09: User is able to Access to Categories Link and visualize all product categories', () => {
      const homePage = new HomePage()
      login.clickHamburgerMenu();
      homePage.elements.getCategoriesLink().should('be.visible').click();
      homePage.verifyAllCategoriesAreVisible();
    });



})