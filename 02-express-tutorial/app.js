const express = require("express");
const app = express();

const logger = require("./logger");
const authorize = require("./authorize");

app.use([logger, authorize]);

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.get("/api/products", (req, res) => {
  res.send("products page");
});

app.get("/api/items", (req, res) => {
  console.log(req.users);
  res.send("items page");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

// sledeci video 25
