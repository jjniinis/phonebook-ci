describe("Phonebook", function() {
  beforeEach(function() {
    cy.visit('http://localhost:3001')
  })
  
  it("page can be opened", function() {
    cy.contains("Add a new number")
    cy.contains("add")
  })
})