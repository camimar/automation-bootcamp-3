const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      baseUrl: "https://www.casaideas-mexico.mx/",
      "chromeWebSecurity": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 414,
    viewportHeight: 896, 
  },
});
