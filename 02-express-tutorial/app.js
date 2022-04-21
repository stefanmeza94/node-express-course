const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
app.use(express.static("./public")); // u public folder sve sto budemo stavili toce server da ispuruci na localhost:5000, naravno mi ovaj folder ne moramo da nazovemo public to je samo neka konvencija.

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
//   adding to static assets
//   SSR
// });

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
