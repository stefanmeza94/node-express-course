let { people } = require("../data");

// u ovom fajlu koji se nalazi unutar controllers foldera, konvenctija je da ovde izmestamo funkcionalnost samih ruta, da ne bi gomilali fajlove unutar routes foldera.
// ukratko u controllers idu sva funkcionalnost ruta!

// posto vidimo da ovde imamo pristup req i res objektima za to je zasluzan sam express jer je on taj koji prosldjuje ove parametre za nas. Dakle mi tamo u rutama samo referenciramo funkciju i to je to.
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }

  return res.status(201).json({ success: true, data: [...people, name] });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `No person with id ${req.params.id}` });
  }

  const newPeople = people.filter((person) => {
    return person.id !== Number(req.params.id);
  });

  res.status(201).json({ sucess: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};
