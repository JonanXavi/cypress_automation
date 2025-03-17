const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
  pageLoadTimeout: 5 * 60 * 1000,
  defaultCommandTimeout: 2 * 60 * 1000,
  requestTimeout: 2 * 60 * 1000,
  responseTimeout: 2 * 60 * 1000,
  video: true,
  screenshotOnRunFailure: true,
  retries: { "runMode": 2, "openMode": 2 },
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
              test.attempts.some((attempt) => attempt.state === 'failed')
          )
          if (!failures) {
            fs.unlinkSync(results.video)
          }
        }
      })

      const version = config.env.version || "dev"
      config.env = require(`./cypress/config/${version}.json`)
      config.baseUrl = config.env.baseUrl

      return config
    },
    watchForFileChanges: false
  },
})