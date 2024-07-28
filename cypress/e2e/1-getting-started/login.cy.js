import { faker } from '@faker-js/faker';

describe('try to register and log in in using the API', () => {
    it('Create a new user account', () => {
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email();
        const password = faker.internet.password( { length: 6 });
    cy.request({
        method: "POST",
        url: "https://practice.expandtesting.com/notes/api/users/register",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: {
            name: randomName,
            email: randomEmail,
            password: password,
        },
    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body["message"]).to.eq("User account created successfully")
    });
    });

    it('success login and get profil', () => {
        const email = 'nfitria@gmail.com';
        const password = 'MF1117100429';

        cy.loginViaApi(email, password).then((token) => {
            cy.request({
                method: "GET",
                url: "https://practice.expandtesting.com/notes/api/users/profile",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "x-auth-token": "a4d837e25a7e4bc2a4fcd4cd532c67d1f91a8fee63774e26b08e629b208e4a99",
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body["message"]).to.eq("Profile successful");
            });
        });
    });
});