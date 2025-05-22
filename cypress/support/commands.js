import loginPage from '../pages/login_page'

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')
    loginPage.typeUsername(username)
    loginPage.typePassword(password)
    loginPage.clickLoginButton()
})