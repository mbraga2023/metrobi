# metrobi

# 📦 Cypress QA Automation Project (B2B Delivery Platform)

## 📖 Overview

This project demonstrates a **Quality Assurance approach** applied to a B2B delivery platform, focusing on:

- Structured test design (scenario mapping)
- Behavior-driven development using Gherkin
- End-to-end automation using Cypress

The goal is to validate critical workflows such as **login, delivery management, and user interactions**, while ensuring maintainable and scalable test automation.

---

## 🧠 QA Strategy

The testing approach follows three main steps:

### 1. Scenario Mapping
- Identify **happy paths**, **edge cases**, and **negative scenarios**
- Align scenarios with business requirements (PO & Dev collaboration)

### 2. Gherkin Specification
- Write scenarios in **Given / When / Then** format
- Ensure readability for both technical and non-technical stakeholders

### 3. Automation
- Implement tests using **Cypress + Cucumber**
- Focus on reliability and maintainability

---

## 🗂️ Project Structure

```bash
cypress/
│
├── e2e/
│   └── features/
│       ├── login/
│       │   ├── login.feature
│       │   ├── chats.feature
│       │   ├── customers.feature
│       │   ├── deliveries.feature
│       │   └── drivers.feature
│
├── fixtures/                # Test data (mock data, inputs)
│
├── pages/                   # Page Object Model (POM)
│   ├── DeliveriesPage.js
│   ├── LoginPage.js
│   └── PageBase.js
│
├── plugins/
│   └── pdfGenerator.js      # Custom plugin (e.g. reporting/export)
│
├── reports/                 # Test execution reports
├── screenshots/             # Failure screenshots
│
├── support/
│   ├── step_definitions/    # Cucumber step definitions
│   │   ├── deliveries_steps.js
│   │   └── login_steps.js
│   │
│   ├── commands.js          # Custom Cypress commands
│   ├── e2e.js               # Global configuration
│   ├── report.js            # Reporting setup
│   ├── teardown.js          # Cleanup logic
│   └── timestamp.js         # Utility for dynamic data
│
├── cypress.config.js        # Cypress configuration
├── cypress.env.json         # Environment variables
└── package.json
```

---

## ⚙️ Tech Stack

- **Cypress** → End-to-end testing framework  
- **Cucumber (Gherkin)** → BDD syntax for test scenarios  
- **JavaScript** → Test implementation  
- **Page Object Model (POM)** → Maintainable UI interaction  

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

---

### 2. Run tests (UI mode)

```bash
npx cypress open
```

---

### 3. Run tests (headless)

```bash
npx cypress run
```

---

## 🧪 Test Coverage

The automation covers:

- ✅ Login flow  
- 🚚 Delivery creation and management  
- 👤 Driver-related scenarios  
- 💬 Chat interactions  
- 🧍 Customer flows  

---

## 🧩 Key Design Decisions

- **Page Object Model (POM)** for reusable UI interactions  
- **Custom commands** to reduce duplication  
- **Stable selectors** (avoiding dynamic CSS classes)  
- **Cypress retry mechanism** for dynamic elements (e.g., snackbars)  

---

## ⚠️ Challenges & Solutions

### Snackbar Handling
- **Challenge:** Elements appear/disappear quickly  
- **Solution:** Use Cypress retryability with `cy.contains()` and timeouts  

---

## 📈 Future Improvements

- CI/CD integration (e.g., GitHub Actions)  
- API test layer for faster validation  
- Test data management strategy  
- Visual regression testing  

---

## 🎯 Purpose

This project is designed to demonstrate:

- QA mindset and structured thinking  
- Ability to translate requirements into test scenarios  
- Clean and maintainable automation practices  

---

## 👤 Author

Michel Braga
michel.diener@gmail.com