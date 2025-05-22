/// <reference types="Cypress" />
import loginPage from '../../pages/login_page'
import productsPage from '../../pages/products_page'
import { assertText } from '../../utils/helpers'

describe('Verify that the login functionality on the website works correctly', () => {
    beforeEach(function() {
        cy.visit("/")
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.fixture('users').then((users) => {
            this.users = users
        })
    })

    it('All mandatory fields are present in the "Login" form', function() {
        const userData = this.users[0]

        cy.step('Click the "Log in" button in the form without entering any data')
        loginPage.clickLoginButton()

        cy.step('Confirm that the "Required username" message is displayed')
        assertText(() => loginPage.getErrorMessage(), 'Username is required')

        cy.step('Enter a username in the "Login" form and click the "Login" button')
        loginPage.typeUsername(userData.username)
        loginPage.clickLoginButton()

        cy.step('Confirm that the "Required password" message is displayed')
        assertText(() => loginPage.getErrorMessage(), 'Password is required')
    })

    it('Ensure that login is not possible using a blocked user', function() {
        const userData = this.users[0]

        cy.step('Enter the required information in the "Login" form')
        loginPage.typeUsername(userData.username)
        loginPage.typePassword(userData.password)

        cy.step('Click the "Login" button in the form')
        loginPage.clickLoginButton()

        cy.step('Confirm that access is denied for the blocked user')
        assertText(() => loginPage.getErrorMessage(), 'Sorry, this user has been locked out')
    })

    it('Ensure that login is possible using a registered user', function () {
        const userData = this.users[1]

        cy.step('Enter the required information in the "Login" form')
        loginPage.typeUsername(userData.username)
        loginPage.typePassword(userData.password)

        cy.step('Click the "Login" button in the form')
        loginPage.clickLoginButton()

        cy.step('Confirm that the user is successfully logged into the website')
        assertText(() => productsPage.getProductsTitle(), 'Products')
    })
})