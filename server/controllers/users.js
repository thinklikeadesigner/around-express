const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error' }));
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
    .catch((error) => res.status(500).send({ message: `Error creating user ${error}` }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).json({ message: 'User ID not found' });
    })
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }));
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
    .catch((err) => res.status(500).send({ message: `Error is ${err}` }));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.update({

    avatar,

  });
  // updating the name of the user found by _id
  User.findByIdAndUpdate(req.params.id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error is ${err}` }));
};
