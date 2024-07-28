import { should } from "chai";

class HomePage {
    
    elements = {

      getBanner: () => cy.get('cx-banner'),
      getBannerImage: () =>  cy.get('img[alt="CasaIdeas logo"]'),
      getWishListLink: () => cy.get('cx-link.heart'),
      getCartButton: () => cy.get('button[class="ci-mini-cart"]'),
      getSearchBox: () => cy.get('cx-searchbox')
    }
  
    verifyNavbarElementsAreVisible() {
        const elementGetters = [
          this.elements.getBannerImage,
          this.elements.getWishListLink,
          this.elements.getCartButton,
          this.elements.getSearchBox,
        ];
    
        elementGetters.forEach(getter => {
          getter().should('be.visible');
        });
    }


  }
  
  export default HomePage;