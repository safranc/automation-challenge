class Section2 {
  getNetworkCall () {
    return cy.get('[data-test=network-call-button]')
  }
  getNewTab () {
    return cy.get('#new-tab-button')
  }
  getDownloadBtn () {
    return cy.get('#file-download-button')
  }
}
module.exports = { Section2 }
