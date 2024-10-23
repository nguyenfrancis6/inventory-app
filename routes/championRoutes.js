const express = require('express');
const router = express.Router();
const controller = require('../controllers/championController')

router.get('/', controller.getChamps);
router.post('/', controller.validateUser, controller.createChamp);

module.exports = router;