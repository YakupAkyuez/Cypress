// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

//Login Commands for mooncake-search folder
Cypress.Commands.add('login', (username, password) => {
    cy.get('div#sidebar button').should('be.visible').click()
    cy.get('input[type="text"]').should('be.visible').type(username)
    cy.get('input[type="password"]').should('be.visible').type(password)
    cy.get('.type-submit').should('be.visible').click()
})

//With session for mooncake-search folder
Cypress.Commands.add('loginViaSession', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('https://mooncake.staffbase.rocks/')
        cy.get('div#sidebar button').should('be.visible').click()
        cy.get('input[type="text"]').should('be.visible').type(username)
        cy.get('input[type="password"]').should('be.visible').type(password)
        cy.get('.type-submit').should('be.visible').click()
        cy.get('#menu span.user-pic').should('be.visible')
    })
})

//Search Text Commands for mooncake-search folder
Cypress.Commands.add('search', (searchText) => {
    cy.get('input[name="search"]').should('be.visible').type(searchText, {force:true})
    cy.get('menu#menu div > button').should('be.visible').click()
})

//For QrCodeMonkey url input field commands
Cypress.Commands.add('yourUrlInputField', () => {
    cy.get('#qrcodeUrl').should('be.visible').as('inputField').then((input) => {
        if(input.hasClass('@inputField') == ''){
            cy.get('@inputField').clear()
        }
    })
})

//Login Commands for Automation Exercise
Cypress.Commands.add('loginAutomationExercise', (email, password) => {
    cy.get("[data-qa='login-email']").should('be.visible').type(email)
    cy.get("[data-qa='login-password']").should('be.visible').type(password)
    cy.get("[data-qa='login-button']").should('be.visible').click()
})

//Login with Session Commands for Automation Exercise
Cypress.Commands.add('loginViaSessionAutomationExercise', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('https://automationexercise.com/')
        cy.get("a[href='/login']").click()
        cy.get("[data-qa='login-email']").should('be.visible').type(email)
        cy.get("[data-qa='login-password']").should('be.visible').type(password)
        cy.get("[data-qa='login-button']").should('be.visible').click()
    })
})

//Logout Commands for Automation Exercise
Cypress.Commands.add('logoutAutomationExercise', () => {
    cy.get("a[href='/logout']").should('be.visible').click()
})

import navbar from "../pages/shopist-page/navbar"
//click each links and verify - custom commands
Cypress.Commands.add('navbarLinksValidation', () => {
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