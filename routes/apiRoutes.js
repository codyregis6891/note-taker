const express = require("express");
const routes = express.Router();
const fs = require("fs");
const uniqid = require('uniqid');
const util = require('util');

routes.get("/api/notes", function(req,res){
    fs.readFile("./db/db.json", (err, data) => {
        let note = JSON.parse(data)
        if(err) throw err;
        else return res.json(note)
    })
});

routes.post("/api/notes", function(req,res){
    const dbFile = fs.readFileSync('./db/db.json', 'utf8');
    const dbParse = JSON.parse(dbFile);
    console.log(dbFile);
    const newNote = 
    {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    }
    dbParse.push(newNote);
    console.log(dbParse);
    
    fs.writeFile('./db/db.json', JSON.stringify(dbParse), (err)  =>{
        if (err) throw err;
        console.log("note saved");
        res.json(newNote);
    })
});

routes.delete("/api/notes/:id", function(req,res){
    let note = req.params.id;
    console.log(note);
    fs.readFile("./db/db.json", (err, data) => {
        let notes = JSON.parse(data)
        if(err) throw err;
        let filteredNotes = notes.filter(item=>item.id != note);

        fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err)  =>{
            if (err) throw err;
            console.log("note deleted");
            res.json(filteredNotes);
        })
    });
})

module.exports = apiRoutes;