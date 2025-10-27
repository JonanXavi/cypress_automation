/// <reference types="Cypress" />
import productListPage from '../../pages/product/plp_page'
import productDetailPage from '../../pages/product/pdp_page'

describe('Validate the correct behavior of the products on the website', () => {
    beforeEach(function() {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'))
        cy.fixture('products').then((products) => {
            this.products = products
        })
    })

    it('Confirm that all products are properly displayed on the Product Listing Page (PLP)', function() {
        const productsNames = this.products.map(p => p.name)
        const productsDetails = this.products.map(p => p.description)
        const productsPrices = this.products.map(p => p.price);

        cy.step('Verify that all available products are loaded and displayed correctly on the Product Listing Page (PLP)')
        productListPage.getProductsNames().then((actualProductsNames) => {
            expect(actualProductsNames).to.deep.equal(productsNames)
        })

        productListPage.getProductsDescriptions().then((actualProductsDetails) => {
            expect(actualProductsDetails).to.deep.equal(productsDetails)
        })

        productListPage.getProductsPrices().then((actualProductsPrices) => {
            expect(actualProductsPrices).to.deep.equal(productsPrices)
        })
    })

    it('Confirm that product details are correctly displayed on the Product Detail Page (PDP)', function() {
        const productsData = this.products;
        const productsNumber = productsData.length;

        for (let i = 0; i < productsNumber; i++) {
            cy.step(`Click on ${productsData[i].name} to open its Product Detail Page (PDP)`)
            productListPage.clickOnProduct(productsData[i].name)

            cy.step('Verify that the product name, description, and price match the expected values')
            productDetailPage.getProductName().then((actualProductName) => {
                expect(actualProductName).to.equal(productsData[i].name);
            })

            productDetailPage.getProductDescription().then((actualProductDetail) => {
                expect(actualProductDetail).to.equal(productsData[i].description);
            })

            productDetailPage.getProductPrice().then((actualProductPrice) => {
                expect(actualProductPrice).to.contain(productsData[i].price);
            })

            cy.step('Return to the Product Listing Page (PLP)')
            productDetailPage.clickBackToProductsButton()
        }
    })
})