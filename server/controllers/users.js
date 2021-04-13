const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
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

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).json({ message: 'User ID not found' });
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

module.exports.updateUser = (req, res) => {
  const {
    name, about,
  } = req.body;
  User.update({
    name,
    about,

  });
  // updating the name of the user found by _id
  User.findByIdAndUpdate(req.params.id, { name, about })
    .then((user) => res.send({ data: user }))
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
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.update({

    avatar,

  });
  // updating the name of the user found by _id
  User.findByIdAndUpdate(req.params.id, { avatar })
    .then((user) => res.send({ data: user }))
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
