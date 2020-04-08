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
    cy.route('PUT', `**/update/*`).as('update')
  })

  it('should update user email', () => {
    cy.register(email, password)
    cy.login(email, password)

    cy.get('[data-e2e="header-account"]').click()
    cy.get('[data-e2e="enable-update"]').click()

    cy.get('[data-e2e="update-email"]').clear().type(`2-${email}`)
    cy.get('[data-e2e="update-account"]').click()

    cy.wait('@update').then(() => {
      expect(localStorage.getItem('email')).to.eq(`2-${email}`)

      cy.get('[data-e2e="header-logout"]').contains('Logout').click()

      cy.get('.mat-tab-label').contains('Login')

      cy.login(`2-${email}`, password)

      cy.get('[data-e2e="header-logout"]').contains('Logout')
      expect(localStorage.getItem('email')).to.eq(`2-${email}`)
    })
  })
})
