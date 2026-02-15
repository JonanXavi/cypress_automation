/// <reference types="Cypress" />
import authPage from '../../pages/auth/auth_page';
import productListPage from '../../pages/product/plp_page';
import menuPage from '../../pages/menu/menu_page';
import * as allure from 'allure-js-commons';
import { assertText } from '../../utils/assertions';

describe('Login | User authentication flow', () => {
    beforeEach(function () {
        cy.visit(Cypress.env('BASE_URL'));
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false });
        cy.fixture('users').then((users) => {
            this.users = users;
        });

        allure.owner('Jonathan Fernández');
        allure.tags('Authentication', 'UI');
    });

    it('Displays a validation message when the username field is left empty', () => {
        allure.severity('normal');
        allure.description('Displays an error message when the username field is left empty');

        cy.step('Attempt to login without entering any credentials');
        authPage.clickLoginButton();

        cy.step('Validate that the required username error message is shown');
        assertText(() => authPage.getErrorMessage(), 'Username is required');
    });

    it('Displays a validation message when the password field is left empty', function () {
        allure.severity('normal');
        allure.description('Displays an error message when the password field is left empty');

        const validUser = this.users.validUser;

        cy.step('Enter a valid username');
        authPage.typeUsername(validUser.username);

        cy.step('Attempt to login without entering a password');
        authPage.clickLoginButton();

        cy.step('Validate that the required password error message is shown');
        assertText(() => authPage.getErrorMessage(), 'Password is required');
    });

    it('Prevents login when invalid credentials are provided', function () {
        allure.severity('critical');
        allure.description('Prevents login when the provided credentials are incorrect');

        const invalidUser = this.users.invalidUser;

        cy.step('Enter invalid username and password');
        authPage.typeUsername(invalidUser.username);
        authPage.typePassword(invalidUser.password);

        cy.step('Submit the login form');
        authPage.clickLoginButton();

        cy.step('Validate that an authentication error message is displayed');
        assertText(() => authPage.getErrorMessage(), 'Username and password do not match any user in this service');
    });

    it('Denies access to a locked user account', function () {
        allure.severity('critical');
        allure.description('Verifies that a locked user cannot log in');

        const lockedUser = this.users.lockedUser;

        cy.step('Enter valid credentials for a locked user');
        authPage.typeUsername(lockedUser.username);
        authPage.typePassword(lockedUser.password);

        cy.step('Submit the login form');
        authPage.clickLoginButton();

        cy.step('Validate that the locked account error message is displayed');
        assertText(() => authPage.getErrorMessage(), 'Sorry, this user has been locked out');
    });

    it('Allows a registered user to login successfully', function () {
        allure.severity('critical');
        allure.description('Allows a registered user to log in successfully');

        const validUser = this.users.validUser;

        cy.step('Enter valid user credentials');
        authPage.typeUsername(validUser.username);
        authPage.typePassword(validUser.password);

        cy.step('Submit the login form');
        authPage.clickLoginButton();

        cy.step('Validate that the user is redirected to the products page');
        assertText(() => productListPage.getProductsTitle(), 'Products');
    });

    it('Logs out the user and redirects to the login page', function () {
        allure.severity('normal');
        allure.description('Logs out the user and redirects them to the login page');

        const validUser = this.users.validUser;

        cy.step('Login using valid credentials');
        cy.login(validUser.username, validUser.password);

        cy.step('Open the navigation menu');
        productListPage.clickOnTheMenuButton();

        cy.step('Click on the logout option');
        menuPage.clickOnTheLogoutOption();

        cy.step('Validate that the login page is displayed');
        authPage.locators.logo().should('be.visible');
    });
});
