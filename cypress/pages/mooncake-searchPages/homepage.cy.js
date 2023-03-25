export class MoonCakeHomePages {
    navigate(){
        cy.visit('https://mooncake.staffbase.rocks/')
        return this;
    }
    verifyTitle(title){
        cy.title().should('eq', title)
        return this;
    }
    verifyTheURL(url){
        cy.url().should('contains', url)
        return this;
    }
    secondSearchFieldVerifyText(searchText){
        //After clicked more result btn, second search field in the page and verifying
        cy.get('div#content input[name="search"]').should('have.value', searchText) 
    }

    topResultShow(topResultShow){
        cy.get('#content h2').should('have.text', topResultShow)
    }
    allResultsBtn(){
        cy.get('li[role="button"]').as('resultsBtn')
    }
}