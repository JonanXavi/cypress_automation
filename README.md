# Cypress Automation
This project uses the Cypress framework with JavaScript to perform **end-to-end (E2E)** and **API** testing. The goal is to provide a scalable, efficient, and easily maintainable solution for validating functionalities and services.

## 📋 Requirements
To run the project, the following requirements must be met:
- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [allure-npm](https://github.com/allure-framework/allure-npm)

## ⚙️ Installation
To install the project dependencies, run the following command in the root of the repository:
```bash
npm install
```

## 🌎 Environment Configuration
The project allows execution in different environments (api, dev, prod). To define the execution environment, you need to configure `.env` files within the project.

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

Example of `.env.prod`:
```ini
BASE_URL=https://www.demoblaze.com/
TYPE=ui
USER=user_pw_2025
PASSWORD=pw2025
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
├── 🔧 cypress.config.js
├── 📦 package.json
└── 📦 package-lock.json
```

## Author
- [@jonanxavi](https://www.github.com/jonanxavi)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)
