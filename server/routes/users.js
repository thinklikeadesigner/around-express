const express = require('express');

const router = express.Router();

const { getUsers, createUser, getUserId } = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('users/:id', getUserId);

module.exports = router;
