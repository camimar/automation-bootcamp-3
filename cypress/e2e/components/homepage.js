import { should } from "chai";

class HomePage {
    
    elements = {

      getBanner: () => cy.get('cx-banner'),
      getBannerImage: () =>  cy.get('img[alt="CasaIdeas logo"]'),
      getWishListLink: () => cy.get('cx-link.heart'),
      getCartButton: () => cy.get('button[class="ci-mini-cart"]'),
      getSearchBox: () => cy.get('cx-searchbox'),
      getCategoriesLink: () => cy.contains('span', ' Categorías '),
      getJardinCategory: () => cy.contains('span', 'Jardín'),
      expectedUrl : 'https://www.casaideas-mexico.mx/categoria/raiz/jardin-espacio',
    
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

    constructor() {
      this.categories = [
          'Comedor',
          'Dormitorio',
          'Cocina',
          'Niños y bebé',
          'Baño',
          'Living y Sala de Estar',
          'Escritorio y Papelería',
          'Bodega y Clóset',
          'Jardín',
          'Terraza',
          'Mascotas',
          'Lavandería',
          'Accesorios Personales',
          'Muebles'
      ]}
        
      verifyCategoryIsVisible(category) {
        this.elements.getCategoriesLink().should('be.visible');
      }
        
      verifyAllCategoriesAreVisible() {
        for (const category of this.categories) {
          this.verifyCategoryIsVisible(category);
        }
      }

      clickJardinCategory() {
        this.elements.getCategoriesLink().should('be.visible').click();
        this.elements.getJardinCategory().scrollIntoView().should('be.visible').click();
      }
    
      verifyJardinUrl() {
        cy.url().should('eql', this.elements.expectedUrl);
      }

  }
  
  export default HomePage;