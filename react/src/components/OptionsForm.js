import React from "react";

export default function OptionsForm({
  gameOptions,
  gameOptions: { numberOfLetters, duplicateLetters },
  setGameOptions,
  startGame,
}) {
    console.log(gameOptions)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startGame();
      }}
    >
      <label htmlFor="letters">
        Choose the number of letters (between 4 and 6)
      </label>
      <input
        value={numberOfLetters}
        onChange={(e) => {
            setGameOptions({
                ...gameOptions,
                NumberOfLetters: e.target.value
            });
        }}
        required
        type="number"
        id="letters"
        name="letters"
        min="4"
        max="6"
      ></input>
      <label htmlFor="duplicateLetters"> Can contain duplicate letters?</label>
      <input
        checked={duplicateLetters}
        onChange={(e) => {
          setGameOptions({
            ...gameOptions,
            duplicateLetters: e.target.checked
          }  
          )
        }}
        type="checkbox"
        id="duplicateLetters"
        name="duplicateLetters"
      ></input>
      <button type="submit">Start Game</button>
    </form>
  );
}
