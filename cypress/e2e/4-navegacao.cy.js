/// <reference types="cypress" />
import produtosPage from '../support/produtos-page/produtos-page'

describe('Realizar navegacao entre paginas.', () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', () => { return false }) // Ignorar o erro de autorização e acessa a pagina
        cy.visit('/').reload() // Trava o erro de autenticação e recarrega a pagina
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario1, login.senha)
        })
    })

    it('Realizar navegacao entre paginas - Name (Z to A).', () => {
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')
        cy.get('.inventory_item_name').should('contain', 'Backpack')
    })

    it('Realizar navegacao entre paginas - Name (A to Z).', () => {
        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')
        cy.get('.inventory_item').eq(2).should('contain', 'Sauce Labs Bolt T-Shirt')
    })

    it('Realizar navegacao entre paginas - Preço (high to low).', () => {
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
    })

    it('Realizar navegacao entre paginas - Preço (low to high).', () => {
        cy.get('[data-test="product-sort-container"]').select('Price (high to low)')
        cy.get('.inventory_item_name').should('contain', 'Test.allTheThings() T-Shirt (Red)')
    })

    it('Realizar navegacao entre paginas - Abrir pagina do produto pelo navegador.', () => {
        produtosPage.visitarProduto('2', 'Sauce Labs Onesie')
        
    })

    it('Realizar navegacao entre paginas - Abrir pagina do produto.', () => {
        cy.get('.inventory_item_name').eq(0).click()
        cy.get('[data-test="back-to-products"]').should('contain', 'Back to products')
    })

    it('Realizar navegacao entre paginas - Abrir pagina do produto e fechar a pagina do produto.', () => {
        cy.get('.inventory_item_name').eq(3).click()
        cy.get('[data-test="back-to-products"]').click()
        cy.get('.title').should('contain', 'Products')
    })

    it('Realizar navegacao entre paginas - Abrir a sidebar Menu.', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('.bm-cross-button').should('contain', 'Close Menu')
    })

    it('Realizar navegacao entre paginas - Entrar na pagina Sauce Labs.', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="about-sidebar-link"]').click()
        cy.get('.MuiTypography-root').should('contain', 'The world relies on your code.')
    })

    it('Realizar navegacao entre paginas - Entrar na rede social Twitter.', () => {
        cy.get('[data-test="social-twitter"]').invoke('removeAttr', 'target').click()
        cy.get('.r-dnmrzs > .css-146c3p1 >').should('contain', 'Sauce Labs').should('be.visible')
    })

    it('Realizar navegacao entre paginas - Entrar na rede social Facebook.', () => {
        cy.get('[data-test="social-facebook"]').invoke('removeAttr', 'target').click()
        cy.get('h1').should('contain', 'Sorry, something went wrong.').should('be.visible')
    })

    it('Realizar navegacao entre paginas - Entrar na rede social Linkedin.', () => {
        cy.get('[data-test="social-linkedin"]').invoke('removeAttr', 'target').click()
        cy.get('.contextual-sign-in-modal__modal-dismiss').click()
        cy.get('.top-card-layout__title').should('contain', 'Sauce Labs').should('be.visible')
    })

    it('Realizar navegacao entre paginas - Entrar no carrinho.', () => {
        cy.get('#shopping_cart_container').click()
        cy.get('[data-test="title"]').should('contain', 'Your Cart')
    })

    it('Realizar navegacao entre paginas - Continuar comprando.', () => {
        cy.get('#shopping_cart_container').click()
        cy.get('[data-test="continue-shopping"]').click()
        cy.get('[data-test="title"]').should('contain', 'Products')
    })

    it('Realizar navegacao entre paginas - Checkout.', () => {
        cy.get('#shopping_cart_container').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information')
    })

    it('Realizar navegacao entre paginas - Finalizar compra.', () => {
        cy.get('#shopping_cart_container').click()
        cy.get('[data-test="checkout"]').click()
        cy.checkout('Ismael', 'Gabriel', '1875665')
        cy.get('#continue').click()
        cy.get('[data-test="finish"]').should('contain', 'Finish')
    })

})
