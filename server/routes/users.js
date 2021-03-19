const express = require('express');

const router = express.Router(); // creating a router
const path = require('path');
const { getFileContent } = require('../helper/util');

const pathToUserData = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  getFileContent(pathToUserData)
    .then((users) => res.send(users))
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }));
});

router.get('/users/:id', (req, res) => {
  getFileContent(pathToUserData)
    .then((users) => {
      const user = users.find((element) => element._id === req.params.id);
      if (user) {
        return res.send(user);
      }
      return res.status(404).json({ message: 'User ID not found' });
    })
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }));
});

module.exports = router;
