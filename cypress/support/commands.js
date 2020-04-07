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
Cypress.Commands.add('register', (email, password) => {
  cy.server()
  cy.route('POST', '**/registration').as('registration')

  cy.visit('/')

  cy.get('[data-e2e="registration-email"]').type(email)
  cy.get('[data-e2e="registration-password"]').type(password)
  cy.get('[data-e2e="registration-privacy"] label').click()
  cy.get('[data-e2e="registration-submit"]').click()

  cy.wait('@registration')
})
Cypress.Commands.add('login', (email, password) => {
  cy.server()
  cy.route('POST', '**/login').as('login')

  cy.visit('/')

  cy.get('.mat-tab-label').contains('Login').click()
  cy.get('[data-e2e="login-email"]').type(email)
  cy.get('[data-e2e="login-password"]').type(password)
  cy.get('[data-e2e="login-submit"]').click()

  cy.wait('@login')
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
