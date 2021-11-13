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

// CREATE A SERVER
// const server = http.createServer(app);
const server = http.Server(app);
// const io = new Server(server); // socket io takes in the HTTP object
const io = new Server(server, { cors: { origin: '*' } });
const users = []; //users: users objects array for Socket io server



// Everything is event based.
// SERVER SIDE
// The first event: a connection between server and client
  // have access to a web socket object & a callback
    // then 2 things
      // 1. listen to the message, socket.on
      // 2. send back to the client: socket.send
// CLIENT SIDE
// listen to method: something like "socket.onmessage"
// send messages, dealing with button etc.

// socket io, main feature: server can broadcast message to multiple clients
// 


// connection between 
  // socket id
  // user id

io.on('connection', (socket) => {
  console.log('connection', socket.id);
  // we can call an event anything we want
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        // disconnect user by updateUser with online status changed to false
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  // clien emits "onLogin" event and returns user
  // server listens to "onLogin" event and takes user as parameter
  // user input = all users logging from client
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user, //super all user attributes
      online: true, 
      socketId: socket.id,
      messages: [],
      toSeller: user.toSeller,
    };
    console.log("received seller info: ", updatedUser.toSeller);
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser); // add created user to users []
    }
    console.log('Online', user.name);
    console.log('user info: ', user); 

    const seller = users.find((x) => (x._id === updatedUser.toSeller) && x.online); 
    if (seller){
      console.log('seller name: ', seller.name);
    }else{
      console.log('seller not logged in');
    }

    const admin = users.find((x) => x.isAdmin && x.online); 
    if (admin) { //broadcast all admins of the new logged in user
      // set user online by updateUser with user onine == true
      io.to(admin.socketId).emit('updateUser', updatedUser); 
    }
    if (updatedUser.isAdmin) { //send the new logged in user the online user list
      // if an admin logs in, list users for admin
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  // (message): message it gets listen to
  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        // .emit: broadcast messag to someone/or multiple clients
        io.to(user.socketId).emit('message', message); 
        user.messages.push(message); // save to message history
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else { // admin is offline
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Sorry. I am not online right now',
        });
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