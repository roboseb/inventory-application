const express = require('express');
const router = express.Router();

// Require controller modules.
const cruddy_controller = require('../controllers/cruddyController');
const creator_controller = require('../controllers/creatorController');

// GET catalog home page.
router.get('/', cruddy_controller.index);

router.get('/creator', creator_controller.creator);


// GET request for one world.
router.get('/world/:id', cruddy_controller.world_get);

router.post('/world/:id', creator_controller.cruddy_delete_post);


router.post('/creator', creator_controller.cruddy_create_post);

router.post('/', creator_controller.cruddy_delete_post);

module.exports = router;
