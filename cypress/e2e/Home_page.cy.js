/// <reference types="Cypress" />

const { ConnectionCreatedEvent } = require("mongodb")

const testUsername = 'bob@bob.com'
const testUserPW = '123456789'

describe('home page mobile', () => {
  
  beforeEach(() => {
    cy.viewport("iphone-4")
    cy.visit('http://localhost:8000/')
  })
  context('mobile view menu', () => {

    it('mobile nav visible on click', () => {
      // cy.visit('http://localhost:8000/')
      cy.get("[data-test='mobile-menu']").should('not.be.visible')
      cy.get("[data-test='mobile-nav']").should('be.visible')
      cy.get("[data-test='mobile-nav']").click()
      cy.get("[data-test='mobile-menu']").should('be.visible')
      
    })
  
    
  })
  
  context('login and logout',()=>{
    it('mobile menu login and logout', () => {
      cy.get("[data-test='mobile-nav']").click()
      cy.get("[data-test='mobile-menu'] li [ href='/login']").click()
      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:8000/login')
      })
      cy.get("#email").type(testUsername)
      cy.get("#password").type(testUserPW)
      cy.get("form > .btn").click()
      cy.location().should((loc)=>{
        expect(loc.href).to.eq('http://localhost:8000/repair')
      })
  
      cy.get("[data-test='avatar-menu']").click()
      cy.get("[data-test='avatar-menu'] li").should('be.visible')
      cy.get("[data-test='avatar-menu'] li").should(($li)=>{
        if($li.length < 2){
          throw new Error('no avatar menu links')
        }
      })
      cy.get("[data-test='avatar-menu'] li a[ href='/logout']").click()

  
    })
    
  })

})