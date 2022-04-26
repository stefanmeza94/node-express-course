const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
//  req => middleware => res

// app.use() metoda ce za nas da pozove logger funkciju za sve route! jako je bitno da ovaj app.use bude na vrhu iznad svih ruta da bi se primenio za sve rute, ukoliko bude ispod neke rute za te rute koje su iznad njega nece se primeniti middleware-i
// takodje u ovoj use metodi mozemo da odredimo i path kao prvi argument '/api' sto znaci da ce se ona pokrenuti samo za one rute koje u sebi imaju api/ pa nesto iza njih, u nasem primeru ovaj setup ne bi se primenio za prve dve rute s ozbirom da u ruti nemaju /api
// naravno ako izaostavimo ovaj path odnosno ovaj prvi argument, onda ce se middlewari iz use() metode primeniti na sve nase rute!
app.use([logger, authorize]);
// api/home/about/products
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
