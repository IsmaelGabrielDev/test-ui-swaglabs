/// <reference types="cypress" />

describe('Realizar logout com sucesso de varias contas.', () => {
    
    beforeEach(() => {
        cy.visit('/').reload() // Trava o erro de autenticação e recarrega a pagina
    })

    it('Realizar logout com sucesso - Usuário 1.', () => {
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario1, login.senha)
        })
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.get('.login_logo').should('contain', 'Swag Labs')
    })

    it('Realizar logout com sucesso - Usuário 3.', () => {
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario3, login.senha)
        })
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.get('.login_logo').should('contain', 'Swag Labs')
    })

    it('Realizar logout com sucesso - Usuário 4.', () => {
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario4, login.senha)
        })
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.get('.login_logo').should('contain', 'Swag Labs')
    })

    it('Realizar logout com sucesso - Usuário 5.', () => {
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario5, login.senha)
        })
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.get('.login_logo').should('contain', 'Swag Labs')
    })

    it('Realizar logout com sucesso - Usuário 6.', () => {
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario6, login.senha)
        })
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.get('.login_logo').should('contain', 'Swag Labs')
    })


})