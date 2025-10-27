class MenuPage {
    locators = {
        logoutOption: () => cy.get('a[data-test="logout-sidebar-link"]')
    }

    clickOnTheLogoutOption() {
        this.locators.logoutOption().click()
    }
}

module.exports = new MenuPage()