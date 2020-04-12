describe('Registration', () => {
  let form

  before(() => {
    cy.getFormData().then(formData => {
      form = formData
    })
  })

  beforeEach(() => {
    cy.server()
    cy.route('POST', '**/registration').as('registration')
  })

  it('should register user with valid emails', () => {
    form.validEmails.forEach(validEmail => {
      cy.visit('/')

      cy.get('[data-e2e="registration-email"]').type(validEmail.replace('{{uniqueId}}', form.uniqueId))
      cy.get('[data-e2e="registration-password"]').type('password')
      cy.get('[data-e2e="registration-privacy"] label').click()
      cy.get('[data-e2e="registration-submit"]').click()

      cy.wait('@registration')

      cy.get('[data-e2e="success-title"]').contains('Success!')
      cy.get('[data-e2e="success-button"]').click()
      cy.get('[data-e2e="success-title"]').should('not.exist')
    })
  })

  it('should NOT register user with invalid emails', () => {
    form.invalidEmails.forEach(validEmail => {
      cy.visit('/')

      cy.get('[data-e2e="registration-email"]').type(validEmail.replace('{{uniqueId}}', form.uniqueId))
      cy.get('[data-e2e="registration-password"]').type('password')
      cy.get('[data-e2e="registration-privacy"] label').click()
      cy.get('[data-e2e="registration-submit"]').should('be.disabled')

      cy.get('mat-error').contains('Enter a valid email')
    })
  })

  it('should register user with valid passwords', () => {
    form.validPasswords.forEach((validPassword, index) => {
      cy.visit('/')

      cy.get('[data-e2e="registration-email"]').type(`test-${form.uniqueId}${index}@test.com`)
      cy.get('[data-e2e="registration-password"]').type(validPassword)
      cy.get('[data-e2e="registration-privacy"] label').click()
      cy.get('[data-e2e="registration-submit"]').click()

      cy.wait('@registration')

      cy.get('[data-e2e="success-title"]').contains('Success!')
      cy.get('[data-e2e="success-button"]').click()
      cy.get('[data-e2e="success-title"]').should('not.exist')
    })
  })

  it('should NOT register user with password with less than 8 characters', () => {
    cy.getRandomIntInclusive().then(uniqueId => {
      cy.visit('/')

      cy.get('[data-e2e="registration-email"]').type(`test-${uniqueId}@test.com`)
      cy.get('[data-e2e="registration-password"]').type('pw')
      cy.get('[data-e2e="registration-privacy"] label').click()

      cy.get('[data-e2e="registration-submit"]').should('be.disabled')
      cy.get('mat-error').contains('Enter a password with at least 8 characters')
    })
  })

  it('should NOT register without privacy consents', () => {
    cy.getRandomIntInclusive().then(uniqueId => {
      cy.visit('/')

      cy.get('[data-e2e="registration-email"]').type(`test-${uniqueId}@test.com`)
      cy.get('[data-e2e="registration-password"]').type('password')
      cy.get('[data-e2e="registration-submit"]').should('be.disabled')
    })
  })

  it('should NOT register without privacy consents despite double click on it', () => {
    cy.getRandomIntInclusive().then(uniqueId => {
      cy.visit('/')

      cy.get('[data-e2e="registration-email"]').type(`test-${uniqueId}@test.com`)
      cy.get('[data-e2e="registration-password"]').type('password')
      cy.get('[data-e2e="registration-privacy"] label').click()
      cy.get('[data-e2e="registration-privacy"] label').click()

      cy.get('[data-e2e="registration-submit"]').should('be.disabled')
      cy.get('mat-error').contains('Consents are required for the registration')
    })
  })

  it('should have privacy policy link in registration panel', () => {
    cy.visit('/')

    cy.get('[data-e2e="registration-privacy-link"]').should('have.attr', 'target', '_blank').should('be.visible')
  })

  it('should have privacy policy legal texts', () => {
    cy.visit('/')

    cy.get('[data-e2e="registration-privacy-text"]')
      .contains('I confirm that I have read, consent and agree to our Privacy Policy')
      .contains('I am of legal age')
  })
})
