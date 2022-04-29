const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

// static assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

// ovo ce da se primeni samo na onim rutama koje pocinju sa /api/people
// e sad posto ovde imamo taj takozvani base url, to znaci da tamo u routes/people.js moramo da izbrisemo nase rute /api/people, jer ako ih ostavimo to znaci da cemo da imamo duple rute!
app.use('/api/people', people);
// a ovo ce da se primeni samo na rutama koje u sebi imaju /login
app.use('/login', auth);

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
