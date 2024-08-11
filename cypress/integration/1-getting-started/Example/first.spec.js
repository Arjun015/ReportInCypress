///<reference types = "cypress"/>

describe('verify the JS-alerts in cypress',function(){

    beforeEach(function(){
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    })

    // alert
    it('TC_01-verify the JS alert ok button',function(){
        
        cy.on('window:alert',function(str){
            expect(str).to.eq('I am a JS Alert')
            return true
        })
        cy.contains('Click for JS Alert').click({force:true})
        cy.get('#result').should('have.text','You successfully clicked an alert')
    })

    // confirm 

    it('TC_02- verify the JS confirm alert with Ok button',function(){
        cy.on('window:confirm',function(str){
            expect(str).to.eq('I am a JS Confirm')
            return true
        })
        cy.contains('Click for JS Confirm').click()
        cy.get('#result').should('have.text','You clicked: Ok')

    })

    it('TC_03- verify the JS confirm alert with cancel button',function(){
        cy.on('window:confirm',function(str){
            expect(str).to.eq('I am a JS Confirm')
            return false
        })
        cy.contains('Click for JS Confirm').click()
        cy.get('#result').should('have.text','You clicked: Cancel')

    })

    it('TC-04-verify the JS prompt alert with ok button',function(){
        cy.window().then(function(win){
            cy.stub(win,'prompt').returns('Arjun')
            cy.contains('Click for JS Prompt').click()
        })
        cy.get('#result').should('have.text','You entered: Arjun')


    })

    it('TC-05-verify the JS prompt alert with cancel button',function(){
        cy.window().then(function(win){
            cy.stub(win,'prompt').returns(null)
            cy.contains('Click for JS Prompt').click()
        })
        cy.get('#result').should('have.text','You entered: null')


    })
})