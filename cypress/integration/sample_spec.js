
it('renders empty todo app', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').should('be.visible')
    cy.get('button').should('be.disabled')
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
  const todoText = 'first todo'
  cy.visit('http://localhost:3000/')
  cy.get('input').type(todoText)
  cy.get('button').click()

  const newTodoText = 'hello'
  cy.get('input').should('be.empty')
  cy.get('ul > li > p').dblclick()
  cy.get('button').contains('Edit')
  cy.get('input').should('have.value', todoText)
  cy.get('input').type(newTodoText)
  cy.get('button').click()

  cy.get('ul > li').contains(newTodoText)
})

it('delete todo', () => {
  const todoText = 'first todo'
  cy.visit('http://localhost:3000/')
  cy.get('input').type(todoText)
  cy.get('button').click()
  cy.get('ul > li').contains(todoText)

  cy.get('ul').should('not.be.empty')
  cy.get('span').click()
  cy.get('ul').should('be.empty')
})