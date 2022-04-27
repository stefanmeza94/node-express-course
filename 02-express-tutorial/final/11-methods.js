const express = require("express");
const app = express();
let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));
// parse form data
// ova metoda ce da prasira podatke koji nam dolaze post metodom i dodace te vrednosti u req.body (da bi mi mogli u ruti da pristupimo tim podacima)
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// ono sto je fora ovde da ne mozemo direktno da dodamo taj input koji nam salje frontend, drugim recima nemamo direktan pristup tim podacima koje dobijamo u post metodi, da bi regulisali to sto nam dolazi do servera, odnosno ono sto salje post metoda moramo da imamo middlware koji ce da reguslise to. za to ce da nam posluzi urlencoded middleware
app.post("/api/people", (req, res) => {
  // dakle jos jednom, zavaljujuci middlewareu urlencoded (ugradjen je u express, dakle nema potrebe da ga instaliramo) koji ce da parsira to sto dobijamo uz post metodu i smesta to u req objekat tacnije u body property, mi to sada u ovoj ruti mozemo da koristimo i da pristupamo tom poslanom inputu!
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  res.status(401).send("Please Provide Credentials");
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
