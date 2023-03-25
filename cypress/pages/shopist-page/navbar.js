class Navbar {
    get getChairs(){
        return cy.get('a.chairs')
    }

    get getSofas(){
        return cy.get('a.sofas')
    }

    get getBedding(){
        return cy.get('a.bedding')
    }

    get getLighting(){
        return cy.get('a.lighting')
    }

    get getProfile(){
        return cy.get('a.profile')
    }

    get getCart(){
        return cy.get('a.cart')
    }

    verifyCartCount(number){
        cy.get('.cart').should('contain', number)
    }
}

export default new Navbar()