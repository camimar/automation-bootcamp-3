class login {

    elements = {
        
        getHamburgerMenu: () => cy.get('cx-hamburger-menu'),
        getLoginLink : () => cy.get('cx-login'),
        getRegistroButton : () => cy.contains('Registrarse'),
        getSubmitRegisterButton : () => cy.contains('button', 'Registrarse')

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

loginReturningUser(){
    
}


}
module.exports = new login();