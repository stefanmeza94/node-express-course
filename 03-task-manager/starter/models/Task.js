const mongoose = require('mongoose');

// ova skima ce zapravo da postavi strukturu za sve dokumente koje cemo da imamo u nasoj kolekciji
const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

// sada kada smo setovali skimu, odnosno sada kada imamo strukturu za nase podatke, moramo da setujemo model, na model mozemo da gledamo kao na reprezentaciju kolekcije (koje mozemo da vidimo na mongoo atlas (za sada smo napravili samo Products))
// u mongoose model je zapravo wrapper za schema-u, ako schema-a definise stkrukturu za dokument kao sto je tip, validacija, mongoose model obezbedjuje interfejs baze podataka. Koriscenjem tog modela moci cemo da kreiramo, menjamo i brisemo nase dokumente sa lakocom.
