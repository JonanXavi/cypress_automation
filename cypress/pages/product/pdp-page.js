class ProductDetailPage {
    locators = {
        productName: () => cy.get('div[data-test="inventory-item-name"]'),
        productDetail: () => cy.get('div[data-test="inventory-item-desc"]'),
        productPrice: () => cy.get('div[data-test="inventory-item-price"]'),
        addToCartButton: () => cy.get('button[data-test="add-to-cart"]'),
        backToProductsButton: () => cy.get('button[data-test="back-to-products"]'),
    };

    clickAddToCartButton() {
        this.locators.addToCartButton().click();
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
        this.locators.backToProductsButton().click();
    }
}

module.exports = new ProductDetailPage();
