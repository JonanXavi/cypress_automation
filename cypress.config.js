const { defineConfig } = require('cypress');
const fs = require('node:fs');
const { allureCypress } = require('allure-cypress/reporter');
const dotenv = require('dotenv');
const path = require('node:path');
const { release, platform, version } = require('node:os');

module.exports = defineConfig({
    pageLoadTimeout: 60 * 1000,
    defaultCommandTimeout: 60 * 1000,
    requestTimeout: 60 * 1000,
    responseTimeout: 60 * 1000,
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 1 },
    e2e: {
        specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
        setupNodeEvents(on, config) {
            const envFile = config.env.version || config.env.type || 'dev';
            const envPath = path.resolve(__dirname, `.env.${envFile}`);

            dotenv.config({ path: envPath });

            allureCypress(on, config, {
                resultsDir: 'allure-results',
                environmentInfo: {
                    os_platform: platform(),
                    os_release: release(),
                    os_version: version(),
                    node_version: process.version,
                },
            });

            on('after:spec', (spec, results) => {
                if (results?.video && fs.existsSync(results.video)) {
                    const hasFailures = results.tests.some((test) => test.attempts.some((attempt) => attempt.state === 'failed'));

                    if (!hasFailures) {
                        fs.unlinkSync(results.video);
                    }
                }
            });

            config.env = {
                ...config.env,
                BASE_URL: process.env.BASE_URL,
                TYPE: process.env.TYPE,
                USER: process.env.USER,
                PASSWORD: process.env.PASSWORD,
            };

            config.baseUrl = process.env.BASE_URL;

            const testType = process.env.TYPE;

            if (testType === 'ui') {
                config.specPattern = 'cypress/e2e/ui_automation/**/*.cy.{js,ts}';
            }

            if (testType === 'api') {
                config.specPattern = 'cypress/e2e/api_automation/**/*.cy.{js,ts}';
            }

            return config;
        },
        watchForFileChanges: false,
    },
});
