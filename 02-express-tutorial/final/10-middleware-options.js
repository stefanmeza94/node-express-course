const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./logger');
const authorize = require('./authorize');
//  req => middleware => res

// ako zelimo da izvrsimo vise middleware funkcija za rute mozemo da prosledimo use() metodi array u koji ce da ubacimo sve middleware funkcije koje zelimo da se izvrse, naravno posle toga ce use metoda da referencira te middelware svim rutama!
// jako je bitno da razumemo da ce middleware funkcije biti izvrsene u ovom redosledu koji smo stavili u array.
app.use([logger, authorize]);
// app.use(express.static('./public'))
// app.use(morgan("tiny"));

app.get('/', (req, res) => {
  res.send('Home');
});
app.get('/about', (req, res) => {
  res.send('About');
});
app.get('/api/products', (req, res) => {
  res.send('Products');
});
app.get('/api/items', (req, res) => {
  console.log(req.user);
  res.send('Items');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
