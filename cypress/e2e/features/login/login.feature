Feature: Login

  Scenario: Validate Login '<credentials>' - '<Test-Id>'
    Given I access Metrobi login page
    When I enter valid credentials '<credentials>'
    Then I should be redirected to the dashboard 
    And I should see the message '<confirmationPage>'
        Examples:
      | Test-Id | credentials     | confirmationPage |
      | TST-001 | valid-user       | Logged HomePage  |

  # Scenario Outline: Validate Login with invalid credentials '<wrongInfo>' - '<Test-Id>'
  #   Given I access Metrobi login page
  #   When I enter invalid credentials '<wrongInfo>'
  #   Then I should see an error message '<errorMessage>'

  #   Examples:
  #     | Test-Id | wrongInfo           | errorMessage                             |
  #     | TST-002 | invalid-email       | Please enter a valid email address       |
  #     | TST-003 | invalidCharacters   | Password must have at least 6 characters |
  #     | TST-004 | empty email         |                                          |
  #     | TST-005 | empty password      |                                          |
  #     # | TST-006 | wrongEmail          | Sorry, wrong credentials                 |

  #       Scenario Outline: Validate Login links '<confirmationPage>' - '<Test-Id>'
  #   Given I access Metrobi login page
  #   When click in link '<CTA>'
  #   Then I should redirect to '<confirmationPage>' '<expectedUrl>'

  #   Examples:
  #     | Test-Id | CTA               | confirmationPage       | expectedUrl    |
  #     | TST-007 | forgot-password   | Forgot Password Page   | reset-password |
  #     | TST-008 | login-with-phone  | Login with Phone Page  | signin         |
  #     | TST-009 | register          | Register Page          | register       |     
