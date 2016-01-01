var assert = require('chai').assert;
var Check = require('../lib/check.js');
var models = require('../models');

// use npm test --coverage to check test coverage

describe('Uptime checks', function() {
    it('returns a 3-digit status code', function() {
        response = Check.checkUptime("https://google.com");
        // Wait for HTTP response
        setTimeout(function () {
            assert.typeOf(response, 'integer');
            assert.lengthOf(response, 3);
        }, 1000);
    });
});