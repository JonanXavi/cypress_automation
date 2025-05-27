import loginPage from '../pages/login_page'

Cypress.Commands.add('login', (username, password) => {
    cy.visit(Cypress.env('BASE_URL'))
    loginPage.typeUsername(username)
    loginPage.typePassword(password)
    loginPage.clickLoginButton()
})