const Cruddy = require('../models/cruddy');

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

    },
        (err, results) => {
            res.render('index', { title: 'Crudworld Home', error: err, data: results });
        });
};