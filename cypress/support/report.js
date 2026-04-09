const report = require("multiple-cucumber-html-reporter");
const timestamp = require("../utils/timestamp");

report.generate({
    jsonDir: "cypress/reports",
    reportPath: `cypress/reports/html-${timestamp}`,
});