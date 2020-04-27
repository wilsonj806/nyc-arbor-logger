describe('Tests for application navigation', () => {
  it('interacts with a nav element, requests data, and renders stuff', () => {
    cy.visit('http://localhost:3000/')

    cy.get('body')
      .find('nav')
      .find('form[data-nav]')
      .find('select')
      .select('Qty Trees Per Borough')

    cy.get('nav')
    .find('form[data-nav]')
    .find('select')
    .select('Qty Trees Per Borough')

    cy.get('nav > form[data-nav]')
      .contains('Go')
      .click()

    cy.get('#d3-stuff > svg')
  })

  it('displays a modal on click of a button', () => {
    cy.contains('?')
      .click()

    cy.get('section.modal')
  })
})