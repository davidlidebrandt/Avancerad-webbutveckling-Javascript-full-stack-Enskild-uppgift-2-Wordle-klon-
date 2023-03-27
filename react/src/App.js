import logo from "./logo.png";
import OptionsForm from "./components/OptionsForm";
import Game from "./components/Game";
import { useState, useEffect }  from "react";
import React from "react";


const App = () => {
  const [numberOfLetters, setNumberOfLetters] = useState(4);
  const [duplicateLetters, setDuplicateLetters] = useState(false);
  const [gameHasStarted, setGameHasStarted] = useState(false);

  function startGame() {
    setGameHasStarted(true);
  }

  return (
  <div className="container">
     <h2><img src={logo}></img></h2>
     {gameHasStarted? <Game></Game>: <OptionsForm 
     numberOfLetters={numberOfLetters} 
     setNumberOfLetters={setNumberOfLetters}
     duplicateLetters={duplicateLetters}
     setDuplicateLetters={setDuplicateLetters}
     setGameHasStarted={setGameHasStarted}
     startGame={startGame}
      >
     </OptionsForm>}
  </div>)
};

export default App;