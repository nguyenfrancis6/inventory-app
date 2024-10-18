const express = require('express');
const router = express.Router();
const controller = require('../controllers/traitController')

router.get('/', controller.getTraits);
router.post('/', controller.createTrait);

module.exports = router;