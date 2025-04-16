const express = require('express');
const router = express.Router();
const controller = require('../Controllers/soutien.controller');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/create-with-participant', controller.createWithParticipant);
router.post('/paystack', controller.initierPaiementPaystack);

router.get('/callback', controller.handleCallbackDjamo); // ou POST selon config CinetPay
module.exports = router;