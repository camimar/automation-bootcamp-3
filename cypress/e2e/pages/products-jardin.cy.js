import login from '../components/login.js'
import products from '../components/products.js';

describe('Casa Ideas - pruebas', () => {

    beforeEach(() => {
      cy.visit('/categoria/raiz/jardin-espacio')
      cy.acceptCookiesIfExists()
      login.loginReturningUser()
    });

    it('TC_11: Verify product cards: user is able to see each cards price and image', () => {
    products.verifyProductCardElements();
    products.logProductNamesAndCount();
    });

});
