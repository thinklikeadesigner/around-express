const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.createCard = (req, res) => {
  const {
    likes, name, link, owner, createdAt,
  } = req.body;

  Card.create({
    likes,
    name,
    link,
    owner,
    createdAt,
  }).populate(['likes', 'owners'])
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.getCardId = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(404).json({ message: 'Card ID not found' });
    })
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }));
};
