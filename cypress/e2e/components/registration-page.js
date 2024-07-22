const { faker } = require('@faker-js/faker');

class signUpPage {

    elements = {

        getSubmitRegisterButton : () => cy.contains('button', 'Registrarse'),
        getSuccessfulRegistrationMessage : () => cy.get('.alert > button.close > .cx-icon'),

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
   // const userPhone = faker.phone.imei();
    const userEmail = faker.internet.exampleEmail();
    //const password = faker.internet.password({ length, pattern, prefix });

    cy.get('[name="firstname"]').type(userFirstName);
    cy.get('[name="lastname"]').type(userLastName);
    cy.get('[name="phone"]').type(userPhone);
    cy.get('[name="email"]').type(userEmail);
    cy.get('[name="password"]').type(password);
    cy.get('[name="confirmpassword"]').type(password);
}

agreeToTerms() {
    cy.get('[name="termsandconditions"]').check();
}

submitSignUpForm() {
    this.elements.getSubmitRegisterButton().click(); 
}

}
module.exports = new signUpPage();