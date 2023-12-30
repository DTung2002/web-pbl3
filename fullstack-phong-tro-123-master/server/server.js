import express from 'express'
require('dotenv').config()
import cors from 'cors'
import initRoutes from './src/routes'
import connectDatabase from './src/config/connectDatabase'
const { Server } = require("socket.io");
const server = require('http').createServer(app);
const app = express()
// import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux'
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", 'GET', 'PUT', "DELETE"]
}))
// const {currentData} = useSelector(state=>state.user)
// const [usernam, setUsername] = useState('')
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  app.get('/Chat', (req, res) => {
    res.sendFile(("C:/Users/Lenovo/Downloads/webPBL/fullstack-phong-tro-123-master/client/src/containers/Public/ChatComponent.js"));
  });
  io.on("connection", (socket) => {
    // socket.emit('user', (data) =>{
    //   console.log(socket.id)
    //   socket.id = data;
    // })
    socket.on('out', (data)=>{
      socket.leave(data);
      socket.Phong = data;
      socket.emit('out room', data);
    })
    console.log('new connect from ' +socket.id);
    socket.on('chat room', (data)=>{
      socket.join(data);
      socket.Phong = data;
      socket.emit('room', data);
    })
    socket.on('chat message', (msg, currentData) =>{

    io.emit('message', msg, currentData)
    });
    socket.on('disconnect', () =>{
      console.log('user disconnected')
    })
  });
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
connectDatabase()
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Server is running on the port ${listener.address().port}`)
})

