import homePage from "../../pages/shopist-page/homepage"
import navbar from "../../pages/shopist-page/navbar"
const sizes = ['iphone-8', 'ipad-2', 'samsung-s10', 'macbook-16']
describe('Shopist example test', () => {
    it('Go to shopist page, verify the title and url', () => {
        sizes.forEach((viewportSizeChecks) => {
            cy.viewport(viewportSizeChecks)
            cy.log('Mobile viewport for: ' + viewportSizeChecks)        
            homePage.navigate()
            //normalde burada cy.visit('/') olacak
            cy.title().should('eq', 'Shop.ist') 
            cy.url().should('include','shopist')
        })

    })

    it('Validate the navbar links, then click each', () => {
        //cy.get('a.chairs') olacak navbar vs yerine ilk baslarken
        navbar.getChairs.should('be.visible').click().then(() => {
            cy.url().should('contain', '/department/chairs') //cy.url yerine cy.location('href') yazilabilir eger eq denirse tam link yazilmali
        })
        navbar.getSofas.should('be.visible').click().then(() => {
            cy.url().should('contain', '/department/sofas')
        })
        navbar.getBedding.should('be.visible').click().then(() => {
            cy.url().should('contain', '/department/bedding')
        })
        navbar.getLighting.should('be.visible').click().then(() => {
            cy.url().should('contain', '/department/lighting')
        })
        navbar.getProfile.should('be.visible').click().then(() => {
            cy.url().should('contain', '/profile')
        })
        navbar.getCart.should('be.visible').click().then(() => {
            cy.url().should('contain', '/cart')
        })
    })

    it('Validate the navbar links, then click each - With custom commands', () => {
        cy.navbarLinksValidation()
    });
})