'use strict';

var request = require('request');
var jsonfile = require('jsonfile');
var models = require('../models');

var Check = {

    getSites: function () {
        var sites = {};
        jsonfile.readFile('./config.json', function (err, contents) {
            if (err) {
                console.log('No config.json found. Create one to check sites.');
            } else {
                var config = contents;
                Check.loop(config.sites);
            }
        });
    },

    loop: function (sites) {
        // Check the sites
        for (var i in sites) {
            Check.checkUptime(sites[i].url);
        }
    },

    checkUptime: function (url) {
        var previous;

        // Get last status
        models.Site.findOne({
            order: [['updatedAt','DESC']],
            where: {
                url: url
            }
        }).then(function (status) {
            previous = status;
        });

        // Get current status
        request(url, function (err, res, body) {
            if (err) {
                console.log(err);
            } else {
                Check.recordStatus(url, res.statusCode, previous);

                // Return for testing
                return res.statusCode;
            }
        });
    },

    recordStatus: function (url, status, previous) {
        var statuses = {
            200: true
        };
        models.Site.create({
            url: url,
            status: status,
            up: statuses[status]
        }).then(function (current) {
            if (previous) {
                if (previous.up === current.up) {
                    console.log(url+' is still up!');
                } else {
                    console.log(url+' is down!');
                    Check.hooks(url);
                }
            } else {
                console.log(url+' is a new url');
            }
        });
    },

    hooks: function (url) {
        // TODO: Email hook

        // TODO: Slack hook

        // TODO: Twitter hook

        // TODO: Pushover hook
    }

};

module.exports = Check;
