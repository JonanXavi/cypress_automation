import authPage from '../pages/auth/auth_page'

Cypress.Commands.add('login', (username, password) => {
    cy.visit(Cypress.env('BASE_URL'))
    authPage.typeUsername(username)
    authPage.typePassword(password)
    authPage.clickLoginButton()
})