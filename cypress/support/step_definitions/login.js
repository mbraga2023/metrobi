import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";

Given("I access Metrobi login page", () => {
    cy.visit("https://test-deliver.metrobi.com");
});

When("I enter valid credentials", () => {
    const username = "michel.diener@gmail.com";
    const password = "michel99";
    LoginPage.enterCredentials(username, password);
});

Then("I should be redirected to the dashboard", () => {
    LoginPage.validateDashboard();
});

Then("I enter invalid credentials {string}", (invalidInfo) => {
    let username = "";
    let password = "";

    switch (invalidInfo) {
        case "invalid-email":
            username = "email";
            break;
        case "empty email":
        case "empty password":
            username = "email@domain.com";
            break;
        case "wrongPassword":
            username = "email@domain.com";
            password = "wrong-password";
            break;
        case "invalidCharacters":
            username = "email@domain.com";
            password = "123";
            break;
    }

    LoginPage.enterCredentialsWithInvalidData(username, password);
});

Then("I should see an error message {string}", (errorMessage) => {
    LoginPage.validateErrorMessage(errorMessage);
});