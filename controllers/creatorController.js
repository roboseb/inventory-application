const Cruddy = require('../models/cruddy');
const World = require('../models/world');
const Item = require('../models/item');

const mongoose = require('mongoose');


const async = require('async');
const { body, validationResult } = require("express-validator");

exports.creator = (req, res) => {
    async.parallel({
        world_list(callback) {
            World.find({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        item_list(callback) {
            Item.find({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    },
        (err, results) => {
            res.render('creator', { title: 'New Cruddy', error: err, data: results});
        });
};

exports.cruddy_create_post = (req, res, next) => {


    console.log('creating...');
    console.log(req.body.world);

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const cruddy = new Cruddy(
        { 
            color: req.body.color,
            world: req.body.world
        }
    );

    if (!errors.isEmpty()) {

        console.log(errors);

    } else {
        cruddy.save(function (err) {
            if (err) { return next(err); }
            // Cruddy saved. Redirect to main page.
            res.redirect('/');
        });
    }
};

exports.cruddy_delete_post = (req, res, next) => {
    console.log('deleting cruddy...');

    Cruddy.findByIdAndRemove(req.body.id, function deleteCruddy(err) {
        if (err) { return next(err); }
        console.log(req.body.id);
    });

    res.redirect('/');

}