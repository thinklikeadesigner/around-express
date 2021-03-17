

const express = require("express");
const router = express.Router();// creating a router
const path = require("path");
const fs = require("fs").promises;
const {getFileContent, matchId} = require('../util');

router.get("/cards", (req, res) => {
  const pathToCardData = path.join(__dirname, "../data/cards.json");
  getFileContent(pathToCardData)
    .then((cards) => res.send(cards))
    .catch((err) => console.log(err));
});

router.get("/cards/:id", (req, res) => {
  const pathToCardData = path.join(__dirname, "../data/cards.json");
  getFileContent(pathToCardData)
  .then((cards) => {
    const card = cards.find((element) => matchId(element, req));

    if (card) {
      return res.send(card);
    } else {
      return res.status(404).json({ message: "Card ID not found" });
  }
  }).catch((err) => console.log(err));
});

module.exports = router;