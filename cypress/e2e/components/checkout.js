const { faker } = require('@faker-js/faker');
const { generatePhone } = require('./registration-page.js');

class Checkout {

    elements = {

        getNameCheckoutField: () => cy.get('[formcontrolname="firstName"]'),
        getCheckoutLastNameField: () => cy.get('[formcontrolname="lastName"]'),
        getCheckoutPhoneField: () => cy.get('[formcontrolname="phone"]'),
        getCheckoutStreetField: () => cy.get('[formcontrolname="line1"]'),
        getCheckoutExtNumField: () => cy.get('[formcontrolname="line2"]'),
        getCheckoutIntNumField: () => cy.get('[formcontrolname="appartment"]'),
        getCheckout1stStreetField: () => cy.get('[formcontrolname="street1"]'),
        getCheckout2ntStreetField: () => cy.get('[formcontrolname="street2"]'),  
        getCheckoutReferenceField: () => cy.get('[formcontrolname="reference"]'),
        getCheckoutZipField: () => cy.get('[formcontrolname="postalCode"]'),
        getContinueButton: () => cy.contains('button', 'Continuar'),
        getEstadoField: () => cy.get('input[placeholder="Estado"]'),
        getAlcaldiaField: () => cy.get('input[placeholder="Alcaldía"]'),
        getColoniaField: () => cy.get('ng-select[formcontrolname="town"]'),
        getAgregarNuevaDireccion: () => cy.contains('button', 'Agregar Nueva Dirección'),
        getShippingContainer: () => cy.get('cx-delivery-mode'),
        getPaidShippingMethodCheckbox: () => cy.get('#deliveryMode-standard-gross'),
        getFreeShippingMethodCheckbox: () => cy.get('#deliveryMode-free-standard-shipping'),
        getPaymentForm: () =>  cy.get('app-ci-payment-form'),
        getCardNameInput: () =>  cy.get('input[formcontrolname="accountHolderName"]'),
        getCardNumberInput: () =>  cy.get('input[formcontrolname="cardNumber"]'),
        getValidoHastaDropdown1: () =>  cy.get('input[aria-autocomplete="list"]').eq(0),
        getValidoHastaDropdown2: () =>  cy.get('input[aria-autocomplete="list"]').eq(1),
}

completeAdressCheckoutForm() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phone = generatePhone();
    const street = faker.lorem.word();
    const extNum = faker.number.int(3)
    const intNum = faker.number.int(2)
    const street1 = faker.lorem.word();
    const street2 = faker.lorem.word();
    const reference = faker.lorem.words(4);
    const postalCode = faker.address.zipCode();

    cy.wait(1000);
    this.elements.getNameCheckoutField().first().scrollIntoView().type(firstName, { force: true });
    this.elements.getCheckoutLastNameField().eq(0).type(lastName);
    this.elements.getCheckoutPhoneField().eq(0).type(phone);
    this.elements.getCheckoutStreetField().eq(0).type(street);
    this.elements.getCheckoutExtNumField().eq(0).type(extNum.toString()); 
    this.elements.getCheckoutIntNumField().eq(0).type(intNum.toString());
    this.elements.getCheckout1stStreetField().eq(0).type(street1);
    this.elements.getCheckout2ntStreetField().eq(0).type(street2);
    this.elements.getCheckoutReferenceField().eq(0).type(reference);
    this.elements.getCheckoutZipField().eq(0).type('97000');
}

continueCheckoutProcess() {
    this.elements.getContinueButton({ timeout: 10000 }).click( {force: true} );
}

selectAndVerifyColoniaField() {
    this.elements.getColoniaField().click();
    cy.contains('.ng-option-label', 'Itzaes').should('be.visible').click({ force: true });
}

verifyRequiredFieldsErrors() {
    const fields = [
        this.elements.getNameCheckoutField,
        this.elements.getCheckoutLastNameField,
        this.elements.getCheckoutPhoneField,
        this.elements.getCheckoutStreetField,
        this.elements.getCheckoutExtNumField,
        this.elements.getCheckoutIntNumField,
        this.elements.getCheckout1stStreetField,
        this.elements.getCheckout2ntStreetField,
        this.elements.getCheckoutReferenceField,
        this.elements.getCheckoutZipField,
    ];

    fields.forEach(fieldMethod => {
        fieldMethod().then($field => {
            if ($field.hasClass('ng-invalid')) {
                cy.wrap($field).closest('.form-group').find('cx-form-errors').should('contain', 'Este campo es requerido');
            }
        });
    });
}

verifyShippingMethodIsSelected(){
    this.elements.getShippingContainer().should('be.visible');
    cy.get('input[aria-label="Quantity"]', {timeout: 10000}).should('be.visible')
    .invoke('val')
    .then((value) => {
        cy.log('Texto obtenido:', value);
        const itemCount = parseInt(value, 10);
        cy.log('Número de ítems:', itemCount);
        if (itemCount >= 3) {
            this.elements.getFreeShippingMethodCheckbox().should('have.attr', 'aria-checked', 'true');
        } else {
            this.elements.getPaidShippingMethodCheckbox().should('have.attr', 'aria-checked', 'true');
        }
    });
}

verifyPaymentMethodElements() {
    cy.get('.cx-checkout-text').should('be.visible');
    const paymentMethods = [
        "Depósito bancario",
        "Tarjeta de crédito/débito",
        "PayPal"
    ];
    paymentMethods.forEach(method => {
        cy.contains('span.ml-2.flex-grow-1', method).should('be.visible',  { timeout: 10000 }).prev('input[type="radio"]').should('be.enabled');
    });
}

verifyCardPaymentElements(){
    this.elements.getPaymentForm().should('be.visible')
    this.elements.getCardNameInput().scrollIntoView().should('be.visible')
    this.elements.getCardNumberInput().should('be.visible')
    cy.get('#cVVNumber').should('be.visible');
}

selectValidoHasta(month, year) {
    cy.get('ng-select[formcontrolname="expiryMonth"]').find('.ng-arrow-wrapper').click();
    cy.contains('.ng-dropdown-panel-items', month).click();
    cy.get('ng-select[formcontrolname="expiryYear"]').find('.ng-arrow-wrapper').click();
    cy.contains('.ng-dropdown-panel-items', year).click();
}

 selectPaymentType() {
    cy.get('ng-select[formcontrolname="code"]').click( {force: true} );  
    cy.contains('American Express').click( {force: true} );
}

getCVVInput() {
    return cy.get('input[formcontrolname="cvv"]');
}

verifyPaymentType(cardType) {
    cy.get('select[formcontrolname="cardType"]').should('have.value', cardType);
}

verifyValidoHasta(month, year) {
    this.elements.getValidoHastaDropdown1().should('have.value', month);
    this.elements.getValidoHastaDropdown2().should('have.value', year);
}

}

export default Checkout;