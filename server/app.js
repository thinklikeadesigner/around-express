const express = require("express");
const app = express();
// const cards = require("./routes/cards");
// const users = require("./routes/users");
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log("server is listening");
});
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const fs = require("fs").promises;

function getFileContent(filePath) {
  return fs
    .readFile(filePath, { encoding: "utf-8" })
    .then(JSON.parse)
    .catch(console.log);
}

app.get("/users", (req, res) => {
  const pathToData = path.join(__dirname, "data", "users.json");
  getFileContent(pathToData)
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});

app.get("/users/:id", (req, res) => {
    const pathToData = path.join(__dirname, "data", "users.json");

    getFileContent(pathToData).then((users) => {
      const user = users.find(testFunction);
      function testFunction (element) {
        const hasId = element._id === req.params.id
        console.log('we are loging: ', hasId)
        return hasId;
      }


      if (user) {
        return res.send(user);
      } else {
        return res.status(404).json({ message: "User ID not found" });
      }

    }).catch((err) => console.log(err));

});


// curl -v GET 'http://localhost:3000/users/dbfe53c3c4d568240378b0c6' | python -m json.tool

// curl -v GET 'http://localhost:3000/users/' | python -m json.tool



