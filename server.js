const fs = require('fs');
const express = require('express');
const path = require('path');
const uuid = require('uuid');
const dbJson = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("assets"));
app.use(express.json());

app.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "assets/notes.html"))
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "assets/index.html"))
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"))
});

app.post("/api/notes", (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    dbJson.push(newNotes);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});

app.delete("/api/notes/:id", (req,res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json"));
    const trash = dbJson.filter((delNote) => delNote.id !== req.params.id);
    fs.writeFileSync("db/db.json", JSON.stringify(trash));
    res.json(trash); 
})

app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT)
});