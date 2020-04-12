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

Cypress.Commands.add('getRandomIntInclusive', (min = 0, max = 99999999) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
})

Cypress.Commands.add('getFormData', () =>
  cy.getRandomIntInclusive().then(uniqueId => cy.fixture('form').then(form => ({ uniqueId, ...form })))
)
