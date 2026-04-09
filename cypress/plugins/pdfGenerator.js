const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

/**
 * Recursively get all PNG screenshots from a directory
 */
function getAllScreenshots(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;

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

/**
 * Generate a PDF from screenshots
 */
function generateTestPDF({ testName, status, screenshotsDir }) {
    const reportsDir = path.join("cypress", "reports");
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

    // timestamp
    const now = new Date();
    const timestamp = `${String(now.getDate()).padStart(2, "0")}-${String(
        now.getMonth() + 1
    ).padStart(2, "0")}-${now.getFullYear()}-${String(now.getHours()).padStart(
        2,
        "0"
    )}h-${String(now.getMinutes()).padStart(2, "0")}mm`;

    const outputPdf = path.join(reportsDir, `${testName}-${status}-${timestamp}.pdf`);

    const allScreenshots = getAllScreenshots(screenshotsDir);

    // filter only screenshots for this test
    const testScreenshots = allScreenshots.filter((file) => file.includes(testName));

    if (testScreenshots.length === 0) {
        console.log(`❌ No screenshots found for test: ${testName}`);
        return null;
    }

    const doc = new PDFDocument({ autoFirstPage: false });
    doc.pipe(fs.createWriteStream(outputPdf));

    const pageMargin = 40;
    const headerHeight = 60;

    // Sort by creation time (first screenshot first)
    testScreenshots.sort((a, b) => fs.statSync(a).birthtimeMs - fs.statSync(b).birthtimeMs);

    testScreenshots.forEach((imgPath) => {
        const img = fs.readFileSync(imgPath);
        const image = doc.openImage(img);

        const pageWidth = image.width + pageMargin * 2;
        const pageHeight = image.height + pageMargin * 2 + headerHeight;

        doc.addPage({ size: [pageWidth, pageHeight] });

        // ---------- HEADER ----------
        doc.fontSize(14).text(`Test: ${testName}`, pageMargin, 15);
        doc
            .fontSize(10)
            .fillColor(status === "passed" ? "green" : "red")
            .text(`Status: ${status}`, pageMargin, 35)
            .fillColor("black");
        doc.fontSize(10).text(`Generated: ${timestamp}`, pageMargin, 50);

        doc.moveTo(pageMargin, headerHeight).lineTo(pageWidth - pageMargin, headerHeight).stroke();

        // ---------- IMAGE ----------
        doc.image(img, pageMargin, headerHeight + 10, {
            fit: [pageWidth - pageMargin * 2, pageHeight - headerHeight - 20],
            align: "center",
        });
    });

    doc.end();

    console.log(`✅ PDF CREATED: ${outputPdf}`);
    return null;
}

module.exports = { generateTestPDF };