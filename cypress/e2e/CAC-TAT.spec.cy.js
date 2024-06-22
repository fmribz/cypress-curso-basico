/// <references types="Cypress" />
describe('Central de Atendimento ao Cliente - TAT', () => {
  beforeEach(() => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  })
  it('Verifica o título da aplicação', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
      .type('Fábio de Moraes', {delay:0})
    cy.get('#lastName')
      .type('Ribeiro', {delay:0})
    cy.get('#email')
      .type('mail@mail.com', {delay:0})
    cy.get('#open-text-area')
      .type('Quero ser milionário', {delay:0})
    cy.contains('.button', 'Enviar').click();

    cy.get('.success')
      .should('be.visible')
  })
  it('Exibe mensagem de erro ao submeter com um email com formatação inválida', () => {
    cy.get('#firstName')
      .type('Fábio de Moraes', {delay:0})
    cy.get('#lastName')
      .type('Ribeiro', {delay:0})
    cy.get('#email')
      .type('abcdefgk#fdsart-com', {delay:0})
    cy.get('#open-text-area')
      .type('Quero ser milionário', {delay:0})
    cy.contains('.button', 'Enviar').click();

    cy.get('.error')
      .should('be.visible')
  });
  it('Verifica se o campo telefone só aceita números', () => {
    cy.get('#phone')
      .type('asdfghjkl', {delay:0})
      .should('be.empty');
  });
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .type('Fábio de Moraes', {delay:0})
    cy.get('#lastName')
      .type('Ribeiro', {delay:0})
    cy.get('#email')
      .type('abcdefgk#fdsart-com', {delay:0})
    cy.get('#open-text-area')
      .type('Quero ser milionário', {delay:0})
    cy.get('#phone-checkbox')
      .check()
    cy.contains('.button', 'Enviar').click();

    cy.get('.error')
      .should('be.visible')
  });
  it('preenche e limpa os campos nome, sobrenome e demais outros', () => {
    cy.get('#firstName')
      .type('Fábio de Moraes', {delay:0})
      .should('have.value', 'Fábio de Moraes')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Ribeiro', {delay:0})
      .should('have.value', 'Ribeiro')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('abcdefgk#fdsart-com', {delay:0})
      .should('have.value', 'abcdefgk#fdsart-com')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('Quero ser milionário', {delay:0})
      .should('have.value', 'Quero ser milionário')
      .clear()
      .should('have.value', '')
  });
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click();

    cy.get('.error')
      .should('be.visible')
  });
  it('Enviar form com sucesso com comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
     cy.get('.success')
      .should('be.visible')
  });
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  });
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  });
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
    cy.get('input[type="radio"][value="elogio"]')
        .should('not.be.checked')
    cy.get('input[type="radio"][value="ajuda"]')
      .should('not.be.checked')
  });
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio)
          .check()
          .should('be.checked')
      })
  });
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  });
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .should('not.be.value')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) =>{
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .should('not.be.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(($input) =>{
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('arquivo')
    cy.get('#file-upload')
      .should('not.be.value')
      .selectFile('@arquivo')
      .should(($input) =>{
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });
})