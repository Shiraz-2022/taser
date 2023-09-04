import express from 'express';
import { connection } from './db.js';
const taskRouter = express.Router();

taskRouter.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
    else {
      res.json(results);
    }
  });
});

taskRouter.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('SELECT * FROM tasks WHERE id =?', [taskId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error fetching task" });
    }
    else {
      res.json(results[0]);
    }
  });
});

taskRouter.post('/tasks', (req, res) => {
  const { title, description, date, status } = req.body;
  connection.query('INSERT INTO tasks (title,description,date,status) VALUES (?,?,?,?)', [title, description, date, status], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error Creating task" });
    }
    else {
      res.json({ id: results.insertId, ...req.body });
    }
  });
});


taskRouter.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, date, status } = req.body;
  connection.query('UPDATE tasks SET title = ?, description = ?, date = ?, status = ? WHERE id = ?', [title, description, date, status, taskId], (error) => {
    if (error) {
      res.status(500).json({ error: 'Error updating task' });
    } else {
      res.json({ id: taskId, title, description, date, status });
    }
  });
});

taskRouter.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('DELETE FROM tasks WHERE id = ?', [taskId], (error) => {
    if (error) {
      res.status(500).json({ error: 'Error deleting task' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
});

export { taskRouter };