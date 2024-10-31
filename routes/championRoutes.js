const express = require('express');
const router = express.Router();
const controller = require('../controllers/championController')

router.get('/', controller.getChamps);
router.post('/', controller.validateChamp, controller.createChamp);
router.delete('/:id', controller.deleteOneChamp);

module.exports = router;