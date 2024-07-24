import login, { isLoginButtonVisibleEnabled } from '../components/login';
import signUpPage from '../components/registration-page';

describe('Casa Ideas - Homepage test suite', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.acceptCookiesIfExists();
     // en pruebas de Homepage entrar directo al login en una prueba e iniciar sesion https://www.casaideas-mexico.mx/login
    });

    it('TC_01: User is able to access to the site', () => {
      cy.url().should('eql', 'https://www.casaideas-mexico.mx/')
    });

    it('TC_02: User is able to click in Login button', () => {
      //login.isLoginButtonVisibleEnabled();
      login.clickHamburgerMenu();
      login.clickLoginButton();
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

})