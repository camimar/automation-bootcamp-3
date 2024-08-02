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
        getContinueButton: () => cy.contains('button', 'Continuar')
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
    this.elements.getContinueButton().click();
}


}

export default Checkout;