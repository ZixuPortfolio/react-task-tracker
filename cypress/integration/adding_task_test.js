import Button from "../../src/components/Button"


describe('Add Task Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Can Open Add Task Form via Add Button', () => {
    cy.get('#FormOpenClose').click()
  })

  it('Can Add Task Details', () => {
    cy.get('.add-form').within(() => {
      cy.get('#TaskTitle').type('Take a walk')
      cy.get('#TaskDateTime').type('Sep 6th at 7.00pm')
      cy.get('#TaskReminder').check()
    })
  })

  it('Can Sumbit New Task', () => {
    cy.get('.add-form').submit()
  })

  it('Can Close Add Task Form via Close Button', () => {
    cy.get('#FormOpenClose').click()
  })

  it('can remove first task out of the four tasks', () => {
    cy.get('.task').should('have.length', 4)
    cy.get('.task').first().get('#remove').click()
    cy.get('.task').should('have.length', 3)
  })

})

describe('State Checking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('can reload default state of show add form to be hidden', () => {
    cy.get('#FormOpenClose').click()
    cy.get('.add-form')
    cy.reload()
    cy.get('.add-form').should('not.exist')
  })

  it('can expect task to be reloaded into default state', () => {
    cy.get('.task').should('have.length', 3)
    cy.get('.task.reminder').should('have.length', 2)
    cy.get('.task').first().get('#remove').click() //remove first 
    cy.get('.task').should('have.length', 2)
    cy.get('.task.reminder').should('have.length', 1)
    cy.get('.task').last().dblclick()
    cy.get('.task.reminder').should('have.length', 2)
    cy.reload()
    cy.get('.task').should('have.length', 3)
    cy.get('.task.reminder').should('have.length', 2)
  })

  it('can ensure add task form to be empty when reloaded', () => {
    cy.get('#FormOpenClose').click()
    cy.get('.add-form')
    cy.get('.add-form').within(() => {
      cy.get('#TaskTitle').type('dslfbdskbf')
      cy.get('#TaskDateTime').type('sc ,dxc , ')
      cy.get('#TaskReminder').check()
    })
    cy.reload()
    cy.get('#FormOpenClose').click()
    cy.get('.add-form').within(() => {
      cy.expect('#TaskTitle').to.have.string('')
      cy.expect('#TaskDateTime').to.have.string('')
      //cy.expect('#TaskReminder').to.be.false
    })
  })
})