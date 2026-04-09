const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
require("dotenv").config();


// ✅ IMPORT helper
const { generateTestPDF } = require("./cypress/plugins/pdfGenerator");

module.exports = defineConfig({
  env: {
    USERNAME: process.env.USER,
    PASSWORD: process.env.PASSWORD,
  },

  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: false,
    numTestsKeptInMemory: 0,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    chromeWebSecurity: false,


    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // ✅ REGISTER TASKS
      on("task", {
        generateTestPDF({ testName, status }) {
          const screenshotsDir = config.screenshotsFolder;
          return generateTestPDF({ testName, status, screenshotsDir });
        },
        log(message) {
          console.log(message);
          return null;
        }
      });

      return config;
    },

    cucumber: {
      stepDefinitions: "cypress/support/step_definitions/**/*.js",
    },
  },
});