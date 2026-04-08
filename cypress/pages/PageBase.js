
export class PageBase {
    clickLink(CTA) {
        cy.contains("a", CTA).should("be.visible").click();
    }

    //Example of a method that can be used across different pages
    clickButton(buttonText) {
        cy.contains("button", buttonText).should("be.visible").click();
    }
}
export default new PageBase();