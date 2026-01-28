class CartPage {
    locators = {
        cartItem: () => cy.get('div[data-test="inventory-item"]'),
        checkoutBtn: () => cy.get('button[id="checkout"]'),
    };

    getProductNames() {
        return this.locators
            .cartItem()
            .find('div[data-test="inventory-item-name"]')
            .then(($els) => {
                return [...$els].map((el) => el.innerText.trim());
            });
    }

    deleteProductOnCart(product) {
        cy.get('div[class="cart_item_label"]').filter(`:contains(${product})`).find('button').click();
    }

    clickCheckoutButton() {
        this.locators.checkoutBtn().click();
    }
}

module.exports = new CartPage();
