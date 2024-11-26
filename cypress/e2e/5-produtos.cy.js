/// <reference types="cypress" />

import produtosPage from "../support/produtos-page/produtos-page"

describe('Pesquisar produtos.', () => {

    beforeEach(() => {
        cy.visit('/').reload() // Trava o erro de autenticação e recarrega a pagina
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario1, login.senha)
        })
    })

    it('Pesquisar produto com sucesso.', () => {
        cy.get('#item_0_title_link').should('contain', 'Sauce Labs Bike Light')
        cy.get('#item_1_title_link').should('contain', 'Sauce Labs Bolt T-Shirt')
        cy.get('#item_2_title_link').should('contain', 'Sauce Labs Onesie')
        cy.get('#item_3_title_link').should('contain', 'Test.allTheThings() T-Shirt (Red)')
        cy.get('#item_4_title_link').should('contain', 'Sauce Labs Backpack')
        cy.get('#item_5_title_link').should('contain', 'Sauce Labs Fleece Jacket')
    })

    it('Pesquisar produto - Pelo url usando comando customizado e id.', () => {
        produtosPage.visitarProduto('0', 'Sauce Labs Bike Light')
        produtosPage.visitarProduto('1', 'Sauce Labs Bolt T-Shirt')
        produtosPage.visitarProduto('2', 'Sauce Labs Onesie')
        produtosPage.visitarProduto('3', 'Test.allTheThings() T-Shirt (Red)')
        produtosPage.visitarProduto('4', 'Sauce Labs Backpack')
        produtosPage.visitarProduto('5', 'Sauce Labs Fleece Jacket')
    })

    it('Pesquisar produto - Pelo nome usando comando customizado.', () => {
        produtosPage.buscarProdutoLista('Sauce Labs Bike Light')
        produtosPage.buscarProdutoLista('Sauce Labs Bolt T-Shirt')
        produtosPage.buscarProdutoLista('Sauce Labs Onesie')
        produtosPage.buscarProdutoLista('Test.allTheThings() T-Shirt (Red)')
        produtosPage.buscarProdutoLista('Sauce Labs Backpack')
        produtosPage.buscarProdutoLista('Sauce Labs Fleece Jacket')
    })

    it('Pesquisar produto - Pelo url usando fixture.', () => {
        cy.fixture('produtos').then(produtos => {
            cy.produtos(produtos[0].id, produtos[0].name)
            cy.produtos(produtos[1].id, produtos[1].name)
            cy.produtos(produtos[2].id, produtos[2].name)
            cy.produtos(produtos[3].id, produtos[3].name)
            cy.produtos(produtos[4].id, produtos[4].name)
            cy.produtos(produtos[5].id, produtos[5].name)
        })
    })

    it('Pesquisar produto - Usando a posição (eq).', () => {
        cy.get('.inventory_item').eq(3).should('contain', 'Sauce Labs Fleece Jacket')
        cy.get('.inventory_item').eq(1).should('contain', 'Sauce Labs Bike Light')
        cy.get('.inventory_item').eq(0).should('contain', 'Sauce Labs Backpack')
        cy.get('.inventory_item').eq(5).should('contain', 'Test.allTheThings() T-Shirt (Red)')
        cy.get('.inventory_item').eq(2).should('contain', 'Sauce Labs Bolt T-Shirt') 
        cy.get('.inventory_item').eq(4).should('contain', 'Sauce Labs Onesie')
        cy.get('.inventory_item').first().should('contain', 'Sauce Labs Backpack')
        cy.get('.inventory_item').last().should('contain', 'Test.allTheThings() T-Shirt (Red)')
    })
})
