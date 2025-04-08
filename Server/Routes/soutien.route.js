const express = require('express');
const router = express.Router();
const controller = require('../Controllers/soutien.controller');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
