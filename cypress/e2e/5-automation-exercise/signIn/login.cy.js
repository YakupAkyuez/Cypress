import { HomePage } from '../../../pages/automation-exercise-pages/homepage.cy';
import { SignInPage } from '../../../pages/automation-exercise-pages/sigInPages.cy';

const homepage = new HomePage()
const signIn = new SignInPage()

const { faker } = require('@faker-js/faker')
let fakeName = faker.name.firstName()
let fakeMail = faker.internet.email()

describe("Login Page Test", () => {
    beforeEach(() => {
        homepage.navigate()
        homepage.goToSignInPage()
        homepage.verifyTitle("Automation Exercise - Signup / Login")
        homepage.verifyTheURL('/login')
    })

    it('Click SignIn button without filling fields and verify the error messages', () => {
        signIn.loginBtn()
        signIn.loginEmailErrorMsg("Please fill out this field.")
        signIn.loginEmail(fakeName)
        signIn.loginEmailErrorMsg(`Please include an '@' in the email address. '${fakeName}' is missing an '@'.`)
        signIn.loginEmail(fakeMail)
        signIn.loginBtn()
        signIn.loginPasswordErrorMsg("Please fill out this field.")
        signIn.loginPassword(fakeName)
        signIn.loginBtn()
        signIn.verifyTheErrorMsg('Your email or password is incorrect!')
        signIn.clearSignUpTextFields()
    })

    //Login first option with fixtures
    //Created userdata.json in fixtures and added invalid email, password
    it('Login User with invalid email and password', () => {    
        cy.fixture("credentials").as("users")
        cy.get('@users').then((data) => {
            cy.loginAutomationExercise(data.loginInvalidEmail, data.loginInvalidPassword)
        })
        .then(() => {
            signIn.verifyTheErrorMsg('Your email or password is incorrect!')
        })
        signIn.clearSignUpTextFields()
    })

    //Login second option with session
    //Created cypress.env.json and added email, password
    it.skip('Login User with valid email and password', () => {
        cy.loginViaSessionAutomationExercise(Cypress.env("email"), Cypress.env("pass"))
    })

    it('Logout User', () => {
        cy.fixture("credentials").as("users")
        cy.get('@users').then((data) => {
            cy.loginAutomationExercise(data.loginValidEmail, data.loginValidPassword)
        })
        cy.logoutAutomationExercise()
        homepage.verifyTheURL('/login')
    })
})