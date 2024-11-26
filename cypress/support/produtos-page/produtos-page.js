class produtosPage {
    visitarUrl() {
        cy.visit('/')
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.inventory_item').contains(nomeProduto).click()
    }

    visitarProduto(idProduto, nameProduto) {
        cy.visit(`/inventory-item.html?id=${idProduto}`, { failOnStatusCode: false })
        cy.get('[data-test="inventory-item-name"]').should('contain', nameProduto) 
    }

    addNoCarrinho() {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('.inventory_item').eq(3)
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.inventory_list').contains(nomeProduto).click()
        cy.get('[data-test="inventory-item-name"]').should('contain', nomeProduto)
        cy.get('[data-test="back-to-products"]').click()
    }

}

export default new produtosPage