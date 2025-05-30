/// <reference types="Cypress" />
import productsPage from '../../pages/products_page'
import checkoutPage from '../../pages/checkout_page'
import { generateUserData } from '../../utils/testdata'
import { assertText } from '../../utils/helpers'

describe('Verify that the checkout functionality on the website works correctly', () => {
    beforeEach(function() {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'))
        cy.fixture('products').then((products) => {
            this.products = products
        })
    })

    it('Ensure that purchases can be completed on the website', function() {
        const userData = generateUserData()

        cy.step('Add products to the shopping cart')
        this.products.forEach((product) => {
            productsPage.addProductToCartFromPLP(product)
        })

        cy.step('Click on the shopping cart icon')
        productsPage.clickOnTheShoppingCart()

        cy.step('Click the "Checkout" button in the cart')
        checkoutPage.clickCheckoutButton()

        cy.step('Enter the required information in the "Checkout Information" form')
        checkoutPage.typeFirstName(userData.firstName)
        checkoutPage.typeLastName(userData.lastName)
        checkoutPage.typeZipCode(userData.zip)

        cy.step('Click the "Continue" button in the "Checkout Information" section')
        checkoutPage.clickContinueButton()

        cy.step('Click the "Finish" button in the "Checkout Overview" section')
        checkoutPage.clickFinishButton()

        cy.step('Confirm that the order has been successfully created')
        assertText(() => checkoutPage.getOrderHeaderText(), 'Thank you for your order!')
        assertText(() => checkoutPage.getOrderMessageText(), 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    })
})