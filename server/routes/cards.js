const express = require('express');

const router = express.Router();// creating a router
const path = require('path');
const { getFileContent } = require('../helper/util');

router.get('/cards', (req, res) => {
  const pathToCardData = path.join(__dirname, '..', 'data', 'cards.json');
  getFileContent(pathToCardData)
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }));
});

router.get('/cards/:id', (req, res) => {
  const pathToCardData = path.join(__dirname, '..', 'data', 'cards.json');
  getFileContent(pathToCardData)
    .then((cards) => {
      const card = cards.find((element) => element._id === req.params.id);

      if (card) {
        return res.send(card);
      }
      return res.status(404).json({ message: 'Card ID not found' });
    }).catch(() => res.status(500).json({ message: 'Internal Server Error' }));
});

module.exports = router;
