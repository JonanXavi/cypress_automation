const { defineConfig } = require('cypress');
const fs = require('node:fs');
const { allureCypress } = require('allure-cypress/reporter');
const dotenv = require('dotenv');
const path = require('node:path');
const os = require('node:os');

module.exports = defineConfig({
    pageLoadTimeout: 2 * 60 * 1000,
    defaultCommandTimeout: 2 * 60 * 1000,
    requestTimeout: 2 * 60 * 1000,
    responseTimeout: 2 * 60 * 1000,
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 2 },

    e2e: {
        specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
        setupNodeEvents(on, config) {
            const envType = config.env.type || config.env.version || 'dev';
            const envPath = path.resolve(__dirname, `.env.${envType}`);
            dotenv.config({ path: envPath });

            config.env = {
                ...config.env,
                BASE_URL: process.env.BASE_URL || config.env.BASE_URL,
                TYPE: process.env.TYPE || config.env.TYPE || 'ui',
                USER: process.env.USER || config.env.USER,
                PASSWORD: process.env.PASSWORD || config.env.PASSWORD,
            };

            config.baseUrl = config.env.BASE_URL;
            config.specPattern = `cypress/e2e/**/*.${config.env.TYPE}.cy.{js,ts}`;

            allureCypress(on, config, {
                resultsDir: 'allure-results',
                environmentInfo: {
                    os_platform: os.platform(),
                    os_release: os.release(),
                    os_version: os.version(),
                    node_version: process.version,
                },
            });

            on('after:spec', (spec, results) => {
                if (results?.video) {
                    const failures = results.tests.some((test) => test.attempts.some((attempt) => attempt.state === 'failed'));
                    if (!failures) {
                        fs.unlinkSync(results.video);
                    }
                }
            });

            return config;
        },

        watchForFileChanges: false,
    },
});
