const Router = require("express").Router();
const path = require("path");
const fs = require("fs");
const SendMail = require("../Middleware/sendMail");

Router.get("/", SendMail ,async (req, res) => {
    const { file } = req.query;

    if (!file) {
        return res.status(400).send("File name is required.");
    }

    const filePath = path.resolve(`./Questions/${file}.pdf`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found.");
    }

    // Set the Content-Disposition header to prompt download with the specified file name
    res.setHeader('Content-Disposition', `attachment; filename="${file}.pdf"`);

    // Send the file
    res.sendFile(filePath);
});

module.exports = Router;
