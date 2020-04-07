function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const uniqueId = getRandomIntInclusive(0, 99999999)
const email = `${uniqueId}-${Cypress.config('email')}`
const password = 'password'

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.route('DELETE', `**/delete/*`).as('delete')
  })

  it('should delete user', () => {
    cy.register(email, password)
    cy.login(email, password)

    cy.get('[data-e2e="header-account"]').click()
    cy.get('[data-e2e="delete-user"]').click()

    cy.wait('@delete')
    cy.get('.mat-tab-label').contains('Login')

    cy.login(email, password)
    cy.get('[data-e2e="error-text"]').contains('Auth failed')
    cy.get('[data-e2e="error-button"]').click()
    cy.get('[data-e2e="error-text"]').should('not.exist')
  })
})
