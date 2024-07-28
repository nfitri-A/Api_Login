// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginViaApi', (email, password) => {
    cy.request({
        method: 'POST',
        url: "https://practice.expandtesting.com/notes/api/users/login",
        body: {
            email: email,
            password: password,
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
            expect(response.body["message"]).to.eq("Login successful");
            const token = response.body["data"]["a4d837e25a7e4bc2a4fcd4cd532c67d1f91a8fee63774e26b08e629b208e4a99"];
            return token;
    });
});
