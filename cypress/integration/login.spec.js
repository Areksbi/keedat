describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '**/login').as('login')

    cy.visit('/')
    cy.get('.mat-tab-label').contains('Login').click()
  })

  it('should login', () => {
    cy.get('[data-e2e="login-email"]').type(Cypress.config('email'))
    cy.get('[data-e2e="login-password"]').type(Cypress.config('password'))
    cy.get('[data-e2e="login-submit"]').click()

    cy.wait('@login')

    cy.get('[data-e2e="header-logout"]').contains('Logout')
  })

  it('should NOT login with wrong email', () => {
    cy.get('[data-e2e="login-email"]').type(`wrong-${Cypress.config('email')}`)
    cy.get('[data-e2e="login-password"]').type(Cypress.config('password'))
    cy.get('[data-e2e="login-submit"]').click()

    cy.wait('@login')

    cy.get('[data-e2e="error-text"]').contains('Auth failed')
    cy.get('[data-e2e="error-button"]').click()
    cy.get('[data-e2e="error-text"]').should('not.exist')
  })

  it('should NOT login with wrong password', () => {
    cy.get('[data-e2e="login-email"]').type(Cypress.config('email'))
    cy.get('[data-e2e="login-password"]').type(`wrong-${Cypress.config('password')}`)
    cy.get('[data-e2e="login-submit"]').click()

    cy.wait('@login')

    cy.get('[data-e2e="error-text"]').contains('Auth failed')
    cy.get('[data-e2e="error-button"]').click()
    cy.get('[data-e2e="error-text"]').should('not.exist')
  })

  it('should NOT login with empty email', () => {
    cy.get('[data-e2e="login-password"]').type(Cypress.config('password'))
    cy.get('[data-e2e="login-submit"]').should('be.disabled')
  })

  it('should NOT login with empty password', () => {
    cy.get('[data-e2e="login-email"]').type(Cypress.config('email'))
    cy.get('[data-e2e="login-submit"]').should('be.disabled')
  })
})
