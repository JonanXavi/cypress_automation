class ProductsPage {
    locators = {
        menuBtn: () => cy.get('button[id="react-burger-menu-btn"]'),
        logoutOption: () => cy.get('a[data-test="logout-sidebar-link"]'),
        productsHeader: () => cy.get('span[data-test="title"]'),
        shoppingCartBtn: () => cy.get('a[data-test="shopping-cart-link"]'),
        productDescription: (productName) => cy.contains('div[data-test="inventory-item-description"]', productName),
        shoppingCartBadge: () => cy.get('span[data-test="shopping-cart-badge"]'),
        productName: () => cy.get('div[data-test="inventory-item-name"]'),
        productDetail: () => cy.get('div[data-test="inventory-item-desc"]'),
        productPrice: () => cy.get('div[data-test="inventory-item-price"]'),
        addToCartBtn: () => cy.get('button[data-test="add-to-cart"]'),
        backToProductsBtn: () => cy.get('button[data-test="back-to-products"]')
    }

    getProductsTitle() {
        return this.locators.productsHeader().invoke('text')
    }

    clickOnTheMenuButton() {
        this.locators.menuBtn().click()
    }

    clickOnTheLogoutOption() {
        this.locators.logoutOption().click()
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

    getProductsNames() {
        return this.locators.productName().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }

    getProductName() {
        return this.locators.productName().invoke('text')
    }

    getProductsDescriptions() {
        return this.locators.productDetail().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }

    getProductDescription() {
        return this.locators.productDetail().invoke('text')
    }

    getProductsPrices() {
        return this.locators.productPrice().then($els => {
            return [...$els].map(el => el.innerText.trim())
        })
    }

    getProductPrice() {
        return this.locators.productPrice().invoke('text')
    }
}

module.exports = new ProductsPage()