export class QrCodeMonkey {
    acceptAllCookies(){
        cy.get('#onetrust-accept-btn-handler').should('be.visible').click() // When run the test, accept all cookies.
    }

    validateTheTitle(text){
        cy.title().should('eq', text)
    }

    validateHeadersMenuWithUrlLocators(text1, text2, text3, text4) {
        cy.get("a[href$='#about']").should('be.visible').and('contain', text1)
        cy.get("a[href$='/gidoepdbdhacpopcmepkflghaalfapmk']").should('be.visible').and('contain', text2)
        cy.get("a[href$='/qr-code-api-with-logo/']").should('be.visible').and('contain', text3)
        cy.get("a[href$='#']").should('be.visible').and('contain', text4)
    }

    validateTheSetting(text){
        cy.get('.settings').should('be.visible').and('contain', text)
    }

    createQrBtn(){
        cy.get('#button-create-qr-code').should('be.visible').click()
    }

    downloadBtn(){
        cy.get('#button-download-qr-code-png')
    }

    openSetColor(){
        cy.get('div:nth-child(2) > div.pane-header').should('be.visible').click() //Click Set Colors
    }

    removeBtn(){
        cy.get('.btn.btn-default').should('be.visible').and('contain', 'Remove Logo')
    }

    customizeDesign(){
        cy.get('div:nth-child(4) > div.pane-header').should('be.visible').click()
    }

    qrCodeTemplates(){
        cy.get('[class="btn"]').should('be.visible').and('contain', ' QR Code Templates').click()
    }

    downloadingQr(text){
        cy.get('div.wrapper.original-variant > div > div.download-status.ng-scope > div.text').should('be.visible').and('contain', text)
    }

    imageUploadErrorMessage(text){
        cy.get('small[class="error-text"]').should('be.visible').and('contain', text)
    }
}