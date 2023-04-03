import express from "express";
import nunjucks from "nunjucks";
import axios from "axios";
import fs from "fs";
import filterGameOptions from "./server/js/filterGameOptions.js";

const app = express();

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(express.static("./public"));

app.use(express.json());

app.get("/", (req,res)=> {
    res.render("index.html");
});

app.get("/information", (req,res)=> {
    res.render("information.html");
});

app.get("/high-scores", (req,res)=> {
    res.render("high-scores.html");
});

app.get("/api/word", async (req,res)=> {
    let numberOfLetters = req.body.numberOfLetters;
    let duplicateLetters = req.body.duplicateLetters;

    if(isNaN(numberOfLetters) || numberOfLetters < 4 || numberOfLetters > 6 || typeof duplicateLetters !== "boolean") {
        res.status(422).json({error: "Invalid data"});
    }
       
    try {
        let words = fs.readFileSync("./server/words.json", "utf-8")
        words = JSON.parse(words);
        words = Object.keys(words);
        const word = filterGameOptions(words, 5, true);
        res.status(201).json({data: word});
        
    } catch (error) {
        res.status(500).json({error: "Error fetching the word, please try again"});
    }
   
});

export default app;


