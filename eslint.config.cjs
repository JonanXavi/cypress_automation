const js = require('@eslint/js');
const cypressPlugin = require('eslint-plugin-cypress');

module.exports = [
    js.configs.recommended,
    {
        files: ['cypress/**/*.js'],
        plugins: {
            cypress: cypressPlugin,
        },
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': 'warn',
            'cypress/no-unnecessary-waiting': 'error',
            'cypress/assertion-before-screenshot': 'warn',
        },
    },
    cypressPlugin.configs.recommended,
    {
        ignores: ['node_modules/', 'allure-report/', 'allure-results/'],
    },
];
