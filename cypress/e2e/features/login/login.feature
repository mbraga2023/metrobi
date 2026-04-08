Feature: Login

  # Scenario: Successful login with valid credentials
  #   Given I access Metrobi login page
  #   When I enter valid credentials
  #   Then I should be redirected to the dashboard

  Scenario Outline: Login with invalid credentials '<wrongInfo>'
    Given I access Metrobi login page
    When I enter invalid credentials '<wrongInfo>'
    Then I should see an error message '<errorMessage>'

    Examples:
      | wrongInfo           | errorMessage                             |
      | invalid-email  | Please enter a valid email address       |
      | invalidCharacters   | Password must have at least 6 characters |
      | empty email         |           |
      | empty password      |                |
      # | wrongEmail       | Sorry, wrong credentials                 |