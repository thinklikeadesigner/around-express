const express = require("express");
const app = express();
const cards = require("./routes/cards");
const users = require("./routes/users");

const { PORT = 3000 } = process.env;

app.use(users);
app.use(cards);
app.use('/', (req, res) => {
  res.status(404).send({ "message": "Requested resource not found" })
})


app.listen(PORT, () => {
  console.log("server is listening");
});