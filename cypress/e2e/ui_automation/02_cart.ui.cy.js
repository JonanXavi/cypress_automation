/// <reference types="Cypress" />
import productsPage from '../../pages/products_page'
import cartPage from '../../pages/cart_page'
import { assertText } from '../../utils/helpers'

describe('Verify that the cart functionality on the website works correctly', () => {
    beforeEach(function() {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.login(Cypress.env('user_dev'), Cypress.env('password_dev'))
        cy.fixture('products').then((products) => {
            this.products = products
        })
    })

    it('Add products to the cart from the PLP (Product Listing Page) on the website', function() {
        const productsNumber = this.products.length

        cy.step('Add products to the shopping cart')
        this.products.forEach((product) => {
            productsPage.addProductToCartFromPLP(product)
        })

        cy.step('Confirm that the number of products in the shopping cart is updated correctly')
        assertText(() => productsPage.locators.shoppingCartBadge(), productsNumber)
    })

    it('Add products to the cart from the PDP (Product Detail Page) on the website', function() {
        const expectedNames = this.products.map(p => p.name)

        cy.step('Click on a product, add it to the cart, and return to the products page')
        this.products.forEach((product) => {
            productsPage.clickOnProduct(product.name)
            productsPage.clickAddToCartButton()
            productsPage.clickBackToProductsButton()
        })

        cy.step('Click on the shopping cart icon')
        productsPage.clickOnTheShoppingCart()

        cy.step('Confirm the products in the shopping cart is correct')
        cartPage.getProductNames().then(actualProductNames => {
            expect(actualProductNames).to.have.members(expectedNames)
        })
    })
})