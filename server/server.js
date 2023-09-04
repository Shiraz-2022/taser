import express from 'express';
import cors from 'cors';
import { taskRouter } from './api.js';
import process from 'process';
const app = express();
const port = process.env.PORT||3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api', taskRouter);

app.listen(port, () => {
  console.log('server is running on port ' + port);
});