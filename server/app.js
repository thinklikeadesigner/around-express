const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
    name: 'Bret Victor',
    about: 'Designer, engineer',
    avatar: 'https://postlight.com/wp-content/uploads/2018/03/109TC-e1535047852633.jpg',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
