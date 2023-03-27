import logo from "./logo.png";

import React from "react";
const App = () => {
  return (
  <div className="container">
     <h2><img src={logo}></img></h2>
     <form>
     <label for="letters">Choose the number of letters (between 4 and 6)</label>
     <input required type="number" id="letters" name="letters" min="4" max="6"></input>
     <label for="duplicateLetters"> Can contain duplicate letters?</label>
     <input type="checkbox" id="duplicateLetters" name="duplicateLetters" value="true"></input>
     <button type="submit">Start Game</button>
     </form>
  </div>)
};

export default App;