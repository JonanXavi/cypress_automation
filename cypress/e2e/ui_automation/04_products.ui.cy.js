/// <reference types="Cypress" />
import productsPage from '../../pages/products_page'

describe('Verify that the products page on the website works correctly', () => {
    beforeEach(function() {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'))
        cy.fixture('products').then((products) => {
            this.products = products
        })
    })

    it('Ensure that products are displayed properly on the PLP (Product Listing Page)', function() {
        const productNames = this.products.map(p => p.name)
        const productDetails = this.products.map(p => p.description)

        cy.step('Confirm that all products on the page are loaded successfully')
        productsPage.getProductNames().then((actualProductNames) => {
            expect(actualProductNames).to.deep.equal(productNames)
        })

        productsPage.getProductDescriptions().then((actualProductDetails) => {
            expect(actualProductDetails).to.deep.equal(productDetails)
        })
    })
})