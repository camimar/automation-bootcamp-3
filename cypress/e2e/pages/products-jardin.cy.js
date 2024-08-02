import login from '../components/login.js'
import products from '../components/products.js';

describe('Casa Ideas - Products page testing flows', () => {

    beforeEach(() => {
      cy.visit('/categoria/raiz/jardin-espacio')
      cy.acceptCookiesIfExists()
    });

    it('TC_11: Verify product cards: user is able to see each cards price and image', () => {
        products.verifyProductCardElements();
        products.logProductNamesAndCount();
    });

    it('TC_12: Product Search bar: user is able to search for a product', () => {
        products.searchAndVerifyProduct('Maceta');
    });

    it('TC_13: Product Search bar: User is able to see error message and suggestions when entering an invalid search', () => {
        products.verifyInvalidSearchResults();
        products.elements.getInvalidSearchMessage().should('be.visible').and('contain', '¡Nada Encontrado! vea algunos productos populares:');
        products.elements.getSearchResults().should('be.visible');
    });

    it('TC_14: Fav products: User is able to mark a product as favorite and remove it', () => {
        login.loginReturningUser();
        products.addFavProduct();
        products.verifyAddedToWishList();
        products.elements.getRemoveFavProductIcon().click();
        products.confirmRemovingProduct();
    });

    //TODO extra: User is not able to mark a product as favorite when it's not logged in

});
