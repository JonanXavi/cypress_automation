/// <reference types="Cypress" />
import productListPage from '../../pages/product/plp_page';
import productDetailPage from '../../pages/product/pdp_page';
import cartPage from '../../pages/cart/cart_page';
import * as allure from 'allure-js-commons';
import { assertText } from '../../utils/assertions';

describe('Cart | Shopping cart functionality', () => {
    beforeEach(function () {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false });
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'));
        cy.fixture('products').then((products) => {
            this.products = products;
        });

        allure.owner('Jonathan Fernández');
        allure.tags('Cart', 'UI');
    });

    it('Allows users to add products to the cart from the Product Listing Page (PLP)', function () {
        allure.severity('critical');
        allure.description('Verifies that a user can add a product to the shopping cart directly from the Product Listing Page.');

        const productsNumber = this.products.length;

        cy.step('Add products to the cart from the Product Listing Page');
        this.products.forEach((product) => {
            productListPage.addProductToCartFromPLP(product);
        });

        cy.step('Validate that the cart badge displays the correct number of items');
        assertText(() => productListPage.locators.shoppingCartBadge(), productsNumber);
    });

    it('Allows users to add products to the cart from the Product Detail Page (PDP)', function () {
        allure.severity('critical');
        allure.description('Ensures that a user can successfully add a product to the shopping cart from the Product Detail Page.');

        const expectedNames = this.products.map((p) => p.name);

        cy.step('Add products to the cart from their Product Detail Pages');
        this.products.forEach((product) => {
            productListPage.clickOnProduct(product.name);
            productDetailPage.clickAddToCartButton();
            productDetailPage.clickBackToProductsButton();
        });

        cy.step('Open the shopping cart');
        productListPage.clickOnTheShoppingCart();

        cy.step('Validate that all selected products are listed in the cart');
        cartPage.getProductNames().then((actualProductNames) => {
            expect(actualProductNames).to.have.members(expectedNames);
        });
    });

    it('Allows users to remove products from the shopping cart', function () {
        allure.severity('normal');
        allure.description('Validates that a user can remove a previously added product from the shopping cart.');

        cy.step('Add products to the cart from the Product Listing Page');
        this.products.forEach((product) => {
            productListPage.addProductToCartFromPLP(product);
        });

        cy.step('Open the shopping cart');
        productListPage.clickOnTheShoppingCart();

        cy.step('Remove all products from the cart');
        this.products.forEach((product) => {
            cartPage.deleteProductOnCart(product.name);
        });

        cy.step('Validate that the shopping cart is empty');
        cartPage.locators.cartItem().should('not.exist');
    });
});
