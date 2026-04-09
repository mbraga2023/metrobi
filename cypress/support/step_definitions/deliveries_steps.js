import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import DeliveriesPage from "../../pages/DeliveriesPage";

Then("I select {string} in side menu", (option) => {
    DeliveriesPage.selectOptionSideMenu(option);
});

Then("click button Create Delivery button", () => {
    DeliveriesPage.clickButtonCreateDelivery();
});
Then("select {string}", (optionDelivery) => {
    DeliveriesPage.selectOptionDelivery(optionDelivery);
}
);
Then('fill the new Delivery form with valid data {string}', (optionDelivery) => {
    DeliveriesPage.fillFormWithValidData(optionDelivery);
});

Then("I should see the message delivery {string}", (confirmationPage) => {
    DeliveriesPage.validateConfirmationPage(confirmationPage);
});
