const { Section2 } = require('../objects/section-2')
const section2 = new Section2()
/// <reference types="Cypress" />

before(function () {
  cy.fixture('example').then(function (data) {
    this.data = data
  })
})

// Acceptance Criteria - Network Delay Call
// Click on the following button to trigger an abnormally long network call (+10sec)
// Assert the status of the answer
// Assert the payload of the returned object
// Assert that the UI shows an alert message and its content should equal "Abnormally long network call!"

describe('Network Delays', function () {
  it('HTTP Call', function () {
    cy.visit('/section-2')
    cy.intercept(Cypress.config('apiUrl')).as('createBoard')
    section2.getNetworkCall().click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(this.data.assertionText.alertText2)
    })

    cy.wait('@createBoard').then(({ request, response }) => {
      expect(request.method).to.equal(this.data.request.method)
      expect(request.url).to.contain(this.data.request.url)
      expect(response.statusCode).to.eq(this.data.response.status)
      expect(response.body).property('id').to.not.be.oneOf([null, ''])
      expect(response.body).property('title').to.contain(this.data.response.title)
      expect(response).to.have.property('headers')
    })
  })
})

// Acceptance Criteria - Opening a New Tab
// Click on the following button to trigger a new tab opening
// Assert that the button does what's it's supposed to do

describe('New Tab', function () {
  it('MultiTab Support', function () {
    section2.getNewTab().invoke('removeAttr', 'target')
    cy.visit('/')
    cy.title().should('eq', this.data.pageTitle1)
  })
})

// Acceptance Criteria - Downloading a File
// Click on the following button to trigger a file download
// Assert that the button does what's it's supposed to do

describe('File Download', function () {
  it('Assert Image Download', function () {
    cy.visit('/section-2')
    section2.getDownloadBtn().should('have.attr', 'href').then((href) => {
      cy.request(href).as('download')
      cy.get('@download').should((response) => {
        expect(response.status).to.eq(this.data.response.status)
      })
    })
  })
})
