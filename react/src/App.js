import logo from "./logo.png";
import OptionsForm from "./components/OptionsForm";
import Game from "./components/Game";
import { useState, useEffect }  from "react";
import React from "react";


const App = () => {
  const [numberOfLetters, setNumberOfLetters] = useState(4);
  const [duplicateLetters, setDuplicateLetters] = useState(false);
  const [gameHasStarted, setGameHasStarted] = useState(false);

  const [gameOptions, setGameOptions] = useState({
    numberOfLetters: 4,
    duplicateLetters: false,
    gameHasStarted: false,
  })

  function startGame() {
    setGameHasStarted(true);
    setGameOptions({
      ...gameOptions,
      gameHasStarted: true
    });
  }

  return (
  <div className="container">
     <h2><img src={logo}></img></h2>
     {gameOptions.gameHasStarted? <Game></Game>: <OptionsForm 
     numberOfLetters={numberOfLetters} 
     setNumberOfLetters={setNumberOfLetters}
     duplicateLetters={duplicateLetters}
     setDuplicateLetters={setDuplicateLetters}
     setGameHasStarted={setGameHasStarted}
     gameOptions={gameOptions}
     setGameOptions={setGameOptions}
     startGame={startGame}
      >
     </OptionsForm>}
  </div>)
};

export default App;