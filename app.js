require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const path = require("path");
const cookiePaser = require("cookie-parser");
const ConnectDatabase = require('./DB/index.js');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./View"));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());


app.get("/", (req, res) => {
    res.send("Hello, I am Ritik 😴")
})


app.use("/download", require("./Router/file.router.js"))



ConnectDatabase()
    .then(() => {
        app.listen(8000)
        console.log("Server Started")
    })


