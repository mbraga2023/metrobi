import { PageBase } from './PageBase.js';

class DeliveriesPage extends PageBase {
    deliveriesOption = 'Deliveries'
    btnCreateDelivery = 'Create delivery'
    optionSideMenu = (option) => `//span[contains(text(), "${option}")]`
    optionDelivery = (option) => `//h6[contains(text(), "${option}")]`
    // confirmationPage = (confirmationPage) => `//h4[contains(text(), "${confirmationPage}")]`
    btnFormCreateDelivery = '//*[@id=":r7a:"]'

    formFieldsNewDelivery = {
        pickupLocation: 'input[placeholder="Metrobi"]',
        optionsPickupLocation: '//span[contains(text(), "33306 Arbour")]',
        btnAddPickupLocation: '//button[contains(text(), "Add pickup location")]',
        pickupDate: 'button[aria-label="Choose date"]',
        pickupTime: 'input[name^="custom-time-picker"]',
        optionsPickupTime: 'li.MuiMenuItem-root',
        // cargoSizeLabel: 'label:contains("*Cargo size")',
        cargoSizeInput: 'ul[role="listbox"]',
        cargoSizeOption: 'ul[role="listbox"] > li',
        btnDropOffLocation: 'li.MuiMenuItem-root',
        dropOffLocation: 'input[placeholder*="add/modify drop offs"]',
        declaredValue: 'input[name="cargoValue"]',
    }

    formFieldsSelfDelivery = {
        pickupLocation: 'input[placeholder="Search for saved"]',
        optionsPickupLocation: '//span[contains(text(), "33306 Arbour")]',
        btnAddPickupLocation: '//button[contains(text(), "Add pickup location")]',
        pickupDate: 'button[aria-label="Choose date"]',
        pickupTime: 'input[name^="custom-time-picker"]',
        optionsPickupTime: 'li.MuiMenuItem-root',
        // cargoSizeLabel: "'label', '*Cargo size'",
        cargoSizeInput: 'ul[role="listbox"]',
        cargoSizeOption: 'ul[role="listbox"] > li',
        btnDropOffLocation: 'li.MuiMenuItem-root',
        dropOffLocation: 'input[placeholder*="add/modify drop offs"]',
        declaredValue: 'input[name="cargoValue"]',
    }

    selectOptionSideMenu(option) {
        if (option === 'Deliveries') {
            cy.takeScreenshot("select-deliveries-option");

            this.clickLink(this.deliveriesOption);
        }
    }

    clickButtonCreateDelivery() {
        cy.takeScreenshot("click-create-delivery-button");
        this.clickButton(this.btnCreateDelivery);
    }

    selectOptionDelivery(optionDelivery) {
        if (optionDelivery === 'Request a driver') {
            cy.takeScreenshot("select-request-driver-option");
            cy.xpath(this.optionDelivery(optionDelivery)).should('be.visible').click();
        } else if (optionDelivery === 'Create a self') {
            cy.takeScreenshot("select-create-self-delivery-option");
            cy.xpath(this.optionDelivery(optionDelivery)).should('be.visible').click();
        } else {
            cy.log('Invalid option')
        }
    }

    fillFormWithValidData(optionDelivery) {
        if (optionDelivery === 'Request a driver') {
            cy.takeScreenshot("fill-request-driver-form");
            cy.get(this.formFieldsNewDelivery.pickupLocation)
                .click({ force: true });

            cy.xpath(this.formFieldsNewDelivery.optionsPickupLocation, { timeout: 10000 })
                .should('be.visible')
                .first()
                .click({ force: true });
            cy.xpath(this.formFieldsNewDelivery.btnAddPickupLocation, { timeout: 10000 }).click({ force: true });

            cy.get(this.formFieldsNewDelivery.pickupDate)
                .click({ force: true });

            cy.contains('button', '17')
                .should('not.be.disabled')
                .click();

            cy.get(this.formFieldsNewDelivery.pickupTime)
                .click({ force: true })
            cy.get(this.formFieldsNewDelivery.optionsPickupTime).should('be.visible')
                .first()
                .click({ force: true });

            // Click the Cargo size dropdown
            cy.contains('label', '*Cargo size')
                .parent()
                .find('div[role="combobox"]')
                .click({ force: true });

            cy.get(this.formFieldsNewDelivery.cargoSizeInput).should('be.visible');

            cy.get(this.formFieldsNewDelivery.cargoSizeOption).first().click();

            cy.get(this.formFieldsNewDelivery.btnDropOffLocation).should('be.visible')
                .first()
                .click({ force: true });

            cy.get(this.formFieldsNewDelivery.dropOffLocation)
                .click({ force: true })
                .type("201 W Main St, Leesburg, FL");

            cy.get(this.formFieldsNewDelivery.declaredValue)
                .clear({ force: true })
                .type("100", { force: true });
            cy.takeScreenshot("filled-request-driver-form");
            cy.get('button.MuiLoadingButton-root[type="button"]').contains('Create delivery').click({ force: true });
        } else if (optionDelivery === 'Create a self') {
            cy.takeScreenshot("fill-request-driver-form");
            cy.get(this.formFieldsSelfDelivery.pickupLocation)
                .click({ force: true });

            cy.xpath(this.formFieldsSelfDelivery.optionsPickupLocation, { timeout: 10000 })
                .should('be.visible')
                .first()
                .click({ force: true });
            cy.xpath(this.formFieldsSelfDelivery.btnAddPickupLocation, { timeout: 10000 }).click({ force: true });

            cy.get(this.formFieldsSelfDelivery.pickupDate)
                .click({ force: true });

            cy.contains('button', '15')
                .should('not.be.disabled')
                .click();

            cy.get(this.formFieldsSelfDelivery.pickupTime)
                .click({ force: true })
            cy.get(this.formFieldsSelfDelivery.optionsPickupTime).should('be.visible')
                .first()
                .click({ force: true });

            cy.get('input[name="selectedVehicle"]').click();

            cy.get(this.formFieldsSelfDelivery.btnDropOffLocation).should('be.visible')
                .first()
                .click({ force: true });

            cy.get(this.formFieldsSelfDelivery.dropOffLocation)
                .click({ force: true })
                .type("201 W Main St, Leesburg, FL");

            cy.get(this.formFieldsSelfDelivery.declaredValue)
                .clear({ force: true })
                .type("100", { force: true });
            cy.takeScreenshot("filled-request-driver-form");
        } else {
            cy.log('Invalid option')
        }
    }

    validateConfirmationPage(confirmationPage) {
        cy.log("Validating confirmation page with message: " + confirmationPage);
        cy.contains(`${confirmationPage}`, { timeout: 10000 }).should('be.visible');
        cy.takeScreenshot("confirmation-page");
    }
}

export default new DeliveriesPage();
