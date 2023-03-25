class AllProducts {
    get getAllProducts() {
        return cy.get('[class="product-card-container"]')
    }

    get getProductFirstChair(){
        return cy.get('#main div:nth-child(1) > div:nth-child(1) >a')
    }

    get getProductFirstSofa(){
        return cy.get('#main div:nth-child(1) > div:nth-child(1) >a')
    }


    // //div[text()="Wicker Chair"]/../parent::* sonradan buna gecilecek fixture anlatilirken
    firstChair(name){
        cy.xpath("//div[text()='"+name+"']/../parent::*").click()
    }
}

export default new AllProducts()