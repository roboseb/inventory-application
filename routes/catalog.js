const express = require('express');
const router = express.Router();

// Require controller modules.
const cruddy_controller = require('../controllers/cruddyController');
const creator_controller = require('../controllers/creatorController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', cruddy_controller.index);

router.get('/creator', (err, res) => {
    res.render('creator', { title: 'New Cruddy', error: err});
});

router.post('/creator', creator_controller.cruddy_create);

module.exports = router;
