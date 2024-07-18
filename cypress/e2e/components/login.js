class login {

    elements = {
        
        getProfileIcon : () => cy.get('cx-login'),

}

isLoginButtonVisibleEnabled() {
    this.elements.getProfileIcon().should('be.visible').and('not.have.attr', 'disabled');
}


clickLoginButton() {
    this.elements.getProfileIcon().click();
}


}
module.exports = new login();