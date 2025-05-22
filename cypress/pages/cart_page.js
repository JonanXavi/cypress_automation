class CartPage {
    locators = {
        cartList: () => cy.get('div[data-test="inventory-item"]')
    }

    getProductNames() {
        return this.locators.cartList().find('div[data-test="inventory-item-name"]').then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }
}

module.exports = new CartPage()