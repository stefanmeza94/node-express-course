const express = require('express');
const router = express.Router();

// sada kad smo kompletnu funkcionalnost preselili u controllers folder moramo da importujemo te funkcije i da prosledimo ovim rutama ovde tu funkcionalnost
const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

// posto smo u app.js setovali da za nase people rute da je bazna ruta zapravo /api/people => to ce onda nase rute u ovom fajlu da citaju kao bazu i nema potrebe da pisemo opet /api/people vec mozemo samo da stavimo / => sto ce predstavljati /api/people

// cela ruta bi ovde bila => /api/people
// router.get('/', getPeople);
// router.post('/', createPerson);
// router.post('/postman', createPersonPostman);
// router.put('/:id', updatePerson);
// router.delete('/:id', deletePerson);

// postoji i drugi nacin da se odrede rute, tj da ih zapisemo u manjem broju linija koda (funkcionalnost ce da bude potpuno identicna). ovo zapravo zavisi od nas sta vise preferiramo to cemo da koristimo.
// pozvacemo router i nad njim route() metodu u koju cemo da odredimo path a odmah zatim cemo da stavimo koje metode regulisemo (u kojimam prosledjujemo nase funkcije iz kontrollera).
// posto vidimo gore da je ista ruta potupno i za get i za post metodu ono sto mozemo da uradimo ovde jeste da povezemo te dve metode jednu za drugom i da im prosledimo naravno funkcije iz kontrolera koje su za njih.
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
