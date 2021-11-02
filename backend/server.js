/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// eslint-disable-next-line no-undef
// connect mogoose to mogodb database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/oxytradepost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// get takes two arguments: 1) the URL to listen 2) function that takes in an object of (req, res). 
app.get('/', (req, res) => {
  res.send('Server is ready');
});


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

/*
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
*/
