import logo from "./logo.png";
import OptionsForm from "./components/OptionsForm";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import React from "react";

const App = () => {
  const [gameOptions, setGameOptions] = useState({
    numberOfLetters: 4,
    duplicateLetters: false,
    gameHasStarted: false,
  });

  const [currentGame, setCurrentGame] = useState({
    checkedLetters: [],
    currentWord: "",
    guesses: [],
    startTime: Date.now(),
  });

  return (
    <div className="container">
      <h2>
        <img src={logo}></img>
      </h2>
      {gameOptions.gameHasStarted ? (
        <Game gameOptions={gameOptions} currentGame={currentGame} setCurrentGame={setCurrentGame}></Game>
      ) : (
        <OptionsForm
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
        ></OptionsForm>
      )}
    </div>
  );
};

export default App;
