const express = require("express");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

// setovali smo baznu rutu za nase people rute
app.use("/api/people", people);
// setovali smo baznu rutu za nas auth rutu
app.use("/login", auth);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
