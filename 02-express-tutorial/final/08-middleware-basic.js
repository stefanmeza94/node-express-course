const express = require('express');
const app = express();

// middleware su zapravo funkcije koje se izvrsavaju tokom zahteva na serveru. Svaka middlware funkcija ima pristup req i res objektima kao i next funkciji.
//  req => middleware => res
// middleware funckije mozemo mi da pisemo ili da koristimo iz nekih biblioteka (znaci vec napisni middlwarei)
// same parametre dole referencirane funkcije logger ce proslediti sam express (req, res, next) kada radimo sa middlwareima MORAMO da prosledimo sledeci middleware osim ako mi sami ne prekinemo ceo taj ciklus sa responsom (res.send()). Dakle ako setup-ujemo middlware radimo neku logiku unutar njega, i ako sami ne posaljemo response, MORAMO da odredimo SLEDECI middlware uz pomoc next() funkcije!
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next(); // posto ovde nismo sami definisali res.send() i okoncali sam response MORAMO da upotrebimo ovu funkciju next() koju samu prosledjuje express biblioteka za nas unutar middlware funkcije kao parametar.
};

// mi smo ovde referencirali logger funkciju, i u njoj mi pristupamo req objektu, s tim sto ovde gde smo je referencirali ne prosledjujemo nista, za to ce da se probrine sam express, dakle ne moramo nista da joj prosledjujemo posto ce to za nas da uradi express. Sve sto je potrebno samo da stavimo funkciju kao referencu
// middleware ubacujemo izmedju putanje i callback funkcije get methode (i bilo koje druge post, delete...)

app.get('/', logger, (req, res) => {
  res.send('Home');
});
app.get('/about', logger, (req, res) => {
  res.send('About');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
