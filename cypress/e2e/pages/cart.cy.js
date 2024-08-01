import Cart from '../components/cart.js'

describe('Casa Ideas - pruebas', () => {

    const cart = new Cart();

    beforeEach(() => {
      cy.visit('/categoria/raiz/jardin-espacio')
      cy.acceptCookiesIfExists()
    });


    it('TC_15: User is able to add product to cart', () => {
      cart.addProductToCart();
      cart.verifyProductIsInCart();
    });

    it('TC_16: Product Quantity: User is able to Increase Product Quantity in cart', () => {
      cart.addProductToCart();
      cart.increaseProductQuantity(4);
      cart.verifyProductQuantity(5);
    });

    it('TC_16-1: Product Quantity: User is able to decrease Product Quantity in car', () => {
        cart.addProductToCart();
        cart.increaseProductQuantity(2); 
        cart.verifyProductQuantity(3);
        cart.decreaseProductQuantity(2); 
        cart.verifyProductQuantity(1);
    });


});