const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

// dotenv je zapravo paket koji smo instalirali, on ce da se postara za to da se ucitaju environment varijable iz .env fajla.
// da bi zapravo pristupili tim vajlovima iz .env fajla moramo da koristimo paket po imenu dotenv!
// stvarima iz varijabalnog okruzenja (.env) pristupamo sa process.env<IME KOJE SMO ODREDILI U .env FAJLU>
require("dotenv").config();

// parsing json
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("task manager app");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

// hocemo prvo da se konektujemo sa data bazom pa onda tek da pokrenemo nas server, jer ako je obrnutno nista nece raditi. zato smo ubacili mongoose.connect funkciju unutar druge funkcije (connectDB) i nju importovali ovde da bi mogli da je pozovemo samo kad se taj response vrati od mongooose.connect upesno, ako se vrati uspesno listenujemo nas server!
// connectDB funkcija ce da vrati promise (mongoose.connect()) zato je awaitujemo ovde!
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
