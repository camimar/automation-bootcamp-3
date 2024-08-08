import Cart from '../components/cart.js'
import login from '../components/login.js'
import Checkout from '../components/checkout.js';

describe('Casa Ideas - Checkout testing flows', () => {

  const cart = new Cart();
  const checkout = new Checkout();

beforeEach(() => {
    cy.visit('/categoria/raiz/jardin-espacio')
    cy.acceptCookiesIfExists()
  });

  it('TC_18: Checkout: User is able to add New address in Checkout form', () => {
    login.loginReturningUser();
    cart.fullPurchaseFlow();
    cy.url().should('contain', '/shipping-address');
    checkout.elements.getAgregarNuevaDireccion().click();
    checkout.completeAdressCheckoutForm();
    cy.wait(1000);
    checkout.elements.getEstadoField().should('have.value', 'Yucatán');
    checkout.elements.getAlcaldiaField().should('have.value', 'Mérida');
    checkout.selectAndVerifyColoniaField();
    checkout.continueCheckoutProcess();
    cy.url().should('contain', '/delivery-mode');
  });


  it('TC_18-1: User is not able to Continue without completing Address form fields in Checkout Screen', () => {
    login.loginReturningUser();
    cart.fullPurchaseFlow();
    cy.url().should('contain', '/shipping-address');
    checkout.elements.getAgregarNuevaDireccion().click();
    checkout.continueCheckoutProcess();
    checkout.verifyRequiredFieldsErrors();
    cy.url().should('contain', '/shipping-address');
  });

  it('TC_19: Checkout: User is able to select shipping method ', () => {
    
  });

  it('TC_20: Checkout: User is able to select payment method ', () => {
    
  });

})