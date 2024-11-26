/// <reference types="cypress" />

describe('Realizar logins com diversas contas diferentes.', () => {

  beforeEach(() => {
    cy.visit('/').reload()
  })

  it('Realizar login com sucesso - Usuário 1.', () => {
    cy.fixture('perfil').then(login => {
      cy.login(login.usuario1, login.senha)
    })
    cy.get('.app_logo').should('contain', 'Swag Labs')
  })

  it('Realizar login com sucesso - Usuário 3.', () => {
    cy.fixture('perfil').then(login => {
      cy.login(login.usuario3, login.senha)
    })
    cy.get('[data-test="title"]').should('contain', 'Products')
  })

  it('Realizar login com sucesso - Usuário 4.', () => {
    cy.fixture('perfil').then(login => {
      cy.login(login.usuario4, login.senha)
    })
    cy.get('[data-test="title"]').should('contain', 'Products')
  })

  it('Realizar login com sucesso - Usuário 5.', () => {
    cy.fixture('perfil').then(login => {
      cy.login(login.usuario5, login.senha)
    })
    cy.get('[data-test="title"]').should('contain', 'Products')
  })

  it('Realizar login com sucesso - Usuário 6.', () => {
    cy.fixture('perfil').then(login => {
      cy.login(login.usuario6, login.senha)
    })
    cy.get('[data-test="title"]').should('contain', 'Products')
  })

  it('Erro ao realizar login - Usuário Bloqueado - Usuário 2.', () => {
    cy.fixture('perfil').then(login => {
      cy.login(login.usuario2, login.senha)
    })
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
  })
  
})