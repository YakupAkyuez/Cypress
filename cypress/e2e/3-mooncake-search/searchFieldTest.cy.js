import { MoonCakeHomePages } from "../../pages/mooncake-searchPages/homepage.cy";
import { MoonCakeSearchPages } from "../../pages/mooncake-searchPages/search.cy";

const homePages = new MoonCakeHomePages()
const searchPages = new MoonCakeSearchPages()
const sizes = ['iphone-8', 'ipad-2', 'samsung-s10', 'macbook-16']
var searchText = "Qalas Team"

describe('Mooncake-Search Functionality - Story1, Story2, Story3', () => {
    beforeEach(() => {
        cy.loginViaSession(Cypress.env("username"), Cypress.env("password"))
        //Different viewports
        sizes.forEach((viewportSizeChecks) => {
            cy.viewport(viewportSizeChecks)
            cy.log('Mobile viewport for: ' + viewportSizeChecks)
        })
    })

    it('Verify the title and URL', () => {
        homePages.navigate()
        homePages.verifyTitle('Moon Cake - mooncake')
        homePages.verifyTheURL('mooncake.staffbase.rocks')
    })

    it('Search Text, Then click More Result button And verify the expected result with match result', () => {
        homePages.navigate()
        //Here search the "Qalas Team" and verify the matched result
        cy.search(searchText)
        .then(() => {
            searchPages.secondSearchFieldVerifyText(searchText)
        })
        cy.get('[role="region"] > div').as('resultLinks').each(($el, index) => {
            cy.log("Result: " + index + " : " + $el.text())             
            if ($el.text().includes(searchText)) {
                cy.wrap($el).should('be.visible')
            }
        })

        //Here verify the all results and top results
        const totalResult = "All Results (11)"
        const topResultShow = "Top ResultsShowing 11 of 11 results"
        searchPages.allResultsBtn()
        cy.get('@resultsBtn').should('be.visible').each(($el, index) => {
            //Logged all buttons the cypress console
            cy.log("Button: " + index + " : " + $el.text())  
        })
        .then(($value) => {
            length = $value.length
            cy.get('@resultsBtn').its('length').should('eq', length)
            //Logged all search results the cypress console.
            cy.log('Number of search results button found: ' + length)
            .then(() => {
                cy.get('@resultsBtn').first().should('have.text', totalResult)
            })
        })        
        searchPages.topResultShow(topResultShow)
    })
})
