# Cypress Automation

![Cypress](https://img.shields.io/badge/Cypress-15.9.0-brightgreen?logo=cypress)
![Node.js](https://img.shields.io/badge/Node.js-20.18.0-339933?logo=node.js&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-E2E%20%7C%20API-blue)

This project uses the Cypress framework with JavaScript to perform **end-to-end (E2E)** and **API** testing. The goal is to provide a scalable, efficient, and easily maintainable solution for validating functionalities and services.

## 📋 Requirements

To run the project, the following requirements must be met:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [allure-npm](https://github.com/allure-framework/allure-npm)

## ⚙️ Installation

clone the repository to your local machine:

```bash
git clone https://github.com/JonanXavi/cypress_automation.git
```

Then, install the project dependencies by running the following command in the root of the repository:

```bash
npm install
```

## 🧹 Code Quality & Formatting

This project uses **ESLint** and **Prettier** to ensure code quality, consistency, and readability.

- **ESLint** is used to detect potential issues and enforce best practices.
- **Prettier** is used to automatically format the code (indentation, quotes, line length, etc.).

### Format Code

To format the entire project, run:

```bash
npm run format
```

## 🌎 Environment Configuration

The project allows execution in different environments (api, dev). To define the execution environment, you need to configure `.env` files within the project.

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

## 📊 Generating Reports

To generate and view the test report with **Allure**, run:

```bash
npm run test:report
```

This will generate the reports in the `allure-results` folder.

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
├── 🔐 .env
├── 🚫 .gitignore
├── 🚫 .prettierignore
├── 📎 .prettierrc
├── 🔧 cypress.config.js
├── ⛔ eslint.config.cjs
├── 📦 package.json
└── 📦 package-lock.json
```

## Author

- [@jonanxavi](https://www.github.com/jonanxavi)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)
