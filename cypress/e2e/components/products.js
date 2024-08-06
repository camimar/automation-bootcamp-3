class products {

    elements = {
        
        getProductCard: () =>  cy.get('ci-product-card'),
        getProductImage: () => cy.get('cx-media.is-initialized img'),
        getProductName: () => cy.get('h6.name'),
        getProductPrice: () => cy.get('.price:not(:empty), .price-discount:not(:empty)'),
        getSearchBar: () => cy.get('cx-searchbox'),
        getSearchResults: () => cy.get('#results'),
        getResultsDisplayed: () => cy.get('em.search-results-highlight'),
        getInvalidSearchMessage: () => cy.get('span[_ngcontent-serverapp-c238]'),
        getHeartButton: () => cy.get('.empty-heart'),
        getWishListButton: () => cy.get('a[aria-label="Lista Deseos Link"]'),
        getWishList: () => cy.get('ci-wish-list'),
        getRemoveFavProductIcon: () => cy.get('cx-icon.trash'),

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

  verifyInvalidSearchResults() {
    this.elements.getSearchBar()
        .should('be.visible')
        .click({ force: true })
        .clear()
        .type('akljasd', {delay: 100});
        cy.wait(1000); 
  }

  addFavProduct() {
    cy.contains('Balde de metal infantil').should('be.visible')
    .parents('ci-product-card')
    .as('productCard'); 
    cy.get('@productCard').within(() => {
    cy.wait(1000); 
    this.elements.getHeartButton().click();
    });
  }

  verifyAddedToWishList(){
    this.elements.getWishListButton().click();
    cy.url().should('contain', '/my-account/wishlist');
    this.elements.getWishList().within(() => {
      cy.contains('Balde de metal infantil').should('exist');
    });
  }

  confirmRemovingProduct(){
    cy.get('.ci-confirmation-modal__container').should('be.visible');
    cy.contains('button', 'Aceptar').click();
    cy.contains('h3', 'No hay productos en su lista de deseos todavía').should('be.visible');
  }


}
module.exports = new products();