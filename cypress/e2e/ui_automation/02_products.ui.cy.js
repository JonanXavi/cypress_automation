/// <reference types="Cypress" />
import productListPage from '../../pages/product/plp_page';
import productDetailPage from '../../pages/product/pdp_page';

describe('Products | Product listing and detail pages', () => {
    beforeEach(function () {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false });
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'));
        cy.fixture('products').then((products) => {
            this.products = products;
        });
    });

    it('Displays all available products correctly on the Product Listing Page (PLP)', function () {
        const productsNames = this.products.map((p) => p.name);
        const productsDetails = this.products.map((p) => p.description);
        const productsPrices = this.products.map((p) => p.price);

        cy.step('Validate that all product names are displayed correctly');
        productListPage.getProductsNames().then((actualProductsNames) => {
            expect(actualProductsNames).to.deep.equal(productsNames);
        });

        cy.step('Validate that all product descriptions are displayed correctly');
        productListPage.getProductsDescriptions().then((actualProductsDetails) => {
            expect(actualProductsDetails).to.deep.equal(productsDetails);
        });

        cy.step('Validate that all product prices are displayed correctly');
        productListPage.getProductsPrices().then((actualProductsPrices) => {
            expect(actualProductsPrices).to.deep.equal(productsPrices);
        });
    });

    it('Displays correct product information on the Product Detail Page (PDP)', function () {
        const products = this.products;

        products.forEach((product) => {
            cy.step(`Open the Product Detail Page for "${product.name}"`);
            productListPage.clickOnProduct(product.name);

            cy.step('Validate that the product name, description, and price are correct');
            productDetailPage.getProductName().then((actualName) => {
                expect(actualName).to.equal(product.name);
            });

            productDetailPage.getProductDescription().then((actualDescription) => {
                expect(actualDescription).to.equal(product.description);
            });

            productDetailPage.getProductPrice().then((actualPrice) => {
                expect(actualPrice).to.contain(product.price);
            });

            cy.step('Navigate back to the Product Listing Page');
            productDetailPage.clickBackToProductsButton();
        });
    });
});
