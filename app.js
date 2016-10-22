'use strict';

var express = require('express');
var schedule = require('node-schedule');
var jsonfile = require('jsonfile');
var Check = require('./lib/check.js');

// Database
var models = require('./models');

var app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

var config = {};

jsonfile.readFile('./config.json', function (err, contents) {
    if (err) {
        console.log('No config.json found. Using app defaults.');
    } else {
        config = contents;
    }
    var scan = schedule.scheduleJob(config.frequency || '* * * * * *', function () {
        Check.getSites();
    });
});

models.sequelize.sync().then(function () {
    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening at http://%s:%s', host, port);
    });
});
