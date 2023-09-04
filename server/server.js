import express from 'express';
import cors from 'cors';
import { taskRouter } from './api.js';
import process from 'process';
import path from 'path';


const app = express();
const port = process.env.PORT||3000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api', taskRouter);

app.use(express.static(path.join(__dirname,"./dist")));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "./dist/index.html"))
});

app.listen(port, () => {
  console.log('server is running on port ' + port);
});