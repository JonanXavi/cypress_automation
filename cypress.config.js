const { defineConfig } = require('cypress');
const fs = require('fs');
const { allureCypress } = require('allure-cypress/reporter');
const dotenv = require('dotenv');
const path = require('path');
const { release, platform, version } = require('node:os');

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
                if (results?.video) {
                    const failures = results.tests.some((test) => test.attempts.some((attempt) => attempt.state === 'failed'));
                    if (!failures) {
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
            config.specPattern = `cypress/e2e/**/*.${process.env.TYPE}.cy.{js,ts}`;

            return config;
        },
        watchForFileChanges: false,
    },
});
