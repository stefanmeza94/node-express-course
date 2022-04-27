const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./logger');
const authorize = require('./authorize');
//  req => middleware => res

// ako zelimo da izvrsimo vise middleware funkcija za rute mozemo da prosledimo use() metodi array u koji ce da ubacimo sve middleware funkcije koje zelimo da se izvrse, naravno posle toga ce use metoda da referencira te middelware svim rutama!
// jako je bitno da razumemo da ce middleware funkcije biti izvrsene u ovom redosledu koji smo stavili u array.

// ako ne zelimo da primenimo ovaj app.use() za sve rute, jer sada ne mozemo da im pristupimo zbog ove authorize middleware-a koji zahteva od nas da uvek prosledjujemo query user=john mozemo jednostavno da obrisemo ovaj app.use() i da ove dve middleware funkcije prosledimo odjrednoj ruti koja zelimo da bude zasticena.
// takodje bitno je da znamo da sam express obezbedjuje odredjene middleware funkcije.
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

// ako zelimo da prosledimo vise middleware funkcija jednoj ruti to radimo isto kao kod app.use() => prosledjujemo array sa middlware funkcijama koje ce da se izvrse po tom redu.
app.get('/api/items', [logger, authorize], (req, res) => {
  console.log(req.user);
  res.send('Items');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
