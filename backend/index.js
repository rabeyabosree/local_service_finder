const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const { Server } = require("socket.io");
const http = require("http");
const initSocket = require("./utililty/initSocket");

const app = express()

const PORT = process.env.PORT || 5000  


// SOCKET SERVER
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.BASE_URL,
        credentials: true
    }
})

initSocket(io);


// cors
app.use(cors(
    {
        origin: process.env.BASE_URL,
        credentials: true
    }
))


// json and formdata middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// mongoose connection
const MONGO_URI = process.env.MONGO_URI  // ✅ FIXED TYPO

mongoose.connect(MONGO_URI)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("Mongodb error", err))


// routes
const authRoute = require("./routes/authRoute")
const serviceRoute = require("./routes/servicesRoute")
const bookingRoute = require("./routes/bookingRoute")
const testimonialRoute = require("./routes/testimonalsRoute") 
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");

app.use("/api/auth", authRoute)
app.use("/api/services", serviceRoute)
app.use("/api/booking", bookingRoute)
app.use("/api/testimonals", testimonialRoute) 
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute);


// app response
app.get("/", (req, res) => {   
    res.send("Hello world")
})


// app listening
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})