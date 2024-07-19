class login {

    elements = {
        
        getProfileIcon : () => cy.get('cx-login'),
        getRegistroButton : () => cy.contains('Registrarse'),
        getSubmitRegisterButton : () => cy.contains('button', 'Registrarse')

}

isLoginButtonVisibleEnabled() {
    this.elements.getProfileIcon().should('be.visible').and('not.have.attr', 'disabled');
}


clickLoginButton() {
    this.elements.getProfileIcon().click();
}

clickSignUpButton() {
    this.elements.getRegistroButton().click()
}
}
module.exports = new login();