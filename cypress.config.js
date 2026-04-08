const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
require("dotenv").config();

module.exports = defineConfig({
  env: {
    USERNAME: process.env.USER,
    PASSWORD: process.env.PASSWORD,
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    experimentalSessionAndOrigin: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );


      // Merge all tasks here
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        generateScreenshotsPDF() {
          const screenshotsDir = path.join(config.screenshotsFolder);
          const outputPdf = path.join("cypress/reports/screenshots.pdf");

          const doc = new PDFDocument({ autoFirstPage: false });
          doc.pipe(fs.createWriteStream(outputPdf));

          function getAllScreenshots(dir) {
            let results = [];
            const list = fs.readdirSync(dir);
            list.forEach((file) => {
              const filePath = path.join(dir, file);
              const stat = fs.statSync(filePath);
              if (stat.isDirectory()) {
                results = results.concat(getAllScreenshots(filePath));
              } else if (file.endsWith(".png")) {
                results.push(filePath);
              }
            });
            return results;
          }

          const screenshots = getAllScreenshots(screenshotsDir);

          screenshots.forEach((imgPath) => {
            const img = fs.readFileSync(imgPath);
            const image = doc.openImage(img);
            doc.addPage({ size: [image.width, image.height] });
            doc.image(img, 0, 0);
          });

          doc.end();
          console.log(`PDF with all screenshots created at: ${outputPdf}`);
          return null;
        },
      });

      return config;
    },

    cucumber: {
      stepDefinitions: "cypress/support/step_definitions/**/*.js",
    },
  },
});