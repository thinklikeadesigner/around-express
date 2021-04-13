const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      const ERROR_CODE = 500;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json(
          {
            message: 'Internal Server Error',
          },
        );
      }
      return res.send({ message: 'something went wrong' });
    });
};

module.exports.createCard = (req, res) => {
  const {
    likes, name, link, createdAt,
  } = req.body;

  Card.create({
    likes,
    name,
    link,
    owner: req.user._id,
    createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const ERROR_CODE = 500;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json(
          {
            message: 'Internal Server Error',
          },
        );
      }
      return res.send({ message: 'something went wrong' });
    });
};

module.exports.getCardId = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(404).json({ message: 'Card ID not found' });
    })
    .catch((err) => {
      const ERROR_CODE = 500;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json(
          {
            message: 'Internal Server Error',
          },
        );
      }
      return res.send({ message: 'something went wrong' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(404).json({ message: 'Card ID not found' });
    })
    .catch((err) => {
      const ERROR_CODE = 500;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json(
          {
            message: 'Internal Server Error',
          },
        );
      }
      return res.send({ message: 'something went wrong' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    }, // remove _id from the array
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(404).json({ message: 'Card ID not found' });
    })
    .catch((err) => {
      const ERROR_CODE = 500;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json(
          {
            message: 'Internal Server Error',
          },
        );
      }
      return res.send({ message: 'something went wrong' });
    });
};
