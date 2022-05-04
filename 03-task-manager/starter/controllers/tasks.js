const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  // unutar findOneAndUpdate() metode za prvi argument prosledjuemo id koji dobijamo uz patch zahtev da bi znali koji element zelimo da promenimo tj updateujemo unutar baze, za drugi argument prosledjujemo objekat sa updatovanim podacima (sa onim kojim zelimo da zamenimo to sto se nalazi na serveru), posto je req.body sam po sebi objekat sa svim oni sto smo prosledili sa klijentske strane mozemo da stavimo sa njega ovako, bez {}
  // time sto smo setovali ovaj treci argument unutar findOneAndUpdate() metode pobrniuli smo se da uvek dobijamo novu verziju nazad, tacnije ovim new: true, bez njega bi dobijali nazad onu staru verziju koja je bila vec u bazi. Takodje imamo properti koji mozemo da definisemo da nam pokrene validatore runValidator: true, po defaultu sa ovom metodom oni nece raditi tako da moramo da ih pokrenemo rucno!
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }

  // ako ne prlosledimo option kao treci argument ove findOneAndUpdate() metode, ukoliko setujemo nas server da vraca taj updateovani task videcemo zapravo staru verziju koja je vec postojala unutar baze. Dakle po defaultu mi dobijamo staru verziju ukoliko ne prosledimo treci argument unutar findOneAndUpdate() metode
  // cak se ni validatori nece pokrenuti (koje smo odredili na task skimi);
  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
