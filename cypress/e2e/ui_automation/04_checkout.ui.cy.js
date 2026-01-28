/// <reference types="Cypress" />
import productListPage from '../../pages/product/plp_page';
import cartPage from '../../pages/cart/cart_page';
import checkoutPage from '../../pages/checkout/checkout_page';
import { generateUserData } from '../../utils/testdata';
import { assertText } from '../../utils/assertions';

describe('Checkout | Purchase flow', () => {
    beforeEach(function () {
        cy.intercept({ resourceType: /xhr|new url|fetch/ }, { log: false });
        cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'));
        cy.fixture('products').then((products) => {
            this.products = products;
        });
    });

    it('Allows users to successfully complete a purchase', function () {
        const userData = generateUserData();

        cy.step('Add products to the shopping cart');
        this.products.forEach((product) => {
            productListPage.addProductToCartFromPLP(product);
        });

        cy.step('Open the shopping cart');
        productListPage.clickOnTheShoppingCart();

        cy.step('Proceed to checkout');
        cartPage.clickCheckoutButton();

        cy.step('Enter valid checkout information');
        checkoutPage.typeFirstName(userData.firstName);
        checkoutPage.typeLastName(userData.lastName);
        checkoutPage.typeZipCode(userData.zip);

        cy.step('Continue to the checkout overview');
        checkoutPage.clickContinueButton();

        cy.step('Complete the purchase');
        checkoutPage.clickFinishButton();

        cy.step('Validate that the order confirmation is displayed');
        assertText(() => checkoutPage.getOrderHeaderText(), 'Thank you for your order!');
        assertText(
            () => checkoutPage.getOrderMessageText(),
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        );
    });
});
