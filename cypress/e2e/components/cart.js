class Cart {

	  elements = {

        getAddToCartButton: () => cy.contains('button', ' Agregar al carro '),
        getCartIcon: () => cy.get('cx-icon.cart'),
        getCartModal: () => cy.get('.CartSidebarView'),
        getCartItem: () => cy.get('.ci-cart-item'),
        getIncreaseQuantityButton: () => cy.get('button[aria-label="Add one more"]'),
        getQuantityInput: () => cy.get('input[aria-label="Quantity"]'),
        getDecreaseQuantityButton: () => cy.get('button[aria-label="Remove one"]'),

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

  increaseProductQuantity(times) {
    for (let i = 0; i < times; i++) {
      this.elements.getIncreaseQuantityButton(cy.wait(500)).click();
    }
  }

  verifyProductQuantity(expectedQuantity) {
    this.elements.getQuantityInput().should('have.value', expectedQuantity.toString());
  }

  decreaseProductQuantity(times) {
    for (let i = 0; i < times; i++) {
      this.elements.getDecreaseQuantityButton().click().wait(500); 
    }
  }


}

export default Cart;