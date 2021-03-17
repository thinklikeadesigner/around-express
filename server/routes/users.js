const express = require("express");
const router = express.Router(); // creating a router
const path = require("path");
const fs = require("fs").promises;
const { getFileContent, matchId } = require("../util");

router.get("/users", (req, res) => {
  const pathToUserData = path.join(__dirname, "../data/users.json");
  getFileContent(pathToUserData)
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});

router.get("/users/:id", (req, res) => {
  const pathToUserData = path.join(__dirname, "../data/users.json");
  getFileContent(pathToUserData)
    .then((users) => {
      const user = users.find((element) => matchId(element, req));

      if (user) {
        return res.send(user);
      } else {
        return res.status(404).json({ message: "User ID not found" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
