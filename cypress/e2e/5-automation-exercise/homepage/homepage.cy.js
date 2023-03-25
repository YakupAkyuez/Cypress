import { HomePage } from "../../../pages/automation-exercise-pages/homepage.cy"

const homepage = new HomePage()

describe("Homepage verification", () => {
    it('Navigate to URL, then verify the title and URL', () => {
        homepage.navigate()
        .verifyTitle("Automation Exercise")
        .verifyTheURL('automationexercise.com')
    })

    it('Verify the headers menu and length', () => {
        homepage.headersMenu()
        cy.get('@headersMenu').each(($el, index) => {
            cy.log("Headers Menu: " + index + " : " + $el.text())
            cy.wrap($el).its('length').should('eq', 1)
        })
    })
})