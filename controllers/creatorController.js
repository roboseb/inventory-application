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
        top_item_list(callback) {
            Item.find({ 'type': 'top' }, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        front_item_list(callback) {
            Item.find({ 'type': 'front' }, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        item_list(callback) {
            Item.find({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    },
        (err, results) => {
            res.render('creator', { title: 'New Cruddy', error: err, data: results });
        });
};

exports.cruddy_create_post = (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // If id, delete passed item from DB.
    if (req.body.id) {
        console.log('deleting item...');

        Item.findByIdAndRemove(req.body.id, function deleteItem(err) {
            if (err) { return next(err); }
            console.log(req.body.id);
        });

    // If no id, create a cruddy from the data.
    } else {
        console.log('creating cruddy...');
        const cruddy = new Cruddy(
            {
                color: req.body.color,
                world: req.body.world,
                topItem: req.body.topItem,
                frontItem: req.body.frontItem
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