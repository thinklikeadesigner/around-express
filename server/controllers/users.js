const ApiError = require('../errors/api-error');
const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        ApiError.castError(res, 'Invalid ID error');
      } else if (err.name === 'ValidationError') {
        ApiError.castError(res, 'Invalid data error');
      }
      ApiError.internalServerError(res, 'Internal server error');
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
        ApiError.castError(res, 'Invalid ID error');
      } else if (err.name === 'ValidationError') {
        ApiError.castError(res, 'Invalid data error');
      }
      ApiError.internalServerError(res, 'Internal server error');
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        ApiError.notFound(res, 'User ID not found');
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        ApiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        ApiError.validationError(res, 'Invalid data error');
      }
      ApiError.internalServerError(res, 'Internal server error');
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
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        ApiError.notFound(res, 'User ID not found');
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        ApiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        ApiError.validationError(res, 'Invalid data error');
      }
      ApiError.internalServerError(res, 'Internal server error');
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.update({
    avatar,
  });
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        ApiError.notFound(res, 'User ID not found');
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        ApiError.castError(res, 'Invalid Card ID error');
      } else if (err.name === 'ValidationError') {
        ApiError.validationError(res, 'Invalid data error');
      }
      ApiError.internalServerError(res, 'Internal server error');
    });
};
