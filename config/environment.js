'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'partsku-ember',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development' || environment === 'dev') { // make sure u have api turned on
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_ENDPOINT = `http://localhost:3000`
    ENV.APP.HOST_URL = `http://localhost:4000`
  }

  if (environment === 'test') {
    // Testem prefers this...
    // ENV.locationType = 'none';

    // keep test console output quieter
    // ENV.APP.LOG_ACTIVE_GENERATION = false;
    // ENV.APP.LOG_VIEW_LOOKUPS = false;

    // ENV.APP.rootElement = '#ember-testing';
    // ENV.APP.autoboot = false;

    ENV.APP.API_ENDPOINT = `https://serene-spire-28591.herokuapp.com`
    ENV.APP.HOST_URL = `http://localhost:4000`
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
