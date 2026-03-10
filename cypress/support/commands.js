import authPage from '../pages/auth/auth-page';

Cypress.Commands.add('login', (username, password) => {
    cy.visit(Cypress.env('BASE_URL'));
    authPage.typeUsername(username);
    authPage.typePassword(password);
    authPage.clickLoginButton();
    cy.wait(5000);
});
