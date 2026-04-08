import "./commands";
import "cypress-xpath";

before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    })
})

afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
        win.indexedDB.databases().then((dbs) => {
            dbs.forEach((db) => indexedDB.deleteDatabase(db.name));
        });
    });

});