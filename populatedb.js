#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

console.log(userArgs[0]);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Cruddy = require('./models/cruddy')
var World = require('./models/world')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cruddies = []
var worlds = [];

function cruddyCreate(color, world, cb) {
    cruddydetail = { color: color, world: world}

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
            cruddyCreate('aquamarine', worlds[0], callback);
        },
        function (callback) {
            cruddyCreate('aquamarine', worlds[1], callback);
        },
    ],
        // optional callback
        cb);
}

function worldCreate(name, cb) {
    worlddetail = { name: name }

    var world = new World(worlddetail);

    world.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New World: ' + world);
        worlds.push(world)
        cb(null, world)
    });
}

function createWorlds(cb) {
    async.series([
        function (callback) {
            worldCreate('Terrytown', callback);
        },
        function (callback) {
            worldCreate('Verdant Falls', callback);
        },
    ],
        // optional callback
        cb);
}

async.series([
    createWorlds,
    //createCruddies,
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Cruddies: ' + cruddies);
            console.log('Worlds: ' + worlds);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });