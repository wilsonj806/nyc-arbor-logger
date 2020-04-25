describe('A simple app test', () => {
  it('visits home', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(500)
  })
})