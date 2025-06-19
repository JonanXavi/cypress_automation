class CartPage {
    locators = {
        cartItem: () => cy.get('div[data-test="inventory-item"]')
    }

    getProductNames() {
        return this.locators.cartItem().find('div[data-test="inventory-item-name"]').then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }

    deleteProductOnCart(product) {
        cy.get('div[class="cart_item_label"]')
            .filter(`:contains(${product})`)
            .find('button').click()
    }
}

module.exports = new CartPage()