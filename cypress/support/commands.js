Cypress.Commands.add("takeScreenshot", (name) => {
    const safeName = name.replace(/[\/\\?%*:|"<>]/g, "-").replace(/\s+/g, "-");

    cy.then(() => {
        cy.screenshot(safeName, {
            overwrite: true,
            disableTimersAndAnimations: false
        });
        cy.task("log", `Screenshot taken: ${safeName}.png`);
    });
});