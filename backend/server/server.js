const express = require('express');
const cors = require('cors')
const datas = require('../data/datas');
const connectDb = require('../utils/connection_db');
const colors = require('colors');
const mainRouter = require('../routes/index.routes');
const {notFound, errorHandler} = require('../middlewares/errorMiddleware')
require('dotenv').config()

const PORT = process.env.PORT || 3000;


connectDb();

const app = express();
app.use(cors('*'))
app.use(express.json())

// app.use(notFound);
// app.use(errorHandler);




app.get('/', (req, res)=>{
    res.send('API is Running successfuly')
})


app.use(mainRouter)

const server = app.listen(PORT,console.log(`Server runnning 5600`.blue.bold))  
const io = require('socket.io')(server, {
    pingTimeOut : 60000,
    cors : {
        origin : "http://localhost:5173"
    }
})

io.on('connection', socket =>{
    console.log('connected to socket');
    socket.on('setup', (userdata)=>{
     socket.join(userdata?._id)
     socket.emit('connected')
     
     socket.on('join chat', (room)=>{
         socket.join(room)
         console.log("User joined Room :" + room);
        });
        
        
        socket.on('typing', (room)=> socket.in(room).emit('typing'));
        socket.on('stop typing', (room)=> socket.in(room).emit('stop typing'));
        
        socket.on('newMessage', (newMessageRecived)=>{
            var chat = newMessageRecived.chat;
            
            if(!chat.users) return console.log('chat.users not defined');
            
chat.users.forEach(user=>{
    if(user._id == newMessageRecived.sender._id) return ;
    socket.in(user._id).emit('message recived', newMessageRecived)
})
})



socket.off('setup', ()=>{
    console.log('User Disconnected');
    socket.leave(userdata._id)
})

});
})