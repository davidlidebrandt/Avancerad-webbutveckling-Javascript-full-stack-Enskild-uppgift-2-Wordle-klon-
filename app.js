import express from "express";
import nunjucks from "nunjucks";
import mongoose from "mongoose";
import * as uuid from "uuid";
import dotenv from "dotenv";
import fs from "fs";
import filterGameOptions from "./server/js/filterGameOptions.js";
import wordCheck from "./server/js/wordCheck.js";
import Game from "./server/models/Game.js";
import saveInDb from "./server/js/saveInDB.js";

dotenv.config();

const app = express();

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

async function connectToDb() {
  try {
  } catch (error) {}
}

connectToDb();

app.set("view engine", "html");

app.use(express.static("./public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/information", (req, res) => {
  res.render("information.html");
});

app.get("/high-scores", (req, res) => {
  res.render("high-scores.html");
});

app.post("/api/word", async (req, res) => {
  const { numberOfLetters, duplicateLetters } = req.body;
  const incorrectInputTypes =
    isNaN(numberOfLetters) ||
    numberOfLetters < 4 ||
    numberOfLetters > 6 ||
    typeof duplicateLetters !== "boolean";

  if (incorrectInputTypes) {
    res.status(422).json({ error: "Invalid data" });
  }

  try {
    let words = fs.readFileSync("./server/words.json", "utf-8");
    words = JSON.parse(words);
    words = Object.keys(words);
    const word = filterGameOptions(words, numberOfLetters, duplicateLetters);

    const id = uuid.v4();
    const newGame = new Game({
      id: id,
      startTime: new Date(),
      guesses: [],
      correctWord: word,
    });
    await saveInDb(process.env.DB_URL, newGame);

    res.status(201).json({ id: id, data: word });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching the word, please try again" });
  }
});

app.post("/check-word", (req, res) => {
  const gameId = req.body.gameId;
  const guessedWord = req.body.guessedWord;

  //replace with data from DB and add guessedWord to array of guesses
  let correctWord;

  try {
  } catch (error) {}

  const checkedLetters = wordCheck(guessedWord, correctWord);
  console.log(checkedLetters);
});

export default app;
