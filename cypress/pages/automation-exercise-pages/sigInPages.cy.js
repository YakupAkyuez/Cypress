export class SignInPage {
    loginBtn(){
        cy.get("[data-qa='login-button']").should('be.visible').click()
        return this;
    }
    loginEmailErrorMsg(errorMsg){
        cy.get("[data-qa='login-email']").invoke('prop', "validationMessage").should('eq', errorMsg)
        return this;
    }
    loginEmail(email){
        cy.get("[data-qa='login-email']").should('be.visible').type(email)
        return this;
    }
    loginEmailErrorMsg(errorMsg){
        cy.get("[data-qa='login-email']").invoke('prop', "validationMessage").should('contains', errorMsg)  
    }
    loginPasswordErrorMsg(errorMsg){
        cy.get("[data-qa='login-password']").invoke('prop', "validationMessage").should('eq', errorMsg)
        return this;
    }
    loginPassword(password){
        cy.get("[data-qa='login-password']").should('be.visible').type(password)
        return this;
    }
    verifyTheErrorMsg(error){
        cy.get("form[action='/login'] p").should('be.visible').contains(error)
    }
    clearSignUpTextFields(){
        cy.get("[data-qa='login-email']").clear()
        cy.get("[data-qa='login-password']").clear()
    }
}