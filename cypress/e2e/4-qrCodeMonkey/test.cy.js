
import { QrCodeMonkey } from "../../pages/qrCodeMonkey-pages/qrCodePageObject.cy";
import { QrCodeMonkeyHomePages } from "../../pages/qrCodeMonkey-pages/homepage.cy";

const qrCode = new QrCodeMonkey()
const qrCodeHomePage = new QrCodeMonkeyHomePages()
const path = require("path");

describe('QRCodeMonkey, Test Suite-1: Validate the title, headers, submenus urls', () => {
    before(() => {
        qrCodeHomePage.navigate()
        qrCode.acceptAllCookies()    
    })

    it('TC_001: Navigate to QR Code Monkey web site, then validate the title and URL', () => {
        qrCode.validateTheTitle('QRCode Monkey - The free QR Code Generator to create custom QR Codes with Logo')
        qrCodeHomePage.verifyTheURL('qrcode-monkey')
    })

    it('TC_002: Validate the headers menu with URL locators', () => {
        //First: Validated headers menu and logged with cy.log
        cy.get('.menu.d-none.d-lg-block li').as('headersMenu')
        cy.get('@headersMenu').should('be.visible')
        cy.get('@headersMenu').each(($el, index) => {
            cy.log("Index: " + index + " : " + $el.text()) 
        })

        cy.get('@headersMenu').eq(1).should('contain', "About")
        cy.get('@headersMenu').eq(2).should('contain', "Chrome App")
        cy.get('@headersMenu').eq(3).should('contain', "QR Code API")
        cy.get('@headersMenu').eq(4).should('contain', "English")
        
        //Second: Validated headers menu with URL locators
        qrCode.validateHeadersMenuWithUrlLocators('About', 'Chrome App', 'QR Code API', 'English')
    })

    it('TC_003: Validate the submenus with URL locators', () => {
        //Clicked each submenus, then validated URL's between #url and #bitcoins
        let urlTexts = ["url", "text","email", "phone", "sms", "vcard", "mecard", "maps", "facebook", "twitter", "youtube", "wifi", "event", "bitcoin"];
        let arrayLength = urlTexts.length;
        for (let i = 1; i <= arrayLength; i++) {
            const urlSelector = `div.type-bar-inner > a:nth-child(${i})`
            cy.get(urlSelector).click()
            cy.url().should('contain', urlTexts[i-1])
        }       

        //Clicked each submenus URL's and just logged urls - removed
        // cy.get('.type-bar-inner > a').as('subMenus').each(($el, index) => {
        //     cy.log("Submenu: " + index + " : " + $el.text())
        //     cy.wrap($el).should('be.visible).click()
        // })
    })

    it('TC_004: Validate the submenus More and others, then verify the pop-up and close', () => {
        //Clicked more, then verified pop-up and close
        cy.get('.type-bar-inner > ul > li > a').should('be.visible').click() //More button
        cy.get('.icon-exit').last().should('be.visible').click() //closed pop-up
    })
})

