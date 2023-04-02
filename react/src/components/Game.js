import React from "react";
import { useState } from "react";
import WordGuessForm from "./WordGuessForm";
import "../scss/Game.scss";

export default function Game({ gameOptions, currentGame, setCurrentGame }) {
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
        currentGame={currentGame}
        setCurrentGame={setCurrentGame}
      ></WordGuessForm>
    </div>
  );
}
