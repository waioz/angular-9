// grab the things we need
const express = require('express');
const router = express.Router();
const listsController = require('../controllers/lists'); 

router.post('/get_lists',listsController.get_lists);
router.post('/update_list',listsController.update_list);
router.post('/delete_list',listsController.delete_list);
module.exports = router;