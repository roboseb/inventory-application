const Cruddy = require('../models/cruddy');

const async = require('async');
const { body, validationResult } = require("express-validator");

exports.creator = (req, res) => {
    (err, results) => {
        res.render('creator', { title: 'New Cruddy', error: err });
    };
};

exports.cruddy_create = (req, res) => {
    (err, results) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        var cruddy = new Cruddy(
            { color: req.body.color }
        );

        if (!errors.isEmpty()) {
            console.log(errors);
        } else {

            cruddy.save(function (err) {
                if (err) { return next(err); }
                // Cruddy saved. Redirect to genre detail page.
                res.redirect('creator');
            });
        }



    };
};