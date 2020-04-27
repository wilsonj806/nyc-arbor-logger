describe('Tests for application navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('interacts with a nav element, requests data, and renders stuff', async () => {
    let data = []
    try {
      const response = await fetch('http://localhost:5000/data/count')
      data = await response.json().then(json => Object.entries(json.data))
    } catch (e) {
      throw new Error(e)
    }

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
      .find('rect')
      .should('have.length', data.length)
  })

  it('navigates and makes a request for a different set of data', async () => {
    let data = []
    try {
      const response = await fetch('http://localhost:5000/data/staten%20island/species')
      data = await response.json().then(json => Object.entries(json.data))
    } catch (e) {
      throw new Error(e)
    }

    cy.get('body')
      .find('nav')
      .find('form[data-nav]')
      .find('select')
      .select('Qty Trees Per Borough')

    cy.get('nav')
    .find('form[data-nav]')
    .find('select')
    .select('Qty of Each Tree Species in a Borough')

    cy.get('nav')
    .find('form[data-nav]')
    .find('select[data-secondary]')
    .select('Staten Island')

    cy.get('nav > form[data-nav]')
      .contains('Go')
      .click()

    cy.get('#d3-stuff > svg')
      .find('rect')
      .should('have.length', data.length)
  })

  it('displays a loading message while fetching data', () => {
    cy.get('body')
    .find('nav')
    .find('form[data-nav]')
    .find('select')
    .select('Qty Trees Per Borough')

  cy.get('nav')
  .find('form[data-nav]')
  .find('select')
  .select('Qty of Each Tree Species in a Borough')

  cy.get('nav')
  .find('form[data-nav]')
  .find('select[data-secondary]')
  .select('Staten Island')

  cy.get('nav > form[data-nav]')
    .contains('Go')
    .click()

  cy.contains('Loading...')
  })

  it('displays an error message if a request failed', () => {
    cy.get('body')
      .find('nav')
      .find('form[data-nav]')
      .find('select')
      .select('Qty of Each Tree Species')

    cy.get('nav > form[data-nav]')
      .contains('Go')
      .click()

    cy.get('[role=alert]')
  })

  it('displays a modal on click of a button and closes it on click', () => {
    cy.contains('?')
      .click()

    cy.contains('About This Project')

    cy.contains('?')
      .click()
  })
})