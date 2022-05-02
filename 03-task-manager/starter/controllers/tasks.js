const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  res.send("all items from list");
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.json({
    id: req.params.id,
    msg: `Task with id ${req.params.id} was successfuly deleted`,
  });
  // res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
