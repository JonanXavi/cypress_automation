const js = require("@eslint/js");
const cypressPlugin = require("eslint-plugin-cypress");

module.exports = [
    js.configs.recommended,
    {
        files: ["cypress/**/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                cy: "readonly",
                Cypress: "readonly",
                expect: "readonly",
                describe: "readonly",
                it: "readonly",
                before: "readonly",
                beforeEach: "readonly",
                after: "readonly",
                afterEach: "readonly"
            }
        },
        plugins: {
            cypress: cypressPlugin
        },
        rules: {
            "no-unused-vars": "warn",
            "cypress/no-unnecessary-waiting": "error",
            "cypress/assertion-before-screenshot": "warn"
        },
        ignores: [
            "node_modules/",
            "allure-report/",
            "allure-results/"
        ]
    }
]