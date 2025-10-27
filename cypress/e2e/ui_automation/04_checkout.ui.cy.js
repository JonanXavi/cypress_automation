/// <reference types="Cypress" />
import productListPage from '../../pages/product/plp_page'
import checkoutPage from '../../pages/checkout/checkout_page'
import { generateUserData } from '../../utils/testdata'
import { assertText } from '../../utils/utils'

describe('Validate the correct behavior of the checkout functionality on the website', () => {
    beforeEach(function() {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'))
        cy.fixture('products').then((products) => {
            this.products = products
        })
    })

    it('Confirm that purchases can be successfully completed on the website', function() {
        const userData = generateUserData()

        cy.step('Add products to the shopping cart')
        this.products.forEach((product) => {
            productListPage.addProductToCartFromPLP(product)
        })

        cy.step('Click the shopping cart icon to open the cart')
        productListPage.clickOnTheShoppingCart()

        cy.step('Click the “Checkout” button')
        checkoutPage.clickCheckoutButton()

        cy.step('Enter the required information in the “Checkout Information” form')
        checkoutPage.typeFirstName(userData.firstName)
        checkoutPage.typeLastName(userData.lastName)
        checkoutPage.typeZipCode(userData.zip)

        cy.step('Click the “Continue” button')
        checkoutPage.clickContinueButton()

        cy.step('Click the “Finish” button in the “Checkout Overview” section')
        checkoutPage.clickFinishButton()

        cy.step('Verify that the order has been successfully created')
        assertText(() => checkoutPage.getOrderHeaderText(), 'Thank you for your order!')
        assertText(() => checkoutPage.getOrderMessageText(), 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    })
})