/// <reference types="cypress" />
import produtosPage from '../support/produtos-page/produtos-page'

describe('Fluxo de compra', () => {

    beforeEach(() => {
        cy.visit('/').reload() // Trava o erro de autenticação e recarrega a pagina
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario1, login.senha)
        })
    })

    it('Realizar fluxo de compra de ponta a ponta.', () => {
        produtosPage.addNoCarrinho()
        produtosPage.visitarProduto('0', 'Sauce Labs Bike Light')
        cy.get('#add-to-cart').click()
        cy.get('#back-to-products').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.fixture('checkout').then(checkout => {
            cy.checkout(checkout[1].nome, checkout[1].sobrenome, checkout[1].cep)
        })
        cy.get('#continue').click()
        cy.get('#finish').click()
        cy.get('[data-test="checkout-complete-container"]').should('contain', 'Thank you for your order!')
        
    })
})