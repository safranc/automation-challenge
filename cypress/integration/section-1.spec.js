const { Section1 } = require('../objects/section-1')
const section1 = new Section1()

/// <reference types="Cypress" />

// Acceptance Criteria for Problem 1
// Assert that the table is not visible
// After clicking the "Show table" button, assert the table is visible
// Assert that the table is 5 columns wide
// Assert that the table is 10 rows long, excluding the first (header) row
// Assert that at least 5 entries have the role "user"
// Assert there are exactly 3 people older than 60 years old

describe('Problem 1', function () {
  it('DOM:Tables', function () {
    cy.visit('/section-1')
    section1.getTable().should('not.be.visible')
    section1.getViewTable().click()
    section1.getTable().should('be.visible')
    section1.getTableHeader().find('th').should('have.length', 5)
    section1.getTable().find('tr:not(:first)').should('have.length', 10)
    section1.getTable().find('tbody :nth-child(5):contains("user")').its('length').should('be.gte', 5)
    section1.getTable().find('tbody :nth-child(4):contains("195")').its('length').should('be.gte', 3)
    section1.getViewTable().click()
  })
})

// Acceptance Criteria for Problem 2
// Assert that the form is not visible
// After clicking the "Show form" button, assert that the form is visible
// Fill in the "Name" and "Age" inputs, and assert that both inputs are filled
// Select "Female" from the select option, and assert that the value is "female"
// Tick the "Nurse" checkbox and assert that the value "nurse" is true
// Click on the "Submit" button and assert that there is an alert window showing with the text "Form submitted!"

describe('Problem 2', function () {
  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })

  it('DOM:Form', function () {
    section1.getForm().should('not.be.visible')
    section1.getViewForm().click()
    section1.getForm().should('be.visible')
    section1.getName().type(this.data.name).its('length').should('be.gte', 1)
    section1.getAge().type(this.data.age).invoke('val').should((value) => {
      expect(Number.isInteger(+value), 'input is an integer').to.eq(true)
    })

    section1.getGender().select(this.data.gender.option2).should('have.value', this.data.assertionText.labelFemale)
    section1.getCheckBox().check().should('be.checked').and('not.include.text', this.data.assertionText.labelNurse)
    section1.getSubmitBtn().click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(this.data.assertionText.alertText1)
    })
  })
})
