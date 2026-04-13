![Node.js](https://img.shields.io/badge/Node.js-22.21.0-339933?logo=node.js&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-15.9.0-brightgreen?logo=cypress)
![Jenkins](https://img.shields.io/badge/Jenkins-CI-blue?logo=jenkins)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)
![Allure](https://img.shields.io/badge/Allure-Reporting-orange)
![ESLint](https://img.shields.io/badge/ESLint-9.38.0-brightgreen?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.8.1-blue?logo=prettier&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-E2E%20%7C%20API-blue)

# Cypress E2E & API Automation Framework

This project is a production-ready QA Automation framework built with Cypress and JavaScript, designed to demonstrate scalable, maintainable, and real-world testing practices.

It showcases how to design, execute, and integrate automated tests across UI and API layers, following industry standards.

---

## 🎯 Why this project matters

This framework demonstrates my ability to:

- Design scalable test architectures
- Implement E2E and API automation strategies
- Apply best practices (POM, modular design, separation of concerns)
- Integrate testing into CI/CD pipelines
- Deliver actionable test reports for stakeholders

---

## ⭐ Key Features

- End-to-End (E2E) UI testing with Cypress
- API testing (REST)
- Page Object Model (POM) design pattern
- Multienvironment support using `.env`
- Allure reporting with rich test analytics
- CI/CD integration with Jenkins
- Dockerized execution (Docker + Docker Compose)
- Automated report publishing to GitHub Pages
- Code quality enforcement (ESLint + Prettier)

---

## 🏭 Architecture

The framework follows a modular and scalable architecture:

| Layer        | Responsibility             |
| ------------ | -------------------------- |
| E2E Tests    | UI test scenarios          |
| API Tests    | Backend validation         |
| Page Objects | UI interaction abstraction |
| Fixtures     | Test data management       |
| Utilities    | Shared reusable logic      |
| Support      | Custom commands & hooks    |
| Reporting    | Allure results generation  |
| CI/CD        | Jenkins pipeline execution |

### Design Principles

- Separation of UI and API testing layers
- Reusable and maintainable components
- Environment-based configuration
- Clean and readable test design

---

## 📋 Requirements

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [allure-commandline](https://www.npmjs.com/package/allure-commandline)
- [Java JDK 21+](https://adoptium.net/) (for Allure reports)
- [Docker](https://www.docker.com/products/docker-desktop/) (recommended)
- [Jenkins](https://www.jenkins.io/download/) (optional for CI/CD demo)

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/JonanXavi/cypress_automation.git
```

Navigate into the project:

```bash
cd cypress_automation
```

Install dependencies:

```bash
npm install
```

---

## 🌎 Environment Configuration

Create the corresponding `.env` file in the root directory.

Example of `.env.api`:

```ini
BASE_URL=https://restful-booker.herokuapp.com
TYPE=api
USER=admin
PASSWORD=password123
```

Example of `.env.dev`:

```ini
BASE_URL=https://www.saucedemo.com/
TYPE=ui
USER=standard_user
PASSWORD=secret_sauce
```

---

## 🧪 Test Coverage

### UI (SauceDemo)

- Login
- Product listing
- Add to cart
- Checkout flow

### API (Restful Booker)

- Authentication
- CRUD operations (booking)

---

## 🚀 Running Tests

### Run UI Tests - Headed

```bash
npm run test:ui-headed-dev
```

### Run UI Tests - Headless

```bash
npm run test:ui-dev
```

### Run API Tests - Headed

```bash
npm run test:api-headed
```

### Run API Tests - Headless

```bash
npm run test:api
```

---

## 🐳 Docker Execution

Run tests in a fully isolated environment:

### Build Docker Image

```bash
docker build -t cypress-automation .
```

### Run UI tests

```bash
docker compose run --rm tests
```

### Generate Allure report

```bash
docker compose run --rm report
```

### Allure server

```bash
docker compose up serve
```

### One Command Execution

```bash
npm run docker:execution
```

> [!NOTE]
> Report open at the URL: http://localhost:5050

---

## 📊 Reporting (Allure)

### Generate Report

```bash
npm run test:report
```

### View Allure Report

```bash
npm run report:open
```

### Includes:

- Test steps
- Severity levels
- Execution history
- Failure evidence (screenshots/videos)

---

## 🔁 CI/CD (Jenkins)

### Pipeline stages:

1. Build Docker environment
2. Execute tests
3. Generate Allure report
4. Publish report to GitHub Pages

---

## 🌍 Live Report

https://jonanxavi.github.io/cypress_automation/

---

## 📂 Project Structure

```bash
📁 cypress_automation
├── 📁 allure-report        # Generated HTML reports
├── 📁 allure-results       # Raw results generated during test execution
├── 📁 cypress
│   ├── 📁 downloads        # Files downloaded during tests
│   ├── 📁 e2e
│   │   ├── 📁 api_automation   # API test scenarios
│   │   └── 📁 ui_automation    # UI end-to-end test scenarios
│   ├── 📁 fixtures         # Static test data
│   ├── 📁 pages            # Page Object Model classes
│   ├── 📁 screenshots      # Screenshots captured on test failures
│   ├── 📁 support          # Custom Cypress commands and hooks
│   ├── 📁 utils            # Reusable helper functions
│   └── 📁 videos           # Videos recorded during test execution
├── 🐳 docker-compose.yml   # Docker Compose orchestration
├── 🐋 Dockerfile           # Docker environment for running tests
├── 🏗 Jenkinsfile          # CI/CD pipeline configuration
├── 🔧 cypress.config.js    # Cypress global configuration
├── ⛔ eslint.config.cjs    # ESLint configuration
├── 📦 package.json         # Project dependencies and scripts
└── 📦 package-lock.json    # Dependency lock file
```

---

## 🧹 Code Quality & Formatting

### ESLint

Run lint validation:

```bash
npm run pretest
```

### Prettier

Format project:

```bash
npm run format
```

---

## Author

- [@jonanxavi](https://www.github.com/jonanxavi)

---

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)
