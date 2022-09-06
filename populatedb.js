#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Cruddy = require('./models/cruddy')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cruddies = []

function cruddyCreate(color, cb) {
    cruddydetail = { color: color}

    var cruddy = new Cruddy(cruddydetail);

    cruddy.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Cruddy: ' + cruddy);
        cruddies.push(cruddy)
        cb(null, cruddy)
    });
}

function createCruddies(cb) {
    async.series([
        function (callback) {
            cruddyCreate('aquamarine', callback);
        },
    ],
        // optional callback
        cb);
}

async.series([
    createCruddies,
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Cruddies: ' + cruddies);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



