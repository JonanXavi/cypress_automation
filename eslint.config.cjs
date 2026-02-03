const js = require('@eslint/js');
const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-plugin-prettier');

module.exports = [
    js.configs.recommended,

    {
        files: ['cypress.config.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                process: 'readonly',
            },
        },
    },

    {
        files: ['cypress/e2e/**/*.cy.js'],
        plugins: {
            cypress,
            prettier,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                // Cypress
                cy: 'readonly',
                Cypress: 'readonly',

                // Mocha
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                beforeEach: 'readonly',
                after: 'readonly',
                afterEach: 'readonly',

                // Chai
                expect: 'readonly',
            },
        },
        rules: {
            ...cypress.configs.recommended.rules,
            'no-unused-vars': 'warn',
            'prettier/prettier': 'warn',
        },
    },

    {
        files: ['cypress/support/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                cy: 'readonly',
                Cypress: 'readonly',
                expect: 'readonly',
            },
        },
    },

    {
        files: ['cypress/pages/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                module: 'readonly',
                require: 'readonly',
                cy: 'readonly',
                expect: 'readonly',
                Cypress: 'readonly',
            },
        },
    },

    {
        files: ['cypress/utils/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                cy: 'readonly',
                expect: 'readonly',
                Cypress: 'readonly',
            },
        },
    },

    {
        ignores: ['node_modules/', 'allure-report/', 'allure-results/'],
    },
];
