import Cart from '../components/cart.js'

describe('Casa Ideas - pruebas', () => {

    const cart = new Cart();

    beforeEach(() => {
      cy.visit('/categoria/raiz/jardin-espacio')
      cy.acceptCookiesIfExists()
    });


    it.only('TC_15: User is able to add product to cart', () => {
        cart.addProductToCart();
        cart.verifyProductIsInCart();
    });

});