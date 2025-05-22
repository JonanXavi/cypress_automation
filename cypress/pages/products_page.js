class ProductsPage {
    locators = {
        productsHeader: () => cy.get('span[data-test="title"]'),
        shoppingCartBtn: () => cy.get('a[data-test="shopping-cart-link"]'),
        productDescription: (productName) => cy.contains('div[data-test="inventory-item-description"]', productName),
        shoppingCartBadge: () => cy.get('span[data-test="shopping-cart-badge"]'),
        productName: () => cy.get('div[data-test="inventory-item-name"]'),
        productDetail: () => cy.get('div[data-test="inventory-item-desc"]'),
        addToCartBtn: () => cy.get('button[data-test="add-to-cart"]'),
        backToProductsBtn: () => cy.get('button[data-test="back-to-products"]')
    }

    getProductsTitle() {
        return this.locators.productsHeader().invoke('text')
    }

    clickOnTheShoppingCart() {
        this.locators.shoppingCartBtn().click()
    }

    addProductToCartFromPLP(product) {
        this.locators.productDescription(product.name).find('button.btn_inventory').click();
    }

    clickOnProduct(product) {
        this.locators.productName().contains(product).click()
    }

    clickAddToCartButton() {
        this.locators.addToCartBtn().click()
    }

    clickBackToProductsButton() {
        this.locators.backToProductsBtn().click()
    }

    getProductNames() {
        return this.locators.productName().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }

    getProductDescriptions() {
        return this.locators.productDetail().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }
}

module.exports = new ProductsPage()