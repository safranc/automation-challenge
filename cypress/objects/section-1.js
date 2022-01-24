class Section1 {
  getTable () {
    return cy.get('#alaya-table')
  }
  getViewTable () {
    return cy.get('#table-toggle-button')
  }
  getTableHeader () {
    return cy.get('[data-test=table-header]')
  }
  getForm () {
    return cy.get('#alaya-form')
  }
  getViewForm () {
    return cy.get('#form-toggle-button')
  }
  getName () {
    return cy.get('#fullName')
  }
  getAge () {
    return cy.get('#age')
  }
  getGender () {
    return cy.get('#gender')
  }
  getCheckBox () {
    return cy.get('#nurse')
  }
  getSubmitBtn () {
    return cy.get('[data-test=submit-btn]')
  }
}

module.exports = { Section1 }
