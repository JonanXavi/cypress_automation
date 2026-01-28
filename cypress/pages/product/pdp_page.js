class ProductDetailPage {
    locators = {
        productName: () => cy.get('div[data-test="inventory-item-name"]'),
        productDetail: () => cy.get('div[data-test="inventory-item-desc"]'),
        productPrice: () => cy.get('div[data-test="inventory-item-price"]'),
        addToCartBtn: () => cy.get('button[data-test="add-to-cart"]'),
        backToProductsBtn: () => cy.get('button[data-test="back-to-products"]'),
    };

    clickAddToCartButton() {
        this.locators.addToCartBtn().click();
    }

    getProductName() {
        return this.locators.productName().invoke('text');
    }

    getProductDescription() {
        return this.locators.productDetail().invoke('text');
    }

    getProductPrice() {
        return this.locators.productPrice().invoke('text');
    }

    clickBackToProductsButton() {
        this.locators.backToProductsBtn().click();
    }
}

module.exports = new ProductDetailPage();
