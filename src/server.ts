import { NextFunction, Request, Response } from "express";

const express = require('express'); // a bare path
const mongoose = require('mongoose');
const cors = require('cors')

const connect = require('./db/connect');
const wilder = require('./models/Wilder');
const wilderController = require(`./controllers/wilders`);

connect();


const app = express();
app.use(cors())

app.get('', (req: Request, res: Response) => {
  console.log(req);
  res.send({ success: true, data: { title: 'Welcome to my website' } });
});

app.get('/createUser', async (req: Request, res: Response, err: any) => {
  const Jeremy = new wilder({
    img: 'https://chaire-eti.org/wp-content/uploads/2018/01/avatar-homme.png',
    name: 'jeremy',
    city: 'Lille',
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex repellat aliquam dolores minima eum saepe hic sapiente voluptatum, nulla inventore illum aliquid aspernatur ea soluta dolor esse modi! Ab, delenit',
    skills: [
      {
        title: 'HTML',
        votes: 15,
      },
      {
        title: 'CSS',
        votes: 15,
      },
    ],
  });


  try {
    await Jeremy.save();
    res.send(Jeremy);
  } catch (err: any) {
    console.error(err.message);
  }
});
function runAsyncWrapper(callback: (req: Request, res: Response, next: NextFunction) => Response) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      callback(req, res, next)
    }
    catch (error) {
      next(error)
    }
  };
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/api/wilder/create", runAsyncWrapper(wilderController.create));
app.get('/api/wilder/read', runAsyncWrapper(wilderController.read));
app.post('/api/wilder/update/:id', runAsyncWrapper(wilderController.update));
app.delete('/api/wilder/delete/:id', runAsyncWrapper(wilderController.delete));


const PORT = 3000;
app.listen(PORT, () => console.log(`Listenning on port ${PORT}`));
