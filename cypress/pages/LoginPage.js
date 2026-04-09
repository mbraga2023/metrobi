import { PageBase } from "./PageBase";
class LoginPage extends PageBase {
    inputUser = '//*[@id="root"]/div/div/div[1]/div[2]/div[3]/div/div/input';
    inputPassword = '//*[@id="root"]/div/div/div[1]/div[2]/div[4]/div/div/input';
    btnLogin = '(//button[contains(text(), "Sign in")])';
    ttlDashboard = '(//h2[contains(text(), "create your first delivery")])';
    btnTextForgorPass = 'Forgot password?'
    ttlForgotPass = '(//h2[contains(text(), "Forgot password?")])';
    btnTextLoginWithPhone = 'Log in with phone number';
    ttlLoginWithPhone = '(//h4[contains(text(), "Enter your phone number")])';
    btnTextRegister = 'Join for FREE';

    enterCredentials(username, password) {
        cy.xpath(this.inputUser).type(username);
        cy.xpath(this.inputPassword).type(password);
        cy.xpath(this.btnLogin).should('be.enabled').click();
        cy.takeScreenshot("before-login");
    }

    validateDashboard() {
        cy.url({ timeout: 20000 }).should("include", "/dispatch");
        cy.takeScreenshot("after-login");
    }

    validateLoggedHomePage(confirmationPage) {
        if (confirmationPage === "Logged HomePage") {
            cy.xpath(this.ttlDashboard, { timeout: 20000 }).should("be.visible");
            cy.takeScreenshot("Dashboard-Visible");
        }
    }

    enterCredentialsWithInvalidData(username, password) {

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
            cy.takeScreenshot("login-attempt-with-missing-fields");
        }

        cy.takeScreenshot("after-invalid-login");
    }

    validateErrorMessage(errorMessage) {
        if (errorMessage) {
            cy.contains("body", errorMessage, { timeout: 20000 }).should("be.visible");
        }
        cy.takeScreenshot(`Printing error message: ${errorMessage}`);
    }

    clickLink(CTA) {
        if (CTA === "forgot-password") {
            cy.takeScreenshot("clicking-forgot-password");
            this.clickButton(this.btnTextForgorPass);
        } else if (CTA === "login-with-phone") {
            cy.takeScreenshot("clicking-login-with-phone");
            this.clickButton(this.btnTextLoginWithPhone);
        } else if (CTA === "register") {
            cy.takeScreenshot("clicking-register");
            this.clickButton(this.btnTextRegister);
            cy.wait(2000)
        }
    }

    validateRedirection(confirmationPage, expectedUrl) {
        if (confirmationPage === "Forgot Password Page") {
            cy.url({ timeout: 10000 }).should("include", expectedUrl);
            cy.xpath(this.ttlForgotPass, { timeout: 20000 }).should("be.visible");
            cy.takeScreenshot(`after-redirection-to-${confirmationPage}`);

        } else if (confirmationPage === "Login with Phone Page") {
            cy.xpath(this.ttlLoginWithPhone, { timeout: 20000 }).should("be.visible");
            cy.wait(2000); // wait for potential redirects or page loads
            cy.takeScreenshot(`after-redirection-to-${confirmationPage}`);
        } else if (confirmationPage === "Register Page") {
            // All commands on metrobi.com must be inside cy.origin
            cy.origin(
                "https://metrobi.com",
                { args: { expectedUrl, confirmationPage } },
                ({ expectedUrl, confirmationPage }) => {
                    cy.url({ timeout: 15000 }).should("include", expectedUrl);
                    cy.wait(2000);
                    cy.screenshot(`after-redirection-to-${confirmationPage}`, {
                        capture: "fullPage",
                        overwrite: true,
                    });
                    cy.task("log", `Screenshot taken for ${confirmationPage}`);
                }
            );
        }

    }
}

export default new LoginPage();