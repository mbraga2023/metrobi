const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "cypress/reports",
    reportPath: "cypress/reports/html",
    metadata: {
        browser: {
            name: "chrome",
            version: "latest",
        },
        device: "Local test machine",
        platform: {
            name: "macOS / Windows",
        },
    },
});