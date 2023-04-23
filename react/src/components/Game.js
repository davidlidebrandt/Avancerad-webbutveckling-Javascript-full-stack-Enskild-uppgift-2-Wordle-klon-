import React from "react";
import { useEffect } from "react";
import axios from "axios";
import WordGuessForm from "./WordGuessForm";
import "../scss/Game.scss";

export default function Game({ gameOptions, setGameOptions, currentGame, setCurrentGame }) {
  const activeGame = sessionStorage.activeGame;

  useEffect(() => {
    if (activeGame) {
    } else {
      async function newGame(numberOfLetters, duplicateLetters) {
        const res = await axios.post(
          "/api/word",
          {
            numberOfLetters,
            duplicateLetters,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        sessionStorage.activeGame = res.data.id;
      }

      try {
        newGame(gameOptions.numberOfLetters, gameOptions.duplicateLetters);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  let currentLetters = currentGame.checkedLetters.map((l, i) => {
    if (Object.values(l)[0] === "correct") {
      return (
        <div key={i} className="letter-box correct-letter">
          {Object.keys(l)}
        </div>
      );
    } else if (Object.values(l)[0] === "misplaced") {
      return (
        <div key={i} className="letter-box misplaced-letter">
          {Object.keys(l)}
        </div>
      );
    } else {
      return (
        <div key={i} className="letter-box">
          {Object.keys(l)}
        </div>
      );
    }
  });

  return (
    <div className="game-container">
      {currentLetters}
      <div className="color-boxed-container">
        <div className="color-box green-box">
          <small>Correct letter</small>
        </div>
        <div className="color-box light-box">
          <small>Misplaced letter</small>
        </div>
        <div className="color-box">
          <small>Incorrect letter</small>
        </div>
      </div>
      <WordGuessForm
        gameOptions={gameOptions}
        setGameOptions={setGameOptions}
        currentGame={currentGame}
        setCurrentGame={setCurrentGame}
      ></WordGuessForm>
    </div>
  );
}
