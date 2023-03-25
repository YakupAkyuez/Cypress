export class HomePage {
    navigate(){
        cy.visit('https://automationexercise.com/').timeMark('visit') //Used cypress-time-marks
        return this;
    }
    verifyTitle(title){
        cy.title().should('eq', title).timeSince('visit')
        return this;
    }
    verifyTheURL(url){
        cy.url().should('contains', url)
        return this;
    }
    headersMenu(){
        cy.get('.shop-menu.pull-right > ul > li').as('headersMenu')
    }
    goToSignInPage(){
        cy.get("a[href='/login']").should('be.visible').click()
    }
}