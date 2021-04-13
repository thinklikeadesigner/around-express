const express = require('express');

const router = express.Router();

const {
  getCards, createCard, getCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.get('/cards/:id', getCardId);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', dislikeCard);

module.exports = router;
