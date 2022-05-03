const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // unutar findOneAndUpdate() metode za prvi argument prosledjuemo id koji dobijamo uz patch zahtev da bi znali koji element zelimo da promenimo tj updateujemo unutar baze, za drugi argument prosledjujemo objekat sa updatovanim podacima (sa onim kojim zelimo da zamenimo to sto se nalazi na serveru), posto je req.body sam po sebi objekat sa svim oni sto smo prosledili sa klijentske strane mozemo da stavimo sa njega ovako, bez {}
    // time sto smo setovali ovaj treci argument unutar findOneAndUpdate() metode pobrniuli smo se da uvek dobijamo novu verziju nazad, tacnije ovim new: true, bez njega bi dobijali nazad onu staru verziju koja je bila vec u bazi. Takodje imamo properti koji mozemo da definisemo da nam pokrene validatore runValidator: true, po defaultu sa ovom metodom oni nece raditi tako da moramo da ih pokrenemo rucno!
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }

    // ako ne prlosledimo option kao treci argument ove findOneAndUpdate() metode, ukoliko setujemo nas server da vraca taj updateovani task videcemo zapravo staru verziju koja je vec postojala unutar baze. Dakle po defaultu mi dobijamo staru verziju ukoliko ne prosledimo treci argument unutar findOneAndUpdate() metode
    // cak se ni validatori nece pokrenuti (koje smo odredili na task skimi);
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
