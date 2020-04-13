describe('Login', () => {
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
    cy.route('PUT', `**/update/*`).as('update')
  })

  it.only('should update user email', () => {
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

  it('should update user password', () => {
    cy.register(email, password)
    cy.login(email, password)

    cy.get('[data-e2e="header-account"]').click()
    cy.get('[data-e2e="enable-update"]').click()

    cy.get('[data-e2e="update-password"]').clear().type(password)
    cy.get('[data-e2e="update-new-password"]').clear().type(`2-${password}`)
    cy.get('[data-e2e="update-account"]').click()

    cy.wait('@update').then(() => {
      cy.get('[data-e2e="header-logout"]').contains('Logout').click()
      cy.get('.mat-tab-label').contains('Login')

      cy.login(email, `2-${password}`)

      cy.get('[data-e2e="header-logout"]').contains('Logout')
    })
  })

  it('should update user email and password', () => {
    cy.register(email, password)
    cy.login(email, password)

    cy.get('[data-e2e="header-account"]').click()
    cy.get('[data-e2e="enable-update"]').click()

    cy.get('[data-e2e="update-email"]').clear().type(`2-${email}`)
    cy.get('[data-e2e="update-password"]').clear().type(password)
    cy.get('[data-e2e="update-new-password"]').clear().type(`2-${password}`)
    cy.get('[data-e2e="update-account"]').click()

    cy.wait('@update').then(() => {
      expect(localStorage.getItem('email')).to.eq(`2-${email}`)

      cy.get('[data-e2e="header-logout"]').contains('Logout').click()
      cy.get('.mat-tab-label').contains('Login')

      cy.login(`2-${email}`, `2-${password}`)

      cy.get('[data-e2e="header-logout"]').contains('Logout')
      expect(localStorage.getItem('email')).to.eq(`2-${email}`)
    })
  })
})
