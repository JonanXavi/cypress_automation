class CheckoutPage {
    locators = {
        firstNameInput: () => cy.get('input[id="first-name"]'),
        lastNameInput: () => cy.get('input[id="last-name"]'),
        zipCodeInput: () => cy.get('input[id="postal-code"]'),
        continueBtn: () => cy.get('input[id="continue"]'),
        finishBtn: () => cy.get('button[id="finish"]'),
        orderHeaderText: () => cy.get('h2[data-test="complete-header"]'),
        orderMessageText: () => cy.get('div[data-test="complete-text"]'),
    };

    typeFirstName(name) {
        this.locators.firstNameInput().type(name);
    }

    typeLastName(lastname) {
        this.locators.lastNameInput().type(lastname);
    }

    typeZipCode(zip) {
        this.locators.zipCodeInput().type(zip);
    }

    clickContinueButton() {
        this.locators.continueBtn().click();
    }

    clickFinishButton() {
        this.locators.finishBtn().click();
    }

    getOrderHeaderText() {
        return this.locators
            .orderHeaderText()
            .invoke('text')
            .then((text) => text.trim());
    }

    getOrderMessageText() {
        return this.locators
            .orderMessageText()
            .invoke('text')
            .then((text) => text.trim());
    }
}

module.exports = new CheckoutPage();
