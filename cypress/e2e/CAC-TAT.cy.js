describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html') // Visita a aplicação  
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT') // Valida o título da página
    })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwyz', 10)
    cy.get('#firstName').type('Helen')
    cy.get('#lastName').type('Simeoni')
    cy.get('#email').type('teste_emailnaoexiste@gmail.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 }) // campo Como podemos te ajudar? Algum elogio ou feedback para nós?
    //cy.get('button[type="submit"]').click() // botão enviar
    cy.contains('button', 'Enviar').click() // botão enviar

    cy.get('.success').should('be.visible') // exibição de "mensagem enviada com sucesso"
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Helen')
    cy.get('#lastName').type('Simeoni')
    cy.get('#email').type('teste_emailnaoexiste@gmail.com,br')
    cy.get('#open-text-area').type('Teste') // campo Como podemos te ajudar? Algum elogio ou feedback para nós?
    //cy.get('button[type="submit"]').click() // botão enviar
    cy.contains('button', 'Enviar').click() // botão enviar
    
    cy.get('.error').should('be.visible') // exibição de mensagem de erro
  })

//it.only é utilizado quando você quer rodar apenas 1 teste específico e os demais, não. Para rodar todos os testes, não pode ter it.only em nenhum

it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
  cy.get('#phone')
    .type('abcde')
    .type('%$#*(')
    .should('have.value', '')
  })

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.get('#firstName').type('Helen')
  cy.get('#lastName').type('Simeoni')
  cy.get('#email').type('teste_emailnaoexiste@gmail.com,br')
  cy.get('#open-text-area').type('Teste') // campo Como podemos te ajudar? Algum elogio ou feedback para nós?
  cy.get('#phone-checkbox').click()
  //cy.get('button[type="submit"]').click() // botão enviar
  cy.contains('button', 'Enviar').click() // botão enviar

  cy.get('.error').should('be.visible')
  })

it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  cy.get('#firstName')
    .type('Helen')
    .should('have.value', 'Helen')
    .clear()
    .should('have.value', '')
  cy.get('#lastName')
    .type('Simeoni')
    .should('have.value', 'Simeoni')
    .clear()
    .should('have.value', '')
  cy.get('#email')
    .type('teste_emailnaoexiste@gmail.com,br')
    .should('have.value', 'teste_emailnaoexiste@gmail.com,br')
    .clear()
    .should('have.value', '')
  cy.get('#phone')
    .type('12345')
    .should('have.value', '12345')
    .clear()
    .should('have.value', '')
  })

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  //cy.get('button[type="submit"]').click() // botão enviar
  cy.contains('button', 'Enviar').click() // botão enviar
  
  cy.get('.error').should('be.visible') // exibição de mensagem de erro
  })


//Exercicio extra 7
it('envia o formulário com sucesso usando um comando customizado', () => {
  
  //const data = {
    //firstName: 'Helen',
    //lastName: 'Simeoni',
    //email: 'teste_emailnaoexiste@gmail.com.br',
    //text: 'Teste.'
  //}
    
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
  })

// Aula 3
it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
  .select('YouTube') // seleciona pelo texto visível
  .should('have.value', 'youtube') // verifica pelo value correto
  })

  // Aula 3 - Exercicio extra 1
it('seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product')
  .select('mentoria')
  .should('have.value', 'mentoria')
  })

  // Aula 3 - Exercicio extra 2
it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')
  })

//Aula 04.md - Exercício
it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"]').check('feedback')
  .should('have.value', 'feedback')
  })

 //Aula 04.md - Exercício - outra forma de fazer - MELHOR PRÁTICA
it('marca o tipo de atendimento "Feedback"', () => { 
   cy.get('input[type="radio"][value="feedback"]')
   .check()
   .should('be.checked')
  })

//Aula 04.md - Exercício Extra
it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
    .each((radioButton) => {
      cy.wrap(radioButton)
        .check()
        .should('be.checked')
     })
 })

//Aula 05.md  - Exercício
it('marca ambos checkboxes, depois desmarca o último',() => {
cy.get('input[type="checkbox"]')
.check()
.should('be.checked')
.last()
.uncheck()
.should('not.be.checked')
})

//Aula 05.md - Exercício Extra
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.get('#firstName').type('Helen')
  cy.get('#lastName').type('Simeoni')
  cy.get('#email').type('teste_emailnaoexiste@gmail.com,br')
  cy.get('#open-text-area').type('Teste') // campo Como podemos te ajudar? Algum elogio ou feedback para nós?
  cy.get('#phone-checkbox').check()
  .should('be.checked')
  //cy.get('button[type="submit"]').click() // botão enviar
  cy.contains('button', 'Enviar').click() // botão enviar

  cy.get('.error').should('be.visible')
  })


//Aula 06.md - Exercício
it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload')
   .selectFile('cypress/fixtures/cypress.png')
    .should(input => {
      expect(input[0].files[0].name).to.equal('cypress.png')
  })
    //.then((meuArquivoDeUpload) => {
    //expect(meuArquivoDeUpload[0].files[0].name).to.equal('cypress.png')
    //})
 })

//Aula 06.md - Exercício extra 1
it('seleciona um arquivo simulando um drag-and-drop', () => {
cy.get('#file-upload')
  .selectFile('cypress/fixtures/cypress.png', {action: 'drag-drop'})
  .should(input => {
    expect(input[0].files[0].name).to.equal('cypress.png')
  })
 // .then((meuArquivo) => {
 //   expect(meuArquivo[0].files[0].name).to.equal('cypress.png')
//})
  })

//Aula 06.md - Exercício extra 2
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('cypress.png').as('sampleFile')
  cy.get('#file-upload')
    .selectFile('@sampleFile')
    .then((meuArquivo) =>{
      expect(meuArquivo[0].files[0].name).to.equal('cypress.png')})
  })

//Aula 07.md - Exercício
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.contains('a', "Política de Privacidade")
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
 // <a href="privacy.html" target="_blank">Política de Privacidade</a>
  })

//Aula 07.md - Exercício extra 1 - CORRIGIR******
it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', "Política de Privacidade")
    .invoke('removeAttr', 'target')
    .click()

   cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

})