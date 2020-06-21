describe('Delete', () => {
  let email
  let form
  let password
  let uniqueId

  beforeEach(() => {
    cy.getFormData().then(formData => {
      form = formData
      uniqueId = form.uniqueId
      email = `${uniqueId}-${form.email}`
      password = form.password
    })

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
