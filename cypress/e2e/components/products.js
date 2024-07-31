class products {

    elements = {
        
        getProductCard: () =>  cy.get('ci-product-card'),
        getProductImage: () => cy.get('cx-media.is-initialized img'),
        getProductName: () => cy.get('h6.name'),
        getProductPrice: () => cy.get('.price:not(:empty), .price-discount:not(:empty)'),
        getSearchBar: () => cy.get('cx-searchbox'),
        getSearchResults: () => cy.get('#results'),
        getResultsDisplayed: () => cy.get('em.search-results-highlight')

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

  searchProduct(productName){
    this.elements.getSearchBar()
        .should('be.visible')
        .click({ force: true })
        .clear()
        .type(productName, {delay: 100});
    cy.wait(1000); 
  }

  verifySearchResults(productName) {
      this.elements.getResultsDisplayed().each(($result) => {
          cy.wrap($result).invoke('text').should('contain', productName);
      });
  }

  searchAndVerifyProduct(productName) {
      this.searchProduct(productName);
      this.verifySearchResults(productName);
  }


}
module.exports = new products();