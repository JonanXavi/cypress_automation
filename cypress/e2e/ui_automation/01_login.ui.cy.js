/// <reference types="Cypress" />
import authPage from '../../pages/auth/auth_page'
import productListPage from '../../pages/product/plp_page'
import menuPage from '../../pages/menu/menu_page'
import { assertText } from '../../utils/utils'

describe('Validate the correct behavior of the login functionality on the website', () => {
    beforeEach(function() {
        cy.visit(Cypress.env('BASE_URL'))
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.fixture('users').then((users) => {
            this.users = users
        })
    })

    it('Confirm that the username field is validated as required in the login form', () => {
        cy.step('Click the "Login" button without entering any credentials')
        authPage.clickLoginButton()

        cy.step('Verify that the "Username is required" validation message is displayed')
        assertText(() => authPage.getErrorMessage(), 'Username is required')
    })

    it('Confirm that the password field is validated as required in the login form', function() {
        const validUser = this.users.validUser

        cy.step('Enter a valid username in the login form')
        authPage.typeUsername(validUser.username)

        cy.step('Click the "Login" button without entering a password')
        authPage.clickLoginButton()

        cy.step('Verify that the "Password is required" validation message is displayed')
        assertText(() => authPage.getErrorMessage(), 'Password is required')
    })

    it('Confirm that login is rejected when using invalid credentials', function() {
        const invalidUser = this.users.invalidUser

        cy.step('Enter invalid username and/or password in the login form')
        authPage.typeUsername(invalidUser.username)
        authPage.typePassword(invalidUser.password)

        cy.step('Click the "Login" button')
        authPage.clickLoginButton()

        cy.step('Verify that access is denied and an appropriate error message is displayed')
        assertText(() => authPage.getErrorMessage(), 'Username and password do not match any user in this service')
    })

    it('Confirm that login is rejected for a locked user account', function() {
        const lockedUser = this.users.lockedUser

        cy.step('Enter valid credentials for a locked user in the login form')
        authPage.typeUsername(lockedUser.username)
        authPage.typePassword(lockedUser.password)

        cy.step('Click the "Login" button')
        authPage.clickLoginButton()

        cy.step('Verify that access is denied and a corresponding error message is displayed')
        assertText(() => authPage.getErrorMessage(), 'Sorry, this user has been locked out')
    })

    it('Confirm that a registered user can successfully login', function() {
        const validUser = this.users.validUser

        cy.step('Enter valid credentials for a registered user in the login form')
        authPage.typeUsername(validUser.username)
        authPage.typePassword(validUser.password)

        cy.step('Click the "Login" button')
        authPage.clickLoginButton()

        cy.step('Verify that the user is successfully authenticated and granted access to the website')
        assertText(() => productListPage.getProductsTitle(), 'Products')
    })

    it('Confirm that the user is successfully logged out of the session', function () {
        const validUser = this.users.validUser

        cy.step('Log in using valid credentials')
        cy.login(validUser.username, validUser.password)

        cy.step('Open the navigation menu by clicking the menu button')
        productListPage.clickOnTheMenuButton()

        cy.step('Select the "Logout" option from the menu')
        menuPage.clickOnTheLogoutOption()

        cy.step('Verify that the user is redirected to the login page and the application logo is visible')
        authPage.locators.logo().should('be.visible');
    })
})