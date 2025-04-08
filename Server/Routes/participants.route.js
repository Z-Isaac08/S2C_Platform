const express = require('express');
const router = express.Router();
const controller = require('../Controllers/participants.controller.js');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.get('/:telephone', controller.findByWhatsapp);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
module.exports = router;
