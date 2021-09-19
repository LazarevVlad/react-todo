
it('renders empty todo app', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').should('be.visible')
    cy.get('button').should('be.enabled')
    cy.get('ul').should('be.empty')
// expect(true).to.equal(true)
})

it('adds todo', () => {
  cy.visit('http://localhost:3000/')
  cy.get('input').type('first todo')
  cy.get('button').click()
  cy.get('ul > li').contains('first todo')
})

it('edit todo', () => {
  cy.visit('http://localhost:3000/')
  cy.get('input').type('first todo')
  cy.get('button').click()
  cy.get('ul > li > p').dblclick()
  cy.get('button').contains('Edit')
})