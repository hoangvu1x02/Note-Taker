const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs').promises;
const shortid = require('shortid');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//__dirname is your current location
app.use(express.static(path.resolve(__dirname,'public')));

const filePath = path.join(__dirname, "db", "db.json");

//The routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });

// app.use("*", function(req, res) {
//     res.redirect('/');
//   });

//render all the notes
app.get("/api/notes", async function(req, res) {
    const noteData = await fs.readFile(filePath, 'utf-8'); 
    const convertedData = JSON.parse(noteData);
    res.json(convertedData);
  });

  //adding new notes
app.post("/api/notes", async function(req, res) {
    const {title, text} = req.body;

    const noteData = await fs.readFile(filePath, 'utf-8'); 
    const convertedData = JSON.parse(noteData);
  
    convertedData.push({
      id: shortid.generate(),
      title,
      text
    });

    await fs.writeFile(filePath, JSON.stringify(convertedData))

    res.end();
  });

  //delete note by id
app.delete("/api/notes/:id", async function(req, res) {
  const noteData = await fs.readFile(filePath, 'utf-8'); 
  const convertedData = JSON.parse(noteData);

  //getting the ID of a specific note
  const noteID = req.params.id;
  console.log(noteID);

  //filtering all notes that dont have matched id with the deleted one and store into a new variable
  const newData = convertedData.filter(note => note.id !== noteID);

  //convert JSON data into string to be able to read
  await fs.writeFile(filePath, JSON.stringify(newData));

    res.end();
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))