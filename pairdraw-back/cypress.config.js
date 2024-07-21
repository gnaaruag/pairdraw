const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Adjust this to match your application's base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      TEST_DB_URI: 'mongodb://localhost:27017/pairing_test' // Ensure this matches your test database URI
    },
    supportFile: false // Disable the support file
  },
});
