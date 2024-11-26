Cypress.Commands.add('login', (usuario, senha) => { 
    cy.get('#user-name').type(usuario)
    cy.get('[data-test="password"]').type(senha), {log: false}
    cy.get('#login-button').click()
})

Cypress.Commands.add('checkout', (nome, sobrenome, cep) => {
    cy.get('#first-name').type(nome)
    cy.get('#last-name').type(sobrenome)
    cy.get('#postal-code').type(cep)
})

Cypress.Commands.add('produtos', (id, name) => {
    cy.visit(`/inventory-item.html?id=${id}`, { failOnStatusCode: false })
    cy.get('[data-test="inventory-item-name"]').should('contain', name) 
})