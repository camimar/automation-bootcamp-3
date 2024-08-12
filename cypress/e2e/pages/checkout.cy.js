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

  it('TC_19: Checkout: User is able to see shipping method options', () => {
    login.loginReturningUser();
    cart.fullPurchaseFlow();
    checkout.continueCheckoutProcess();
    checkout.verifyShippingMethodIsSelected();
    cy.url().should('contain', '/delivery-mode');
  });

  it('TC_20: Checkout: User is able to select payment method', () => {
    login.loginReturningUser();
    cart.fullPurchaseFlow();
    checkout.continueCheckoutProcess();
    cy.wait(1000);
    checkout.continueCheckoutProcess();
    checkout.verifyPaymentMethodElements();
    checkout.verifyCardPaymentElements();
  });

  it('TC_21: Checkout: User is able to fill and verify payment information', () => {
    login.loginReturningUser();
    cart.fullPurchaseFlow();
    checkout.continueCheckoutProcess();
    cy.wait(1000);
    checkout.continueCheckoutProcess();
    checkout.elements.getCardNameInput().type('Pepita Perez');
    checkout.elements.getCardNumberInput().type('12345678990000');
    checkout.selectValidoHasta('03', '2025');
    checkout.selectPaymentType();
    checkout.getCVVInput().type('099');
    checkout.elements.getCardNameInput().should('have.value', 'Pepita Perez');
    checkout.elements.getCardNumberInput().should('have.value', '12345678990000');
    checkout.verifyValidoHasta('03', '2025');
    checkout.verifyPaymentType('American Express');
    checkout.getCVVInput().should('have.value', '099');
  
    checkout.continueCheckoutProcess();
  });
})