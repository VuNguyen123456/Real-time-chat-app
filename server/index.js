const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const messagesRoute = require("./routes/messagesRoute")
const app = express();
const socket = require("socket.io");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/messages", messagesRoute)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connection sucessful");
}).catch((err)=> {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials: true,
    }
})

global.onlineUsers= new Map();

// When ever we have a connetion
    // When ever user is login will establish a user connection via add user
    // Then emit message user
        //=> when user offline the message will be stored in the db
        //=> when user is online the msg will the store to db and receive the msg at that moment only
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const SendUserSocket = onlineUsers.get(data.to);
        if(SendUserSocket){
            socket.to(SendUserSocket).emit("msg-receive", data.message);
        }
    });
});