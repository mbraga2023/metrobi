const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

Cypress.Commands.add("generateScreenshotsPDF", () => {
    const screenshotsDir = path.join(Cypress.config("screenshotsFolder"));

    // Create unique filename using timestamp
    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    const outputPdf = path.join(
        "cypress/reports",
        `screenshots-${timestamp}.pdf`
    );

    const doc = new PDFDocument({ autoFirstPage: false });
    doc.pipe(fs.createWriteStream(outputPdf));

    function getAllScreenshots(dir) {
        let results = [];
        const list = fs.readdirSync(dir);

        list.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat && stat.isDirectory()) {
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

    console.log(`✅ PDF created at: ${outputPdf}`);
});