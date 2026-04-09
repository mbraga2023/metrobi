Cypress.Commands.add("takeScreenshot", (stepName) => {
    // Get the current test title from Cypress runnable state
    const test = cy.state("runnable"); // 🔹 this is the current test

    const testName = (test?.title || "unknown-test")
        .replace(/[\/\\?%*:|"<>]/g, "-")
        .replace(/\s+/g, "-");

    const safeStep = (stepName || "step")
        .replace(/[\/\\?%*:|"<>]/g, "-")
        .replace(/\s+/g, "-");

    const fileName = `${testName}--${safeStep}`;

    cy.screenshot(fileName, {
        overwrite: true,
        disableTimersAndAnimations: false,
    });
});