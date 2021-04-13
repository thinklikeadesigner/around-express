const Card = require('../models/cards');
const {
  ERROR_CODE_NOT_FOUND_404,
  ERROR_CODE_CAST_ERROR_400,
  ERROR_CODE_INTERNAL_SERVER_500,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid data error ${err}` });
      }
      res
        .status(ERROR_CODE_INTERNAL_SERVER_500)
        .json({ message: 'Internal server error' });
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
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid data error ${err}` });
      }
      res
        .status(ERROR_CODE_INTERNAL_SERVER_500)
        .json({ message: 'Internal server error' });
    });
};

module.exports.getCardId = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE_NOT_FOUND_404)
          .json({ message: 'Card ID not found' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid data error ${err}` });
      }
      res
        .status(ERROR_CODE_INTERNAL_SERVER_500)
        .json({ message: 'Internal server error' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((likes) => {
      if (!likes) {
        return res
          .status(ERROR_CODE_NOT_FOUND_404)
          .json({ message: 'Owner ID not found' });
      }
      return res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid data error ${err}` });
      }
      res
        .status(ERROR_CODE_INTERNAL_SERVER_500)
        .json({ message: 'Internal server error' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((likes) => {
      if (!likes) {
        return res
          .status(ERROR_CODE_NOT_FOUND_404)
          .json({ message: 'Owner ID not found' });
      }
      return res.send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid data error ${err}` });
      }
      res
        .status(ERROR_CODE_INTERNAL_SERVER_500)
        .json({ message: 'Internal server error' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE_NOT_FOUND_404)
          .json({ message: 'Card not found' });
      } else if (!card.owner._id === req.user._id) {
        res.status(403).json({ message: 'Forbidden. User Id is invalid' });
      }
      res.status(200).json({ message: 'Card deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_CAST_ERROR_400)
          .json({ message: `Invalid data error ${err}` });
      }
      res
        .status(ERROR_CODE_INTERNAL_SERVER_500)
        .json({ message: 'Internal server error' });
    });
};
