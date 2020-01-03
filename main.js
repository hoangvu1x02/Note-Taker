const fs = require('fs');
const shortid = require('shortid');
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let notes = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays all characters
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});


app.post("/api/notes", function (req, res) {

    var newNote = req.body;

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
