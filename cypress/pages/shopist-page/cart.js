class Cart {
    get addToCartBtn() {
        return cy.get('div.purchase-button')
    }

    get getRemoveBtn() {
        return cy.get('div.remove-button')
    }

    get getCartEmptyMsg(){
        return cy.get('div.no-products')
    }
}

export default new Cart()