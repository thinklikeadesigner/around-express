const express = require('express');

const router = express.Router();

const {
  getUsers, createUser, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserId);
router.patch('/users/:id/me', updateUser);
router.patch('/users/:id/me/avatar', updateAvatar);
module.exports = router;
