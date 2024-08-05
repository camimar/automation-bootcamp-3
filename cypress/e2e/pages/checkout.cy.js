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
    checkout.completeAdressCheckoutForm();
    checkout.continueCheckoutProcess();
    //TODO assert
  });

  //TODO

  it('TC_18-1: User is not able to Continue without completing Address form fields in Checkout Screen', () => {
    
  });

  it('TC_18-2: User is able to click on "Volver al Carrito" button, for getting back to cart', () => {
    
  });

  it('TC_19: Checkout: User is able to select shipping method ', () => {
    
  });

})