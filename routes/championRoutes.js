const express = require('express');
const router = express.Router();
const controller = require('../controllers/championController')

router.get('/', controller.getChamps)

module.exports = router;