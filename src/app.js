const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello There!")
})

app.listen(PORT, () => {
    console.log('App Listening on port' + PORT)
})