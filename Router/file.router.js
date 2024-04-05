const Router = require("express").Router();
const path = require("path");
const ExtractInfo = require("../Middleware/ExtractInfo");

Router.get("/", ExtractInfo, (req, res) => {
    const { file } = req.query;
    res.sendFile(path.resolve(`./Questions/${file}.pdf`))
})

module.exports = Router