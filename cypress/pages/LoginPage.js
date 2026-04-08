class LoginPage {
    inputUser = '//*[@id="root"]/div/div/div[1]/div[2]/div[3]/div/div/input';
    inputPassword = '//*[@id="root"]/div/div/div[1]/div[2]/div[4]/div/div/input';
    btnLogin = '(//button[contains(text(), "Sign in")])';
    ttlDashboard = '(//h2[contains(text(), "create your first delivery")])';

    enterCredentials(username, password) {
        cy.xpath(this.inputUser).type(username);
        cy.xpath(this.inputPassword).type(password);
        cy.xpath(this.btnLogin).should('be.enabled').click();
        cy.takeScreenshot("before-login");
    }

    validateDashboard() {
        cy.xpath(this.ttlDashboard, { timeout: 20000 }).should("be.visible");
        cy.takeScreenshot("after-login");
    }

    enterCredentialsWithInvalidData(username, password) {
        cy.log('username: ' + username);
        cy.log('password: ' + password);

        // Type username if not empty
        if (username !== "") {
            cy.xpath(this.inputUser).clear().type(username);
            cy.xpath(this.inputPassword).click();

        }

        // Type password if not empty
        if (password !== "") {
            cy.xpath(this.inputPassword).clear().type(password);
        }

        // Click login only if both fields have values
        if (username !== "" && password !== "") {
            cy.xpath(this.btnLogin, { timeout: 10000 }).should('be.enabled').click();
            cy.log('Should display error snackbar');
        } else {
            cy.log('Login button not clicked due to missing fields');
        }

        cy.takeScreenshot("after-invalid-login");
    }

    validateErrorMessage(errorMessage) {
        if (errorMessage) {
            cy.contains("body", errorMessage, { timeout: 20000 }).should("be.visible");
        }
        cy.takeScreenshot(`Printing error message: ${errorMessage}`);
    }
}

export default new LoginPage();