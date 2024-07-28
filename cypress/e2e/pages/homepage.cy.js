/// <reference types="cypress" />

import login from '../components/login';

describe('Casa Ideas - Homepage test suite', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.acceptCookiesIfExists();
      login.loginReturningUser();
    });


})