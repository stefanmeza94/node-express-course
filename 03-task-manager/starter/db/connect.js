const mongoose = require('mongoose');

// mongoose.connect() => ce zapravo da vrati promise, zato moramo da awaitujemo ovu funkciju u app.js

const connectDB = url => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
