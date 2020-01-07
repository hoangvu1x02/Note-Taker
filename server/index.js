const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs').promises;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'..','public')));

const filePath = path.join(__dirname, "..", "db", "db.json");
app.get("/", function(req, res) {
  console.log(path.join(__dirname, "..", "public", "index.html"));
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "notes.html"));
  });

// app.get("*", function(req, res) {
//     res.redirect('/');
//   });

app.get("/api/notes", async function(req, res) {
    const noteData = await fs.readFile(filePath, 'utf-8'); 
    const convertedData = JSON.parse(noteData);
    res.json(convertedData);
  });

app.post("/api/notes", async function(req, res) {
    const {title, text} = red.body;

    const noteData = await fs.readFile(filePath, 'utf-8'); 
    const convertedData = JSON.parse(noteData);
    // return res.json(convertedData);

    res.end();
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))