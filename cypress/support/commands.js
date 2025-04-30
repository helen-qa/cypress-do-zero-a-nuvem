Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
firstName: 'John',
lastName: 'Doe',
email: 'johndoe@example.com',
text: 'Test.' // esses valores foram definidos como padrão
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text) // campo Como podemos te ajudar? Algum elogio ou feedback para nós?
    //cy.get('button[type="submit"]').click() // botão enviar
    cy.contains('button', 'Enviar').click() // botão enviar
})