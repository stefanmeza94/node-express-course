const mongoose = require("mongoose");

// ova skima ce zapravo da postavi strukturu za sve dokumente koje cemo da imamo u nasoj kolekciji
// samo propertije koje smo ovde definisali u nasoj schema-i ce proci u nasu bazu podataka (name, completed), dakle ako mi sami u post requestu npr postavimo da saljemo i neki treci properti koji ovde nismo definisali za taskove taj treci properti se nece poslati u bazu podataka (tj na nas cloud mnogo db), u prevodu sve sto nismo definisali u nasoj skimi bice ignorisano i nece se slati na cloud-u
const TaskSchema = new mongoose.Schema({
  // da bi setovali bazicnu validaciju koja dolazi uz schema-u taj properti koji smo definisali da ce da bude u nasoj schema-i (name, completed) moramo da stavimo da to budu OBJEKTI i nad njima da definisemo sta sve zelimo za vladaciju tog propertija.
  // ovo sto smo odredli ovde je neka vrsta bazicne validacije sta moze da prodje u bazu a sta ne, konrektno ovde za ime, ime NE MOZE  da bude prazan string, mora da ima neku vrednost, takodje moze da ima max 20 karaktera, bice trimovan ukoliko postoji prazan prostor oko imena!
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// sada kada smo setovali skimu za taskove, odnosno sada kada imamo strukturu za nase podatke o taskovima, moramo da setujemo model. Na model mozemo da gledamo kao na reprezentaciju kolekcije (koje mozemo da vidimo na mongoo atlas (za sada smo napravili samo Products))
// u mongoose model je zapravo wrapper za schema-u, ako schema-a definise stkrukturu za dokument kao sto je tip, validacija, mongoose model obezbedjuje interfejs baze podataka. Koriscenjem tog modela moci cemo da kreiramo, menjamo i brisemo nase dokumente sa lakocom.

module.exports = mongoose.model("Task", TaskSchema);
