import "./commands";
import "cypress-xpath";

Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("postMessage")) {
        return false; // prevent Cypress from failing the test
    }
});

before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    })
})

afterEach(() => {
    cy.url().then((url) => {
        const origin = new URL(url).origin;
        const clearStorage = () => {
            cy.clearCookies();
            cy.clearLocalStorage();
            cy.window().then((win) => {
                win.sessionStorage.clear();
            });
        };

        if (origin === 'https://metrobi.com') {
            cy.origin('https://metrobi.com', clearStorage);
        } else {
            clearStorage();
        }
    });
});

after(() => {
    cy.location("origin").then((origin) => {
        if (origin.includes("metrobi.com")) {
            cy.origin("https://metrobi.com", () => {
                cy.clearCookies();
                cy.clearLocalStorage();
            });
        } else {
            cy.clearCookies();
            cy.clearLocalStorage();
        }
    });
});