import express from "express";
import nunjucks from "nunjucks";
import mongoose from "mongoose";
import * as uuid from "uuid";
import dotenv from "dotenv";
import fs from "fs";
import filterGameOptions from "./server/js/filterGameOptions.js";
import wordCheck from "./server/js/wordCheck.js";
import Game from "./server/models/Game.js";
import HighScore from "./server/models/highScore.js";
import saveInDb from "./server/js/saveInDB.js";
import getOneFromDB from "./server/js/getOneFromDB.js";
import updateOneFromDB from "./server/js/updateOneFromDB.js"
import highScoreRouter from "./server/js/highScoreRouter.js";

dotenv.config();

const app = express();

const DBUrl = process.env.DB_URL;

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");

app.use(express.static("./public"));

app.use(express.json());

app.use("/high-scores", highScoreRouter)

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/information", (req, res) => {
  res.render("information.html");
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
      finished: false
    });
    await saveInDb(process.env.DB_URL, newGame);

    res.status(201).json({ id: id, data: word });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error, errorMessage: "Error fetching the word, please try again" });
  }
});

app.post("/api/add-score", async(req, res)=> {
  const { gameId, userName } = req.body;

  try {
    const game = await getOneFromDB(DBUrl, Game, {id: gameId});
    const lastGuess = game.guesses.pop();
    const correctWord = game.correctWord;
    const scoreAlreadyAdded = await getOneFromDB(DBUrl, HighScore, {gameId: game.gameId});
    console.log(scoreAlreadyAdded);
    if(lastGuess === correctWord && (!scoreAlreadyAdded)) {
      const score = new HighScore({
        id: uuid.v4(),
        gameId: game.GameId,
        userName: userName,
        wordLength: game.correctWord.length,
        guesses: game.guesses,
        completionTime: Date.now() - game.startTime,
      });
      const savedScore = await saveInDb(DBUrl, score);
      return res.status(201).json({message: "Your score was saved", data: savedScore});
    }
    return res.status(400).json({errorMessage: "Invalid data"});
  } catch (error) {
    res.status(400).json({errorMessage: "Invalid data", error:error});
  }
})

app.post("/check-word", async (req, res) => {
  const {gameId, guessedWord} = req.body;
  let correctWord;

  try {
    const {finished: gameAlreadyFinished} = await getOneFromDB(DBUrl, Game, {id: gameId});
    
    if(gameAlreadyFinished) {
      throw "Invalid game data";
    }
    const currentGame = await updateOneFromDB(DBUrl, Game, gameId, guessedWord, { $push: { guesses: guessedWord }});
    const correctGuess = currentGame[0];
    const gameData = currentGame[1];
    correctWord = gameData.correctWord;
    if(correctGuess) {
      await updateOneFromDB(process.env.DB_URL, Game, gameId, guessedWord, {finished: true });
      return res.status(201).json({message: "Congratulations! You guessed the right word", data: gameData});
    }
  } catch (error) {
     return res.status(404).json({error:error, errorMessage: "Game not found"});
  }

  const checkedLetters = wordCheck(guessedWord, correctWord);
  res.status(201).json({data: checkedLetters});
});

export default app;
