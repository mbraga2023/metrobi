const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`file://${process.cwd()}/cypress/reports/html/index.html`, {
        waitUntil: "networkidle0",
    });

    await page.pdf({
        path: "cypress/reports/report.pdf",
        format: "A4",
    });

    await browser.close();
})();