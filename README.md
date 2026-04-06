![Node.js](https://img.shields.io/badge/Node.js-22.21.0-339933?logo=node.js&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-15.9.0-brightgreen?logo=cypress)
![Jenkins](https://img.shields.io/badge/Jenkins-CI-blue?logo=jenkins)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)
![Allure](https://img.shields.io/badge/Allure-Reporting-orange)
![ESLint](https://img.shields.io/badge/ESLint-9.38.0-brightgreen?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.8.1-blue?logo=prettier&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-E2E%20%7C%20API-blue)

# Cypress E2E & API Automation Framework

This project is a **QA Automation Framework built with Cypress and JavaScript** designed to demonstrate modern automation practices used in real-world projects.

The framework includes:

- End-to-End (E2E) testing
- API testing
- Allure advanced reporting
- CI/CD integration with Jenkins
- Dockerized execution environment with Docker Compose
- Automated report publishing to GitHub Pages
- Code quality enforcement using ESLint and Prettier

---

## ⭐ Key Features

- End-to-End (E2E) UI automation with Cypress
- API testing using REST requests
- Page Object Model (POM) design pattern
- Allure reporting for test analytics
- Jenkins CI/CD pipeline
- Dockerized test execution with Docker Compose
- Automated report publishing to GitHub Pages
- Multi-environment support (.env files)

---

## 🏭 Framework Architecture

The framework follows a **modular architecture designed for scalability and maintainability**.

### Project Layers

| **Layer**    | **Responsibility**                |
| ------------ | --------------------------------- |
| E2E Tests    | UI test scenarios                 |
| API Tests    | Backend API validation            |
| Page Objects | Encapsulate UI interactions       |
| Fixtures     | Manage test data                  |
| Utilities    | Shared helper functions           |
| Support      | Custom Cypress commands and hooks |
| Reporting    | Allure test results generation    |
| CI/CD        | Jenkins pipeline execution        |

### Design Principles

- **Page Object Model (POM)** for UI abstraction
- **Environment-based configuration** using `.env` files
- **Separation of UI and API test layers**
- **Reusable utilities and fixtures**

---

## 📋 Requirements

Make sure the following are installed:

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/install/)
- [Java JDK 21+](https://adoptium.net/) (Required for Allure reports locally)
- [Jenkins](https://www.jenkins.io/download/) (Optional for CI/CD demonstration)
- [Docker](https://www.docker.com/products/docker-desktop/) (Recommended)

### Install Allure CLI Globally

```bash
npm install -g allure-commandline --save-dev
```

Verify installation:

```bash
allure --version
```

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

The framework supports multiple environments using `.env` files.

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

### UI Automation

UI tests cover critical user flows in the **SauceDemo application**:

- Login validation
- Product listing
- Add products to cart
- Cart validation
- Checkout process

### API Automation

API tests validate the **Restful Booker API**:

- Authentication
- Create booking
- Retrieve booking
- Update booking
- Delete booking

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

## 🐳 Running Tests with Docker

This project includes a Dockerized environment with Docker Compose to ensure consistent execution across machines and CI pipelines.

### Why Docker Compose?

- **One-command execution:** No need to remember long docker commands
- **Consistent environment:** Same setup for local and CI/CD
- **Auto-documentation:** The docker-compose.yml documents how to run everything minutes

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

### Allure Server

```bash
docker compose up serve
```

### One-Command Execution (Recommended)

```bash
npm run docker:execution
```

> [!NOTE]
> Report open at the URL: http://localhost:5050

### Benefits

- **Zero configuration:** Everything is pre-configured
- **Reproducible:** Same results everywhere
- **Isolated:** No dependency conflicts
- **Professional reports:** Allure served via nginx

---

## 📊 Allure Reporting

### Step 1: Execute Tests

```bash
npm run test:ui-dev
```

### Step 2: Generate Report

```bash
npm run test:report
```

### Step 3: View Allure Report

```bash
npm run report:open
```

---

## 🧭 Reporting Strategy

Allure metadata includes:

- Severity levels
- Functional tags
- Test ownership
- Business context descriptions

---

## 🔁 CI/CD Pipeline (Jenkins)

The project includes a CI/CD pipeline implemented with Jenkins to automate the execution of the test framework.

### Pipeline stages:

1️⃣ **Build Test Environment**  
Builds the Docker image using Docker Compose

2️⃣ **Execute Cypress UI Tests**  
Runs Cypress tests inside Docker container with environment variables

3️⃣ **Generate Allure Test Report**  
Processes test results and generates the Allure HTML report.

4️⃣ **Publish Report to GitHub Pages**  
Automatically pushes the generated report to the `gh-pages` branch

Pipeline configuration is defined in `Jenkinsfile`

---

## 🔐 Required Jenkins Credentials

| **Credential ID** | **Description**              |
| ----------------- | ---------------------------- |
| BASE_URL_DEV      | Base URL for dev environment |
| USER_DEV          | Username for dev environment |
| PASSWORD_DEV      | Password for dev environment |
| GITHUB_TOKEN      | Token for publishing reports |

---

## 🌍 GitHub Pages Setup

To enable public report publishing:

1. Go to **Repository Settings**
2. Navigate to **Pages**
3. Select branch `gh-pages`
4. Select folder `/ (root)`
5. Save changes

Example report URL:

https://jonanxavi.github.io/cypress_automation/

> [!NOTE]
> The URL changes depending on the user

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
├── 🐋 Dockerfile           # Docker environment for running tests
├── 🐳 Dockerfile           # Docker Compose orchestration
├── 🏗 Jenkinsfile          # CI/CD pipeline configuration
├── 🔧 cypress.config.js    # Cypress global configuration
├── ⛔ eslint.config.cjs    # ESLint configuration
├── 📦 package.json         # Project dependencies and scripts
└── 📦 package-lock.json    # Dependency lock file
```

---

## 🧹 Code Quality & Formatting

This project enforces code quality using **ESLint** and **Prettier**.

### ESLint

Detects:

- Syntax errors
- Potential bugs
- Coding standard violations

Run lint validation:

```bash
npm run pretest
```

### Prettier

Automatically formats code.

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