describe('QRCodeMonkey, Test Suite-2: Working with QR Design and Download', () => {
    before(() => {
        qrCodeHomePage.navigate()
        qrCode.acceptAllCookies()
    })

    after('Clear downloads folder', () => {
        cy.exec('rm cypress/downloads/*', { log: true, failOnNonZeroExit: false })        
    })

    it('TC_005: Validate the QRCode Generator Form with button', () => {
        qrCode.validateTheSetting('Enter Content')
        
        //Validated green and blue buttons
        cy.get('#button-create-qr-code').should('be.visible').and('contain', 'Create QR Code')
        cy.get('#button-download-qr-code-png').should('be.visible').and('contain', 'Download')
        
        //Validated image formats
        cy.get('.btn.btn-outline-primary').as('imageFormat').each(($el, index) => {
            cy.log("ImageFormat: " + index + " : " + $el.text())
            cy.wrap($el).should('be.visible')
        })
    })

    it('TC_006: "Validate the Enter Content is active or inactive, if inactive then make it an active', () => {
        cy.get('div.pane.active > div.pane-header > div.minus > i').then((icon) => {
            if (icon.hasClass('fa fa-minus')) {
                cy.get('div.pane.active > div.pane-header > div.minus > i').should("have.attr","class","fa fa-minus")
              } else {
                cy.get('div:nth-child(1) > div.pane-header > div.plus > i').click()
              }
        })
    })

    it('TC_007: "If "Your URL" input field has URL, then clear and Click Create QR Code button and validate the Error messages', () => {
        
        //Clear the input field
        cy.yourUrlInputField()

        //Input Field is empty and click create qr code
        .then(() => {
            cy.get('@inputField').should('be.empty')
            qrCode.createQrBtn()
            
            //For Error Messages
            cy.get('form[name="urlForm"]').should('be.visible').and('contain', 'Enter a valid URL')
            cy.get('.alert.alert-danger').should('be.visible').and('contain', 'There are errors you have to fix before generating.')
        })
    })

    it('TC_008: Type new URL to "Your URL" input field', () => {
        cy.get('#qrcodeUrl').should('be.visible').type('https://miktadozturk.medium.com/')
    })

    it('TC_009: Click OFF button, then validate to free sign up pop-up and close', () => {
        cy.get("img[src='/img/toggle-switch-placeholder.png']").should('be.visible').click()
        cy.get('div:nth-child(7) > div > div > div > div.header.white > div.close > i').should('be.visible').click()
    })

    it('TC_010: Then click Set Colors, Validate the checked single color and change foreground colors and get all Messages', () => {
        qrCode.openSetColor()
        cy.get("input[type='radio'][value='single']").should('be.checked')

        //Foreground color changed black to white and get recommendation message
        cy.get('div.color-picker-input-wrapper.input-group').first().click().clear().type('#FFFFFF' + '{ESC}').then(() => {
            cy.get('div[class="fade-animation alert alert-warning"]').should('be.visible').and('contain', 'We recommend to make your color darker')
        })

        //Background color changed white to black and get recommendation messages
        cy.get('div.color-picker-input-wrapper.input-group').last().click().clear().type('#000000' + '{ESC}')
        .then(() => {
            cy.get('div[class="fade-animation alert alert-warning"]').should('be.visible').and('contain', 'Make sure there is enough contrast to the darker foreground.')
            cy.get('div[class="alert alert-warning"]').should('be.visible').and('contain', 'Warning We recommend to give your colors more contrast between back- and foreground to work with all QR code readers.')
        })
    })

    it('TC_011: Change to colors default then select to Color Gradient', () => {
        //Make it default
        cy.get('div.color-picker-input-wrapper.input-group').first().click().clear().type('#000000' + '{ESC}')
        cy.get('div.color-picker-input-wrapper.input-group').last().click().clear().type('#FFFFFF' + '{ESC}')

        //Select to Color Gradient and validate to second color and linear gradient
        cy.get("input[type='radio'][value='gradient']").check()
        .then(() => {
            cy.get('div.color-picker-input-wrapper.input-group').eq(2).should('be.visible') //Second Color default blue
            cy.get('.input-group .input-group-btn').first().should('be.visible') //Linear Gradient
        })

        //Changed to color with white and get recommendation messages
        cy.get('div.color-picker-input-wrapper.input-group').eq(2).clear().type('#FFFFFF' + '{ESC}')
        .then(() => {
            cy.get('div[class="fade-animation alert alert-warning"]').should('be.visible').and('contain', 'We recommend to make your color darker')
            cy.get('div[class="alert alert-warning"]').should('be.visible').and('contain', 'Warning We recommend to give your colors more contrast between back- and foreground to work with all QR code readers.')
        })

        //Make it blue then try to Linear Gradient
        cy.get('div.color-picker-input-wrapper.input-group').eq(2).clear().type('#0277BD' + '{ESC}')
        cy.get('.input-group .input-group-btn').first().click()
    })

    it('TC_012: Select to Custom Eye Color then validate to colors with Copy Foreground and try to copy foreground', () => {
        //Selected custom eye color and validated colors and copy foreground
        cy.get('div.color-group.color-group-body > div:nth-child(3)').should('be.visible').click()
        .then(() => {
            cy.get('div[class="fade-animation"]').should('be.visible').and('contain', 'Eye Color')
            cy.get('.btn-copy').should('be.visible').and('contain', 'Copy Foreground')
        })

        //Used to Copy foreground
        cy.get('.btn-copy').click()

    })

    it('TC_013: Then click Add Logo Image and Upload an image bigger than 2 MB', () => {
        cy.get('div:nth-child(3) > div.pane-header').should('be.visible').click()
        
        //Upload image more than 2 MB and validate the error message
        const fileName = 'images/bird.jpg'
        cy.fixture('images/bird.jpg')
        .then(Cypress.Blob.base64StringToBlob) //Convert the image into Blob
        .then((fileContent) => {
          cy.get('.logo-preview').attachFile(
            {fileContent, fileName, mimeType: 'image/**'},{subjectType: 'drag-n-drop'})
        })
        .then(() => {
            qrCode.imageUploadErrorMessage(' File is too big. Max. size is 2 MB.')
        })
    })

    it('TC_014: Upload an Image smaller than 2 MB', () => {
        cy.get('.logo-preview').attachFile({filePath: "images/mozturk.jpg" }, {subjectType: 'drag-n-drop'})
        .then(() => {
            qrCode.removeBtn()
        })
    })

    it('TC_015: Remove Logo and choose another logo from the bottom then check remove background behind logo', () => {
        cy.get('.btn.btn-default').click()
        .then(() => {
            cy.get('.sprite-logo-qrcodemonkey').should('be.visible').click()
        })
        cy.get('div[class="form-group"] label[class="form-check-label"]').should('be.visible').click()
    })

    it('TC_016: Click the Customize Design and make it QR design', () => {
        qrCode.customizeDesign()

        cy.get('.sprite.sprite-body.sprite-mosaic').should('be.visible').click() //Body Shape Mosaic
        cy.get('.sprite.sprite-frame5').should('be.visible').click() //Eye Frame Shape-5
    })

    it('TC_017: Change the QR Quality', () => {
        cy.wait(1000)
        cy.xpath("//span[@class='rz-pointer rz-pointer-min']")
        .trigger('mousedown')
        .trigger('mousemove', 'right')
        .trigger('mouseup')
    })

    it('TC_018: Click QR Code Template and Validate the length', () => {
        qrCode.qrCodeTemplates()
        cy.get('.row [ng-repeat="template in TemplateService.templates"]').its("length").should("be.gt", 12)
        cy.get('.row [ng-repeat="template in TemplateService.templates"]').its("length").should("eq", 13)
        cy.get('div[class="close"] i[class="fa fa-times"]').click()
    })

    it('TC_019: Click on QR Code template, then select all QR codes one by one', () => {
        for(let i=1; i<14; i++){
            const selector = `div.templates.fade-animation > div > div > div:nth-child(2) > div:nth-child(${i})> div`
            qrCode.qrCodeTemplates()
            cy.get(selector).click()
        }
    })

    it('TC_020: Create QR Code, then download png', () => {
        
        //Created QR code and downloaded png format
        qrCode.createQrBtn()
        cy.get('#button-download-qr-code-png').should('be.enabled').click()

        qrCode.downloadingQr('Please do not refresh or close the window.')
        cy.wait(10000)

        
    })

    it('TC_021: Close the pop-up', () => {
        cy.get('div.wrapper.original-variant > div > div.info > div.header > div.close > i').click()  
    })

    it('TC_022: Verify the downloaded file', () => {
        const downloadsFolder = Cypress.config("downloadsFolder")
        cy.readFile(path.join(downloadsFolder, "qr-code.png")).should("exist")
    })
})



