// // const users = require('express').Router();// creating a router

// const express = require('express');

// const router = express.Router();
// const users = require('../data/users');
// const fsPromises = require('fs').promises;
// const path = require('path');




//   const readFile = () => {
//     const filePath = path.join(__dirname, '../data/users.json');
//     fsPromises.readFile(filePath, { encoding: 'utf8' })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }

//   readFile();

// router.get('/users', (req, res) => {(res.json(users));});
// router.get('/users/:id', (req, res) => {
//   if (!users[req.params.id]) {
//     res.status(404).send({ "message": "User _ not found" });
//     return;
//   }


// // res.json(users[req.params.id]);
// console.log(users[req.params.id].name);
//   res.send(users[req.params.id].name);
// });
// // curl -v GET 'http://localhost:3000/users/' | python -m json.tool
// // curl -v GET 'http://localhost:3000/users?_id=dbfe53c3c4d568240378b0c6' | python -m json.tool

// module.exports = router;


// // If it doesn't exist, the API should return 404 response status and the following JSON: { "message": "User ID not found" }

