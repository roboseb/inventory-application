const Cruddy = require('../models/cruddy');
const World = require('../models/world');

const async = require('async');
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
    async.parallel({
        cruddy_count(callback) {
            Cruddy.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        cruddy_list(callback) {
            Cruddy.find({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        world_list(callback) {
            World.find({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    },
        (err, results) => {

            
            res.render('index', { title: 'Crudworld Home', error: err, data: results });
        });
};

// Display detail page for a specific world.
exports.world_get = function (req, res, next) {

    async.parallel({
        world: function (callback) {

            World.findById(req.params.id)
                .exec(callback);
        },
        cruddy_list(callback) {
            Cruddy.find({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.world == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('world', { title: 'A World', world: results.world, cruddy_list: results.cruddy_list});
    });

};

exports.creator = (req, res) => {
    async.parallel({
        world_list(callback) {
            World.find({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    },
        (err, results) => {
            console.log('creator');

            res.render('creator', { title: 'New Cruddy', error: err, data: results});
        });
};