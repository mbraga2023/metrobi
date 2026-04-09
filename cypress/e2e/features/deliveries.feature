Feature: Deliveries

    Scenario: Validate Login '<credentials>' - '<Test-Id>'
        Given I access Metrobi login page
        When I enter valid credentials '<credentials>'
        And I select '<option>' in side menu
        Then click button Create Delivery button
        And select '<optionDelivery>'
        And fill the new Delivery form with valid data '<optionDelivery>'
        Then I should see the message delivery '<confirmationPage>'
        # And logout of the application
        Examples:
            | Test-Id | credentials | option     | optionDelivery   | confirmationPage          |
            | TST-010 | valid-user  | Deliveries | Request a driver | Your delivery was created |
# | TST-010 | valid-user  | Deliveries | Create a self    | Logged HomePage  |
