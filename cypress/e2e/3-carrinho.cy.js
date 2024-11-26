/// <reference types="cypress" />

context('Funcionalidade carrinho.', () => {

    beforeEach(() => {
        cy.visit('/').reload() // Trava o erro de autenticação e recarrega a pagina
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario1, login.senha)
        })
    })

    it('Adicionar item ao carrinho.', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack')
    })

    it('Remover item do carrinho.', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="title"]').should('contain', 'Your Cart')

    })

    it('Remover todos os itens do carrinho.', () => { 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_button').should('be.visible').click({multiple: true})
        cy.get('[data-test="title"]').should('contain', 'Your Cart')
    })

})