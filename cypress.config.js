const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 1000,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // experimentalSessionAndOrigin: true,
    experimentalWebKitSupport: true,
    experimentalRunAllSpecs: true // For run all spec
  },
})
