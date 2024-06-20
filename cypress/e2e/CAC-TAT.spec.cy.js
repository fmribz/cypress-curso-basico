/// <references types="Cypress" />
describe('Central de Atendimento ao Cliente - TAT', () => {
  it('Verifica o título da aplicação', () => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
})