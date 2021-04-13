const User = require('../models/users');

const { ERROR_CODE_NOT_FOUND_404, ERROR_CODE_CAST_ERROR_400, ERROR_CODE_INTERNAL_SERVER_500 } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid data error ${err}` });
      }
      res.status(ERROR_CODE_INTERNAL_SERVER_500).json({ message: 'Internal server error' });
    });
};

module.exports.createUser = (req, res) => { // _id will become accessible
  const {
    name, about, avatar,
  } = req.body;

  User.create({
    name,
    about,
    avatar,

  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid data error ${err}` });
      }
      res.status(ERROR_CODE_INTERNAL_SERVER_500).json({ message: 'Internal server error' });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(ERROR_CODE_NOT_FOUND_404).json({ message: 'User ID not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid data error ${err}` });
      }
      res.status(ERROR_CODE_INTERNAL_SERVER_500).json({ message: 'Internal server error' });
    });
};

module.exports.updateUser = (req, res) => {
  const {
    name, about,
  } = req.body;
  User.update({
    name,
    about,

  });
  // updating the name of the user found by _id
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND_404).json({ message: 'User ID not found' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid data error ${err}` });
      }
      res.status(ERROR_CODE_INTERNAL_SERVER_500).json({ message: 'Internal server error' });
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.update({
    avatar,
  });
  // updating the name of the user found by _id
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND_404).json({ message: 'User ID not found' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid ID error ${err}` });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_CAST_ERROR_400).json({ message: `Invalid data error ${err}` });
      }
      res.status(ERROR_CODE_INTERNAL_SERVER_500).json({ message: 'Internal server error' });
    });
};
