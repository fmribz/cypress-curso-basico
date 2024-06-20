Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName')
      .type('Fábio de Moraes', {delay:0})
    cy.get('#lastName')
      .type('Ribeiro', {delay:0})
    cy.get('#email')
      .type('mail@mail.com', {delay:0})
    cy.get('#open-text-area')
      .type('Quero ser milionário', {delay:0})
    cy.contains('.button', 'Enviar').click();
})