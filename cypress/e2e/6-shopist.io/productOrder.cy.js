import homePage from "../../pages/shopist-page/homepage"
import allProducts from "../../pages/shopist-page/productsPage"
import cart from "../../pages/shopist-page/cart"
import navbar from "../../pages/shopist-page/navbar"
import productsPage from "../../pages/shopist-page/productsPage";

describe('Shopist example product order test', () => {
    // let chairsData
    before(() => {
        homePage.navigate()
        // cy.fixture('chair-data').then((data) => {
        //     chairsData = data
        //     return chairsData;
        // })
    });

    it('Click Shop Now and check lengths', () => {
        homePage.getShopNowBtn.click() //Click Shop Now Btn
        allProducts.getAllProducts.should('have.length', 9) //All product length
        allProducts.getAllProducts.find('.status.status--red').should('have.length', 2).and('contain', "Sold out") //sold out products length
    });

    it('Choose chair and add to cart then remove the item from cart', () => {
        //Click first chair 

        //burasi fixture kismina gecilince
        // productsPage.firstChair(chairsData.product01)
        // cy.then(() => {
        
        //assert the url, chair name, price and image
        productsPage.getProductFirstSofa.click()
        .then(() => {
            cy.url().should('contain', "/product/1") //cy.url yerine cy.location('href') yazilabilir eger eq denirse tam link yazilmali
            cy.get('.description > :nth-child(1) > :nth-child(1)').invoke('text').and('eq', "Wicker Chair")
            cy.get('.price').invoke('text').and('eq', "$250.00")
            cy.get('img.product-card').should('have.attr', 'src', '/_nuxt/img/1.71db95e.jpg')
        })
        //add to cart
        cart.addToCartBtn.click()

        //verify to cart 
        navbar.verifyCartCount('(1)')

        //go to cart
        navbar.getCart.click()

        //remove item
        cart.getRemoveBtn.click().then(() => {
            cart.getCartEmptyMsg.invoke('text').and('eq', "Your cart is currently empty.")
            cart.getCartEmptyMsg.should('have.text', "Your cart is currently empty.") //second option
            cart.getCartEmptyMsg.should('be.visible').and('contain', "empty")//third option
        })
    })

    it('Choose sofa and add to cart then checkout', () => {
        navbar.getSofas.click()
        productsPage.getProductFirstSofa.click()
        .then(() => {
            //assert the url, chair name, price and image
            cy.url().should('contain', "/product/1") //cy.url yerine cy.location('href') yazilabilir eger eq denirse tam link yazilmali
            cy.get('.description > :nth-child(1) > :nth-child(1)').invoke('text').and('eq', "Grey Tufted Couch")
            cy.get('.price').invoke('text').and('eq', "$850.00")
            cy.get('img.product-card').should('have.attr', 'src', '/_nuxt/img/10.9ede20f.jpg')
        })
        //add to cart
        cart.addToCartBtn.click()

        //verify to cart 
        navbar.verifyCartCount('(1)')

        //go to cart
        navbar.getCart.click()

        //invalid discount code and error message
        cy.get('section#main input').type('12345')
        cy.get('div.discount div').click()
        cy.get('section#main div.discount-toast').invoke('text').and('eq', "Coupon is invalid")
        cy.get('section#main input').clear()
        cy.get('div.checkout').should('be.visible').click()
        cy.get('div.checkout-title').invoke('text').and('eq', "Thank you!")

        //click continue shopping btn
        cy.get('section#main a > div').click()
    });
});