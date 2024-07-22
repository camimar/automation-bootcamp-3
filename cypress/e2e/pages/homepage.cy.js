import login, { isLoginButtonVisibleEnabled } from '../components/login';
import signUpPage from '../components/registration-page';

describe('Casa Ideas - Homepage test suite', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
      cy.visit('/');
      cy.acceptCookiesIfExists();
     //entrar directo al login en una prueba e iniciar sesion https://www.casaideas-mexico.mx/login
    });

    it('TC_01: User is able to access to the site', () => {
      cy.url().should('eql', 'https://www.casaideas-mexico.mx/')
    });

    it('TC_02: User is able to click in Login button', () => {
      login.isLoginButtonVisibleEnabled();
      login.clickLoginButton();
      cy.url().should('include', '/login');
    });

    it.only('TC_03: Valid sign up', () => {
      login.clickLoginButton();
      login.clickSignUpButton();
      signUpPage.fillRegisterForm();
      signUpPage.agreeToTerms();
      signUpPage.submitSignUpForm();
      signUpPage.elements.getSuccessfulRegistrationMessage().should('be.visible');
    });

})