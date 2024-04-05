const Router = require("express").Router();
const path = require("path");
const fs = require("fs");

// Initialize count object to track downloads
let count = {
    "EPS-Main": 35,    // Initial count for "EPS-Main" file
    "EPS-Actual": 1   // Initial count for "EPS-Actual" file
}

// Define route handler for GET requests to "/"
Router.get("/", async (req, res) => {
    const { file } = req.query;

    // Check if 'file' parameter is provided
    if (!file) {
        return res.status(400).send("File name is required.");
    }

    // Resolve file path
    const filePath = path.resolve(`./Questions/${file}.pdf`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found.");
    }

    // Increment download count for the requested file
    count[file]++;
    console.log(`Downloaded ${file}.pdf ${count[file]} times`);

    // Set the Content-Disposition header to prompt download with the specified file name
    res.setHeader('Content-Disposition', `attachment; filename="${file}.pdf"`);

    // Send the file
    res.sendFile(filePath);
});

module.exports = Router;
