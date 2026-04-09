import "./commands";
import "cypress-xpath";

Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("postMessage")) {
        return false;
    }
});

beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.window().then(async (win) => {
        win.sessionStorage.clear();

        // 🔥 clear IndexedDB
        if (win.indexedDB.databases) {
            const dbs = await win.indexedDB.databases();
            for (const db of dbs) {
                win.indexedDB.deleteDatabase(db.name);
            }
        }

        // 🔥 clear Cache Storage
        if ("caches" in win) {
            const keys = await win.caches.keys();
            await Promise.all(keys.map((k) => win.caches.delete(k)));
        }
        cy.window().then((win) => {
            win.sessionStorage.clear();
            win.sessionStorage.setItem("cypress-session", "true");
        });
    });
});

afterEach(function () {

    const test = this.currentTest;
    if (!test) return;

    const testName = (test.title || "unknown-test")
        .replace(/[\/\\?%*:|"<>]/g, "-")
        .replace(/\s+/g, "-")
        .replace(/\(.*?\)$/g, "").trim();

    const status = test.state;

    cy.wait(500);

    cy.then(() => {
        cy.task("generateTestPDF", { testName, status });
    });

    // ❗ DO NOT CHANGE (your logic preserved)
    cy.url().then((url) => {
        const origin = new URL(url).origin;

        const clearStorage = () => {
            cy.clearCookies();
            cy.clearLocalStorage();
            cy.window().then((win) => win.sessionStorage.clear());
        };

        if (origin === "https://metrobi.com") {
            cy.origin("https://metrobi.com", clearStorage);
        } else {
            clearStorage();
        }
    });
});
