/// <reference types="Cypress" />
import productListPage from '../../pages/product/plp_page'
import productDetailPage from '../../pages/product/pdp_page'
import cartPage from '../../pages/cart/cart_page'
import { assertText } from '../../utils/utils'

describe('Validate the correct behavior of the cart functionality on the website', () => {
    beforeEach(function() {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false })
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'))
        cy.fixture('products').then((products) => {
            this.products = products
        })
    })

    it('Confirm that products can be added to the cart from the Product Listing Page (PLP)', function() {
        const productsNumber = this.products.length

        cy.step('Add one or more products to the shopping cart from the Product Listing Page (PLP)')
        this.products.forEach((product) => {
            productListPage.addProductToCartFromPLP(product)
        })

        cy.step('Verify that the cart icon reflects the correct number of items added')
        assertText(() => productListPage.locators.shoppingCartBadge(), productsNumber)
    })

    it('Confirm that products can be added to the cart from the Product Detail Page (PDP)', function() {
        const expectedNames = this.products.map(p => p.name)

        cy.step('For each desired product, navigate to its Product Detail Page (PDP), add it to the cart, and return to the Product Listing Page (PLP)')
        this.products.forEach((product) => {
            productListPage.clickOnProduct(product.name)
            productDetailPage.clickAddToCartButton()
            productDetailPage.clickBackToProductsButton()
        })

        cy.step('Click the shopping cart icon to open the cart')
        productListPage.clickOnTheShoppingCart()

        cy.step('Verify that all selected products are correctly listed in the shopping cart')
        cartPage.getProductNames().then(actualProductNames => {
            expect(actualProductNames).to.have.members(expectedNames)
        })
    })

    it('Confirm that products can be removed from the shopping cart', function() {
        cy.step('Add one or more products to the shopping cart from the Product Listing Page (PLP)')
        this.products.forEach((product) => {
            productListPage.addProductToCartFromPLP(product)
        })

        cy.step('Click the shopping cart icon to open the cart')
        productListPage.clickOnTheShoppingCart()

        cy.step('For each product in the cart: click the delete button to remove it')
        this.products.forEach((product) => {
            cartPage.deleteProductOnCart(product.name)
        })

        cy.step('Verify that the shopping cart is empty')
        cartPage.locators.cartItem().should('not.exist')
    })
})