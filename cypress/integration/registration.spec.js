function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const uniqueId = getRandomIntInclusive(0, 99999999);
const validEmails = [
  'simple-{{uniqueId}}@example.com',
  'very.common-{{uniqueId}}@example.com',
  'disposable.style.email.with+symbol-{{uniqueId}}@example.com',
  'other.email-with-hyphen-{{uniqueId}}@example.com',
  'fully-qualified-domain-{{uniqueId}}@example.com',
  'user.name+tag+sorting-{{uniqueId}}@example.com',
  'x-{{uniqueId}}@example.com',
  'example-indeed-{{uniqueId}}@strange-example.com',
  'admin-{{uniqueId}}@mailserver1',
  'example-{{uniqueId}}@s.example',
  // '" "@example.org', // FIXME: should be valid
  // '"john..doe"-{{uniqueId}}@example.org', // FIXME: should be valid
  'mailhost!username-{{uniqueId}}@example.org',
  'user%example.com-{{uniqueId}}@example.org',
];
const invalidEmails = [
  'Abc.example.com',
  'A@b@c@example.com',
  'a"b(c)d,e:f;g<h>i[j\k]l@example.com',
  'just"not"right@example.com',
  'this is"not\allowed@example.com',
  'this\ still\"not\\allowed@example.com',
  '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
];
const validPasswords = [
  'password',
  'password123',
  'Password123',
  'Password[`~!@#$%^&*()_|+\\-=?;:\'",.<>\\{\\}\\[\\]\\\\\\/]123',
  'Password[`~!@#$%^&*()_|+\\-=?;:\'",.<>\\{\\}\\[\\]\\\\\\/]123ùàçà§',
];

describe("Registration", () => {
  beforeEach(() => {
    cy.server();
    cy.route('POST', '**/registration').as('registration');
  });

  it("should register user with valid emails", () => {
    validEmails.forEach(validEmail => {
      cy.visit("/");

      cy.get('[data-e2e="registration-email"]').type(validEmail.replace('{{uniqueId}}', uniqueId));
      cy.get('[data-e2e="registration-password"]').type('password');
      cy.get('[data-e2e="registration-privacy"] label').click();
      cy.get('[data-e2e="registration-submit"]').click();

      cy.wait('@registration');

      cy.get('[data-e2e="success-title"]').contains('Success!');
      cy.get('[data-e2e="success-button"]').click();
      cy.get('[data-e2e="success-title"]').should('not.exist');
    });
  });

  it("should NOT register user with invalid emails", () => {
    invalidEmails.forEach(validEmail => {
      cy.visit("/");

      cy.get('[data-e2e="registration-email"]').type(validEmail.replace('{{uniqueId}}', uniqueId));
      cy.get('[data-e2e="registration-password"]').type('password');
      cy.get('[data-e2e="registration-privacy"] label').click();
      cy.get('[data-e2e="registration-submit"]').should('be.disabled');
      cy.get('mat-error').contains('Enter a valid email')
    });
  });

  it("should register user with valid passwords", () => {
    validPasswords.forEach((validPassword, index) => {
      cy.visit("/");

      cy.get('[data-e2e="registration-email"]').type(`test-${uniqueId}${index}@test.com`);
      cy.get('[data-e2e="registration-password"]').type(validPassword);
      cy.get('[data-e2e="registration-privacy"] label').click();
      cy.get('[data-e2e="registration-submit"]').click();

      cy.wait('@registration');

      cy.get('[data-e2e="success-title"]').contains('Success!');
      cy.get('[data-e2e="success-button"]').click();
      cy.get('[data-e2e="success-title"]').should('not.exist');
    });
  });

  it("should NOT register user with password with less than 8 characters", () => {
    cy.visit("/");

    cy.get('[data-e2e="registration-email"]').type(`test-${uniqueId}@test.com`);
    cy.get('[data-e2e="registration-password"]').type('pw');
    cy.get('[data-e2e="registration-privacy"] label').click();

    cy.get('[data-e2e="registration-submit"]').should('be.disabled');
    cy.get('mat-error').contains('Enter a password with at least 8 characters')
  });

  it("should NOT register without privacy consents", () => {
    cy.visit("/");

    cy.get('[data-e2e="registration-email"]').type(`test-${uniqueId}@test.com`);
    cy.get('[data-e2e="registration-password"]').type('password');
    cy.get('[data-e2e="registration-submit"]').should('be.disabled');
  });

  it("should NOT register without privacy consents despite double click on it", () => {
    cy.visit("/");

    cy.get('[data-e2e="registration-email"]').type(`test-${uniqueId}@test.com`);
    cy.get('[data-e2e="registration-password"]').type('password');
    cy.get('[data-e2e="registration-privacy"] label').click();
    cy.get('[data-e2e="registration-privacy"] label').click();

    cy.get('[data-e2e="registration-submit"]').should('be.disabled');
    cy.get('mat-error').contains('Consents are required for the registration')
  });

  it("should have privacy policy link in registration panel", () => {
    cy.visit("/");

    cy.get('[data-e2e="registration-privacy-link"]').should('have.attr', 'target', '_blank').should('be.visible');
  });

  it("should have privacy policy legal texts", () => {
    cy.visit("/");

    cy.get('[data-e2e="registration-privacy-text"]')
      .contains('I confirm that I have read, consent and agree to our Privacy Policy')
      .contains('I am of legal age');
  });

});

