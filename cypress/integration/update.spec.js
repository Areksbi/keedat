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

  it('should update user email', () => {
    form.validEmails.forEach(validEmail => {
      const updatedEmail = validEmail.replace('{{uniqueId}}', form.uniqueId)

      cy.visit('/')
      cy.register(updatedEmail, password)
      cy.login(updatedEmail, password)

      cy.get('[data-e2e="header-account"]').click()
      cy.get('[data-e2e="enable-update"]').click()

      cy.get('[data-e2e="update-email"]').clear().type(`2-${updatedEmail}`)
      cy.get('[data-e2e="update-account"]').click()

      cy.wait('@update').then(() => {
        expect(localStorage.getItem('email')).to.eq(`2-${updatedEmail}`)

        cy.get('[data-e2e="header-logout"]').contains('Logout').click()
        cy.get('.mat-tab-label').contains('Login')

        cy.login(`2-${updatedEmail}`, password)

        expect(localStorage.getItem('email')).to.eq(`2-${updatedEmail}`)
        cy.get('[data-e2e="header-logout"]').contains('Logout').click()
      })
    })
  })

  it('should update user password', () => {
    form.validPasswords.forEach(validPassword => {
      cy.getRandomIntInclusive().then(updatedUniqueId => {
        const updatedEmail = `${updatedUniqueId}${email}`
        cy.visit('/')

        cy.register(updatedEmail, validPassword)
        cy.login(updatedEmail, validPassword)

        cy.get('[data-e2e="header-account"]').click()
        cy.get('[data-e2e="enable-update"]').click()

        cy.get('[data-e2e="update-password"]').clear().type(validPassword)
        cy.get('[data-e2e="update-new-password"]').clear().type(`2-${validPassword}`)
        cy.get('[data-e2e="update-account"]').click()

        cy.wait('@update').then(() => {
          cy.get('[data-e2e="header-logout"]').contains('Logout').click()
          cy.get('.mat-tab-label').contains('Login')

          cy.login(updatedEmail, `2-${validPassword}`)

          cy.get('[data-e2e="header-logout"]').contains('Logout').click()
        })
      })
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

  it('should NOT update user email if the same but password', () => {
    cy.register(email, password)
    cy.login(email, password)

    cy.get('[data-e2e="header-account"]').click()
    cy.get('[data-e2e="enable-update"]').click()

    cy.get('[data-e2e="update-email"]').clear().type(email)
    cy.get('[data-e2e="update-password"]').clear().type(password)
    cy.get('[data-e2e="update-new-password"]').clear().type(`2-${password}`)
    cy.get('[data-e2e="update-account"]').click()

    cy.wait('@update').then(() => {
      expect(localStorage.getItem('email')).to.eq(email)

      cy.get('[data-e2e="header-logout"]').contains('Logout').click()
      cy.get('.mat-tab-label').contains('Login')

      cy.login(email, `2-${password}`)

      cy.get('[data-e2e="header-logout"]').contains('Logout')
      expect(localStorage.getItem('email')).to.eq(email)
    })
  })

  it('should NOT update if everything is empty', () => {
    cy.register(email, password)
    cy.login(email, password)

    cy.get('[data-e2e="header-account"]').click()
    cy.get('[data-e2e="enable-update"]').click()

    cy.get('[data-e2e="update-email"]').clear()
    cy.get('[data-e2e="update-password"]').clear()
    cy.get('[data-e2e="update-new-password"]').clear()

    cy.get('[data-e2e="update-account"]').should('be.disabled')
  })

  it('should NOT update if password is the same', () => {
    cy.register(email, password)
    cy.login(email, password)

    cy.get('[data-e2e="header-account"]').click()
    cy.get('[data-e2e="enable-update"]').click()

    cy.get('[data-e2e="update-password"]').clear().type(password)
    cy.get('[data-e2e="update-new-password"]').clear().type(password)

    cy.get('[data-e2e="update-password"]').focus()
    cy.get('mat-error').contains('Enter a valid different password')
    cy.get('[data-e2e="update-account"]').should('be.disabled')
  })
})
