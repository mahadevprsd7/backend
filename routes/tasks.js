const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// POST new task
router.post('/', async (req, res) => {
  console.log('Received body:', req.body);
  try {
    const task = new Task({ text: req.body.text });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT to update task (toggle or edit)
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});

// DELETE task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;