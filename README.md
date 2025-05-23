# Cypress Automation
This project uses the Cypress framework with JavaScript to perform **end-to-end (E2E)** and **API** testing. The goal is to provide a scalable, efficient, and easily maintainable solution for validating functionalities and services.

## 📋 Requirements
To run the project, the following requirements must be met:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [allure-npm](https://github.com/allure-framework/allure-npm)

## ⚙️ Installation
To install the project dependencies, run the following command in the root of the repository:
```bash
npm install
```

## 🌎 Environment Configuration
The project allows execution in different environments (dev, prod). To define the credentials, you need to configure `cypress.env.json` files within the project.

Example of `cypress.env.json`:
```json
{
  "user_dev": "standard_user",
  "password_dev": "secret_sauce",
  "user_prod": "user_cy_2025",
  "password_prod": "cy2025"
}
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

### Run API Tests
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
│   ├── 📁 config
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
├── 🚫 .gitignore
├── 🔧 cypress.config.js
├── 🔐 cypress.env.json
├── 📦 package.json
└── 📦 package-lock.json
```

## Author
- [@jonanxavi](https://www.github.com/jonanxavi)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)
