# Cypress Automation

![Cypress](https://img.shields.io/badge/Cypress-15.9.0-brightgreen?logo=cypress)
![Node.js](https://img.shields.io/badge/Node.js-20.18.0-339933?logo=node.js&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-CI-blue?logo=jenkins)
![Allure](https://img.shields.io/badge/Allure-Reporting-orange)
![ESLint](https://img.shields.io/badge/ESLint-9.38.0-brightgreen?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.8.1-blue?logo=prettier&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-E2E%20%7C%20API-blue)

This project is a Cypress-based automation framework built with JavaScript for:

- End-to-End (E2E)
- API testing
- Advanced reporting with Allure
- CI/CD integration with Jenkins
- Automated publishing of reports to GitHub Pages

---

## 📋 Requirements

Make sure the following are installed:

- [Jenkins](https://www.jenkins.io/download/) (Optional)
- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/install/)

### Install Allure CLI globally

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

## 📊 Allure Reporting

### Step 1: Execute Tests

```bash
npm run test:ui-dev
```

### Step 2: Generate Allure HTML Report

```bash
npm run test:report
```

The HTML report will be generated in:

```
/allure-report/index.html
```

Open `index.html` in your browser to view the report.

---

## 🧪 Reporting Strategy

Allure metadata includes:

- Severity levels (`blocker`, `critical`, `normal`)
- Functional tags (Authentication, Products, Cart, Checkout)
- Test ownership
- Descriptions for business context

**Severity classification:**

| **Module**     | **Severity** |
| -------------- | ------------ |
| Checkout       | blocker      |
| Cart           | critical     |
| Authentication | critical     |
| Products       | normal       |

---

## 🔄 Jenkins CI/CD Integration

> [!IMPORTANT]
> Jenkins integration is optional. You can fully run this project locally without Jenkins.  
> This section is intended to demonstrate a real CI/CD pipeline setup for portfolio purposes.

### Purpose

The Jenkins pipeline demonstrates:

- Installing dependencies automatically
- Lint validation
- Executing UI tests
- Generating Allure reports
- Publishing Allure reports inside Jenkins
- Automatically pushing HTML reports to the `gh-pages` branch for GitHub Pages

### Required Jenkins Plugins

- **NodeJS Plugin** – to run Node.js commands
- **Allure Jenkins Plugin** – to visualize reports
- **Pipeline Plugin** – for declarative pipelines

### Global Tool Configuration

1. Configure NodeJS (e.g., `node_22`)
2. Configure Allure Commandline (give it the same name as in your pipeline, e.g., `allure`)

### Required Jenkins Credentials

Add the following credentials in Jenkins:

| Credential ID  | Description                               |
| -------------- | ----------------------------------------- |
| `BASE_URL_DEV` | Base URL for the dev environment          |
| `USER_DEV`     | Username for dev environment              |
| `PASSWORD_DEV` | Password for dev environment              |
| `GITHUB_TOKEN` | Token for pushing reports to GitHub Pages |

### Notes

- The `gh-pages` branch is automatically updated with Allure HTML reports.
- Anyone cloning the project can still execute tests and generate reports locally without configuring Jenkins.

---

## 🌍 GitHub Pages Setup

To enable public report publishing:

1. Go to Repository Settings
2. Navigate to Pages
3. Select branch: `gh-pages`
4. Select folder: `/ (root)`
5. Save changes

The report will be available at: https://jonanxavi.github.io/cypress_automation/

> [!NOTE]
> The URL changes depending on the user

---

## 📂 Project Structure

```bash
📁 cypress_automation
├── 📁 allure-report
├── 📁 allure-results
├── 📁 cypress
│   ├── 📁 downloads
│   ├── 📁 e2e
│   │   ├── 📁 api_automation
│   │   └── 📁 ui_automation
│   ├── 📁 fixtures
│   ├── 📁 pages
│   ├── 📁 screenshots
│   ├── 📁 support
│   ├── 📁 utils
│   └── 📁 videos
├── 🔐 .env.*
├── 🚫 .gitignore
├── 🚫 .prettierignore
├── 📎 .prettierrc
├── 🔧 cypress.config.js
├── ⛔ eslint.config.cjs
├── 📦 package.json
└── 📦 package-lock.json
```

---

## 🧹 Code Quality & Formatting

This project uses **ESLint** and **Prettier** to ensure code quality, consistency, and readability.

### ESLint

- Detects syntax errors, potential bugs, and enforces coding standards.
- Configuration is located in `eslint.config.cjs`.

#### Run lint check:

```bash
npm run pretest
```

### Prettier

- Automatically formats code (indentation, quotes, line length, etc.).
- Configuration is located in `.prettierrc` and `.prettierignore`.

#### Format all files:

```bash
npm run format
```

---

## Author

- [@jonanxavi](https://www.github.com/jonanxavi)

---

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)
