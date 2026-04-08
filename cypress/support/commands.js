Cypress.Commands.add("takeScreenshot", (name) => {
    // Take screenshot with the given name
    cy.screenshot(name);

    // Attach screenshot info to the current test for the Cucumber HTML report
    cy.task("log", `Screenshot taken: ${name}.png`);
});

