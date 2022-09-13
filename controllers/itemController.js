const mongoose = require('mongoose');

const async = require('async');
const { body, validationResult } = require("express-validator");

const Item = require('../models/item');



exports.item_create_get = (req, res) => {     
    res.render('item_creator', { title: 'New Item'});
};

exports.item_create_post = (req, res, next) => {     
    console.log('creating item...');

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const item = new Item(
        { 
            type: req.body.type,
            layers: JSON.parse(req.body.layers)
        }
    );

    if (!errors.isEmpty()) {

        console.log(errors);

    } else {
        console.log('saving....')

        item.save(function (err) {
            if (err) { return next(err); }
            // Item saved. Redirect to cruddy creator page.
            res.redirect('/');
        });
    }
};