export function assertText(getText, expectedText) {
    getText().then((actualText) => {
        expect(actualText).to.contain(expectedText)
    })
}

const API_URL = Cypress.env('BASE_URL')
const CREDENTIALS = {
    username: Cypress.env('USER'),
    password: Cypress.env('PASSWORD')
}

export function getAuthToken() {
    return cy.request({
        method: 'POST',
        url: `${API_URL}/auth`,
        body: CREDENTIALS,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body.token;
    })
}