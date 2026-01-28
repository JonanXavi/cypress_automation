class AuthPage {
    locators = {
        logo: () => cy.get('div[class="login_logo"]'),
        usernameInput: () => cy.get('input[id="user-name"]'),
        passwordInput: () => cy.get('input[id="password"]'),
        errorMessage: () => cy.get('h3[data-test="error"]'),
        loginBtn: () => cy.get('input[id="login-button"]'),
    };

    typeUsername(username) {
        this.locators.usernameInput().type(username, { log: false });
    }

    typePassword(password) {
        this.locators.passwordInput().type(password, { log: false });
    }

    clickLoginButton() {
        this.locators.loginBtn().click();
    }

    getErrorMessage() {
        return this.locators.errorMessage().invoke('text');
    }
}

module.exports = new AuthPage();
