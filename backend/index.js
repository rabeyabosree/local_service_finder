const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

const PORT = process.env.PORT

// cors
app.use(cors(
    {
        origin: process.env.BASE_URL,
        credentials: true
    }
))

// json and formdat data middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mongoose connection
const MOBGO_URI = process.env.MONGO_URI
mongoose.connect(MOBGO_URI)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("Mongodb error", err))


// routes
const authRoute = require("./routes/authRoute")
const serviceRoute = require("./routes/servicesRoute")
const bookingRoute = require("./routes/bookingRoute")
const testimonalRoute = require("./routes/testimonalsRoute")
app.use("/api/auth", authRoute)
app.use("/api/services", serviceRoute)
app.use("/api/booking", bookingRoute)
app.use("/api/testimonals", testimonalRoute)

// app listening
app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`) })

// app response
app.use("/", (req, res) => {
    res.send("Hello world")
})