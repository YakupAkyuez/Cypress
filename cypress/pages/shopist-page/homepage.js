class HomePage {

    get getShopNowBtn() {
        return cy.get("div[class='jumbotron jumbotron-large'] a")
    }

    navigate() {
        cy.visit('https://www.shopist.io/')
    }
}

export default new HomePage();