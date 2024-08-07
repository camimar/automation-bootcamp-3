class Cart {

	  elements = {

        getAddToCartButton: () => cy.contains('button', ' Agregar al carro '),
        getCartIcon: () => cy.get('cx-icon.cart'),
        getCartModal: () => cy.get('.CartSidebarView'),
        getCartItem: () => cy.get('.ci-cart-item'),
        getIncreaseQuantityButton: () => cy.get('button[aria-label="Add one more"]'),
        getQuantityInput: () => cy.get('input[aria-label="Quantity"]'),
        getDecreaseQuantityButton: () => cy.get('button[aria-label="Remove one"]'),
        getOrderSummary: () => cy.get('ci-order-summary'),
        getSubtotalValue: () => cy.get('ci-order-summary .cart-totals .row .value').first(),
        getTotalValue: () => cy.get('ci-order-summary .cart-totals .row.total .value'),
        getDiscountedPrice: () => cy.get('.price-discount'),
        getPrice: () => cy.get('.cx-price'),
        getCheckoutButton: () => cy.get('ci-order-summary button.btn-primary'),
        getCheckOutScreen: () => cy.get('cx-checkout-progress-mobile-top')
}

  addProductToCart() {
    cy.contains('Balde de metal infantil').scrollIntoView(cy.wait(1000)).should('be.visible').parents('ci-product-card').within(() => {
    cy.wait(1000); 
      this.elements.getAddToCartButton().as('addToCartButton'); 
      cy.get('@addToCartButton').click({force: true}, { multiple: true });
      });
  }

  verifyProductIsInCart(){
    this.elements.getCartModal().should('be.visible');
    this.elements.getCartItem().contains('Balde de metal infantil').should('be.visible');
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

  verifyPurchaseInCart(){
    cy.wait(1000);
    this.addProductToCart();
    this.verifyProductIsInCart();
    this.elements.getPrice().invoke('text').then((priceText) => {
      const finalPrice = priceText.trim().replace(',', '').replace(/\s/g, ''); 
  
      this.elements.getSubtotalValue().invoke('text').then((subtotalText) => {
        const subtotal = subtotalText.trim().replace(',', '').replace(/\s/g, ''); 
        expect(subtotal).to.equal(finalPrice);
      });
    
      this.elements.getTotalValue().invoke('text').then((totalText) => {
        const total = totalText.trim().replace(',', '').replace(/\s/g, '');
        expect(total).to.equal(finalPrice);
      });
      });
  }

  storeTotalValue() {
    this.elements.getTotalValue().invoke('text').then((totalText) => {
      const formattedTotal = totalText.trim();
      cy.wrap(formattedTotal).as('formattedTotalValue');
    });
  }

  clickOnCheckoutButton(){
    this.elements.getCheckoutButton().click();
  }


}

export default Cart;