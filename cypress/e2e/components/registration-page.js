const { faker } = require('@faker-js/faker');

class signUpPage {

    elements = {
        getNameField: () => cy.get('[name="firstname"]'),
        getLastNameField: () => cy.get('[name="lastname"]'),
        getPhoneField: () => cy.get('[name="phone"]'),
        getEmailField: () => cy.get('[name="email"]'),
        getPasswordField: () => cy.get('[name="password"]'),
        getPasswordConfirmField: () => cy.get('[name="confirmpassword"]'),
        getAgreeTermsCheckBox: () => cy.get('[name="termsandconditions"]'),
        getSubmitRegisterButton : () => cy.contains('button', 'Registrarse'),
        getSuccessfulRegistrationMessage : () => cy.get('.alert > button.close > .cx-icon'),
}

assertAllRequiredErrors(){
    this.elements.getNameField().siblings('.control-invalid').should('contain', errorMessage.required);
    this.elements.getLastNameField().siblings('.control-invalid').should('contain', errorMessage.required);
    this.elements.getPhoneField().siblings('.control-invalid').should('contain', errorMessage.required);
    this.elements.getEmailField().siblings('.control-invalid').should('contain', errorMessage.required);
    this.elements.getPasswordField().siblings('.control-invalid').should('contain', errorMessage.required);
    this.elements.getAgreeTermsCheckBox().siblings('.control-invalid').should('contain', errorMessage.required);
}

static errorMessage = {
    required: 'Este campo es requerido',
    invalid: 'Dato no válido'
};

enterInvalidData(){
    this.elements.getNameField().type('111');
    this.elements.getLastNameField().type('111');
    this.elements.getPhoneField().type('aaa');
    this.elements.getEmailField().type('userEmail');
    this.elements.getPasswordField().type('111');
}

assertAllErrorFields(){
    this.elements.getNameField().siblings('.control-invalid').should('contain', errorMessage.invalid);
    this.elements.getLastNameField().siblings('.control-invalid').should('contain', errorMessage.invalid);
    this.elements.getPhoneField().siblings('.control-invalid').should('contain', errorMessage.invalid);
    this.elements.getEmailField().siblings('.control-invalid').should('contain', 'El campo correo electrónico debe contener el siguiente formato usuario@dominio.com');
    this.elements.getPasswordField().siblings('.control-invalid').should('contain', 'Debe contener al menos un número, una letra minúscula, una mayúscula, un caracter especial y 6 o más caracteres.');
}

generateCustomPassword(length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += faker.helpers.arrayElement(characters.split(''));
    }
    return password;
}

generatePassword() {
    const password = [
        faker.string.sample(1), 
        faker.helpers.arrayElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')),
        faker.helpers.arrayElement('abcdefghijklmnopqrstuvwxyz'.split('')),
        faker.number.int(1),
        faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']), 
    ].join('') + this.generateCustomPassword(6);
    return password;
}

generatePhone() {
    let phoneNumber = '';
    for (let i = 0; i < 10; i++) {
        phoneNumber += faker.datatype.number({ min: 0, max: 9 }).toString();
    }
    return phoneNumber;
  }

fillRegisterForm() {
    const password = this.generatePassword();
    const userFirstName = faker.person.firstName();
    const userLastName = faker.person.lastName();
    const userPhone = this.generatePhone();
    const userEmail = faker.internet.exampleEmail();

    this.elements.getNameField().scrollIntoView().type(userFirstName);
    this.elements.getLastNameField().type(userLastName);
    this.elements.getPhoneField().type(userPhone);
    this.elements.getEmailField().type(userEmail);
    this.elements.getPasswordField().type(password);
    this.elements.getPasswordConfirmField().type(password);
}

agreeToTerms() {
    this.elements.getAgreeTermsCheckBox().check();
}

submitSignUpForm() {
    this.elements.getSubmitRegisterButton().click(); 
}

}
module.exports = new signUpPage();