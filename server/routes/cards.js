const express = require('express');

const router = express.Router();

const { getCards, createCard, getCardId } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.get('/:id', getCardId);

module.exports = router;
