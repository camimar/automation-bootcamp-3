class products {

    elements = {
        
        getProductCard: () =>  cy.get('ci-product-card'),
        getProductImage: () => cy.get('cx-media.is-initialized img'),
        getProductName: () => cy.get('h6.name'),
        getProductPrice: () => cy.get('.price:not(:empty), .price-discount:not(:empty)')

}

  verifyProductCardElements() {
    this.elements.getProductImage().each(($img) => {
      cy.wrap($img).should('exist').and('have.attr', 'src').and('not.be.empty');
    });

    this.elements.getProductName().each(($name) => {
      cy.wrap($name).should('exist').and('not.be.empty');
    });

    this.elements.getProductPrice().each(($price) => {
      cy.wrap($price).should('exist').and('not.be.empty');
    });
  }

  logProductNamesAndCount() {
    this.elements.getProductName().then(($names) => {
      const productNames = $names.toArray().map(el => el.textContent.trim());
      cy.log('Product names:', productNames);
      cy.log('Total products:', productNames.length)
      expect(productNames.length).to.equal(24);
    });
  }

}
module.exports = new products();