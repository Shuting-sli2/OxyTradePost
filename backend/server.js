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

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  // first event, disconnnet
  socket.on('disconnet', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        // emit user emit and pass user info to admin
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updateUser = {
      ...user,
      online: true,
      socketId = socket.id,
      message =[],
    };
    const existUser = users.find((x) => x.id === updatedUser.id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      // emit user emit and pass user info to admin
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      // emit user emit and pass user info to admin
      io.to(admin.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user.id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  // message event
  socket.on('onMessage', (message) => {
    if (message.isAdmin){ // message sent if from admin
        // message._id: receiver of message
        // x.online: check receiver is online
        const user = users.find((x) => x._id === message._id && x.online);
        if (user){
          io.to(user.socketId).emit('meesage', message); // send message to the user
          user.message.push(message); // push to the history of this user & admin
        }
    } else{ // message sent if from regular user
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin){
        io.to(admin.socketId).emit('meesage', message); // send message to the user
        const user = users.find((x) => x._id === message._id && x.online);
        user.message.push(message); // push to the history of this user & admin
      } else{ // admin is offline
        io.to(socket.id).emit('message',{
          name: 'Admin',
          body: 'Sorry, I am not online right now',
        }
        )
      }
    } 
  });


});

/*
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
*/
server.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});