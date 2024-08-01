class Cart {

	elements = {

	   	getAddToCartButton: () => cy.contains('button', ' Agregar al carro '),
        getCartIcon: () => cy.get('cx-icon.cart'),
		getCartModal: () => cy.get('.CartSidebarView'),
		getCartItem: () => cy.get('.ci-cart-item')

}

    addProductToCart() {
        cy.contains('Carretilla de Metal').scrollIntoView().should('be.visible').parents('ci-product-card').within(() => {
        cy.wait(1000); 
        this.elements.getAddToCartButton().click({force: true});
        });
    }

  verifyProductIsInCart(){
    this.elements.getCartModal().should('be.visible');
    this.elements.getCartItem().contains('Carretilla de Metal').should('be.visible');
  }

}

export default Cart;