export class QrCodeMonkeyHomePages {
    navigate(){
        return cy.visit('https://www.qrcode-monkey.com/')
    }
    verifyTheURL(url){
        cy.url().should('contain', url)
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