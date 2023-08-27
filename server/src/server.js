const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const socketio = require('socket.io')
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const usersRoutes = require('./routes/usersRoutes');
const messagesRoutes = require('./routes/messagesRoutes')
app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);

const uri = process.env.DATABASE_URI;

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  }
  catch(error){
    console.error(error);
  }
}  

connect();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

global.onlineUsers = new Map()

io.on('connection', (socket) => {
    console.log("User Connected", socket.id);
    
    socket.on("add_user", ({ userId }) => {
      console.log(`${userId} is online!`)
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send_message", (data) => {
      const sendUserSocket = onlineUsers.get(data.to)
      if(sendUserSocket){
        socket.to(sendUserSocket).emit("recieve_message", data.message.message);
      }     
    })
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      });
    });
})