class login {

    elements = {
        
        getHamburgerMenu: () => cy.get('cx-hamburger-menu'),
        getLoginLink : () => cy.get('cx-login'),
        getRegistroButton : () => cy.contains('Registrarse'),
        getSubmitRegisterButton : () => cy.contains('button', 'Registrarse'),
        getLoginEmailInputField: () => cy.get('[formControlName="userId"]'),
        getLoginPasswordInputField: () => cy.get('.form-control[type="password"]'),
        getIngresarButton: () => cy.get('button[type="submit"]'),

}

isLoginButtonVisibleEnabled() {
    this.elements.getLoginLink().should('be.visible').and('not.have.attr', 'disabled');
}

clickHamburgerMenu(){
    this.elements.getHamburgerMenu().click()
}

clickLoginButton() {
    this.elements.getLoginLink().click();
}

clickSignUpButton() {
    this.elements.getRegistroButton().click()
}

accessToSignUpForm(){
    this.clickHamburgerMenu();
    this.clickLoginButton();
    this.clickSignUpButton();
}

accessToLoginForm(){
    this.clickHamburgerMenu();
    this.clickLoginButton();
}

performLogin(email, password) {
    this.elements.getLoginEmailInputField().type(email);
    this.elements.getLoginPasswordInputField().type(password);
    this.elements.getIngresarButton().click();
}

validLogin() {
    this.performLogin('sunflower@flowers.com', '65333Ti!');
}

InvalidLogin() {
    this.performLogin('sunflower@flowers.com', 'aaaaaa');
}

loginReturningUser(){
    this.clickHamburgerMenu();
    this.clickLoginButton();
    this.validLogin();   
}


}
module.exports = new login();