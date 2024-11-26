/// <reference types="cypress" />

describe('Demonstrando alguns erros e Bugs simulados e reais.', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.intercept('POST', 'https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN', {statusCode: 401}).as('bug'), {timeout: 500}
        cy.intercept('POST', 'https://events.backtrace.io/api/summed-events/submit?universe=UNIVERSE&token=TOKEN', {statusCode: 401}).as('bug'), {timeout: 500}
    })

    it('Deve demonstrar erro de autenticação de usuário com conta invalida - Erro.', () => {
        cy.login('fulano', '123')
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user in this service')
    })

    it('Deve demonstrar erro de imagem na conta problem_user - Erro.', () => {
        cy.login('problem_user', 'secret_sauce')
        cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').should('be.visible')
    })

    it('Deve demonstrar bug de performance no site na conta performance_glitch_user - Bug.', () => {
        cy.login('performance_glitch_user', 'secret_sauce')
        cy.get('.title').should('contain', 'Products')
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')
        cy.get('[data-test="item-3-title-link"]').should('contain', 'Test.allTheThings() T-Shirt (Red)')
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        cy.get('[data-test="item-2-title-link"]').should('contain', 'Sauce Labs Onesie')
        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')
        cy.get('[data-test="item-4-title-link"]').should('contain', 'Sauce Labs Backpack')
        cy.get('[data-test="product-sort-container"]').select('Price (high to low)')
        cy.get('[data-test="item-5-title-link"]').should('contain', 'Sauce Labs Fleece Jacket')
    })

    it('Deve demonstrar bug de adicionar itens ao carrinho na conta problem_user - Bug.', () => {
        cy.login('problem_user', 'secret_sauce')
        cy.get('.inventory_item_name').eq(3).click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'ITEM NOT FOUND')
        cy.get('[data-test="add-to-cart"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('body').should('contain', 'You need to enable JavaScript to run this app.')
    })

    it('Deve demonstrar bug de checkout na conta problem_user - Bug.', () => {
        cy.login('problem_user', 'secret_sauce')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Ismael')
        cy.get('[data-test="lastName"]').type('Gabriel')
        cy.get('[data-test="postalCode"]').type('1875665')
        cy.get('.input_error').eq(0).should('have.attr', 'value')
    })

    it('Deve demonstrar bug Request, Method: POST, Status code: (401) - TOKEN  - Bug Real.', () => {
        cy.wait('@bug', {timeout: 25000}).then(interception => {
            expect(interception.response.statusCode).to.equal(401, 'Ocorreu um erro de autenticação')
        })
        cy.visit('/').reload() //recarregando a pagina trava o bug e as mensagens de erro constantes 
    })
    
})