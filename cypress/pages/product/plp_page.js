class ProductListPage {
    locators = {
        menuBtn: () => cy.get('button[id="react-burger-menu-btn"]'),
        shoppingCartBadge: () => cy.get('span[data-test="shopping-cart-badge"]'),
        shoppingCartBtn: () => cy.get('a[data-test="shopping-cart-link"]'),
        productsHeader: () => cy.get('span[data-test="title"]'),
        productDescription: (productName) => cy.contains('div[data-test="inventory-item-description"]', productName),
        productName: () => cy.get('div[data-test="inventory-item-name"]'),
        productDetail: () => cy.get('div[data-test="inventory-item-desc"]'),
        productPrice: () => cy.get('div[data-test="inventory-item-price"]')
    }

    clickOnTheMenuButton() {
        this.locators.menuBtn().click()
    }

    clickOnTheShoppingCart() {
        this.locators.shoppingCartBtn().click()
    }

    getProductsTitle() {
        return this.locators.productsHeader().invoke('text')
    }

    clickOnProduct(product) {
        this.locators.productName().contains(product).click()
    }

    addProductToCartFromPLP(product) {
        this.locators.productDescription(product.name).find('button.btn_inventory').click();
    }

    getProductsNames() {
        return this.locators.productName().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }

    getProductsDescriptions() {
        return this.locators.productDetail().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }

    getProductsPrices() {
        return this.locators.productPrice().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }
}

module.exports = new ProductListPage()