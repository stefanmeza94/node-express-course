const express = require('express');
const router = express.Router();

const { people } = require('../data');

// posto smo u app.js setovali da za nase people rute da je bazna ruta zapravo /api/people => to ce onda nase rute u ovom fajlu da citaju kao bazu i nema potrebe da pisemo opet /api/people vec mozemo samo da stavimo / => sto ce predstavljati /api/people

// cela ruta bi ovde bila => /api/people
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).json({ success: true, person: name });
});

// cela ruta bi ovde bila => /api/people/postman
router.post('/postman', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' });
  }

  return res.status(201).json({ success: true, data: [...people, name] });
});

// cela ruta bi ovde bila => /api/people/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find(person => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }

  const newPeople = people.map(person => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success: true, data: newPeople });
});

// cela ruta bi ovde bila => /api/people/:id
router.delete('/:id', (req, res) => {
  const person = people.find(person => person.id === Number(req.params.id));
  if (!person) {
    res
      .status(404)
      .json({ success: false, msg: `No person with id ${req.params.id}` });
  }

  const newPeople = people.filter(
    person => person.id !== Number(req.params.id)
  );
  res.status(200).json({ success: true, data: newPeople });
});

module.exports = router;
