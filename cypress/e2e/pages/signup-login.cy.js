/// <reference types="cypress" />

import login  from '../components/login';
import signUpPage from '../components/registration-page';

describe('Casa Ideas - Login / Sign Up flows', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.acceptCookiesIfExists();
      cy.injectAxe();
      cy.checkA11y();
    });

    it('TC_01: User is able to access to the site', () => {
      cy.url().should('eql', 'https://www.casaideas-mexico.mx/')
    });

    it('TC_02: User is able to click in Login button', () => {
      //login.isLoginButtonVisibleEnabled();
      login.accessToLoginForm();
      cy.url().should('include', '/login');
    });

    it('TC_03: Valid sign up', () => {
      login.accessToSignUpForm();
      signUpPage.fillRegisterForm();
      signUpPage.agreeToTerms();
      signUpPage.submitSignUpForm();
      signUpPage.elements.getSuccessfulRegistrationMessage().should('be.visible');
    });

    it('TC_04: Invalid Sign Up : error message in fields when sending empty submit', () => {
      login.accessToSignUpForm();
      signUpPage.submitSignUpForm();
      cy.wait(1000);
      signUpPage.assertAllRequiredErrors();
    });

    it('TC_05: Invalid Sign Up : error message in fields when entry invalid data in specific fields', () => {
      login.accessToSignUpForm();
      signUpPage.enterInvalidData();
      signUpPage.agreeToTerms();
      signUpPage.submitSignUpForm();
      cy.wait(1000); 
      signUpPage.assertAllErrorFields();
    });

    it('TC_06: Valid Login: user is able to login successfully', () => {
      login.accessToLoginForm();
      login.validLogin();
      cy.url().should('eql', 'https://www.casaideas-mexico.mx/');
      login.clickHamburgerMenu();
      cy.get('.cx-login-greet').should('be.visible');
    });

    it('TC_07:Invalid Login: user is not able to access with wrong password', () => {
        login.accessToLoginForm();
        login.InvalidLogin();
        cy.get('.alert-danger').should('contain', 'Su nombre de usuario o contraseña es incorrecto.')
    });

})