import React from "react";
import { useState } from "react";
import axios from "axios";

export default function ScoreForm({ setGameOptions, setCurrentGame }) {
  const [userName, setUserName] = useState("");

  function resetGame() {
    setGameOptions({
        numberOfLetters: 4,
        duplicateLetters: false,
        gameHasStarted: false,
        gameHasFinished: false,
      });
      setCurrentGame({
        checkedLetters: [],
        currentWord: "",
        guesses: [],
        startTime: Date.now(),
      });
      sessionStorage.removeItem("activeGame");
  }

  async function sendScore(e) {
    e.preventDefault();
    const gameId = sessionStorage.activeGame;
    const res = await axios.post(
      "/api/add-score",
      {
        gameId,
        userName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    resetGame();
   
  }
  return (
    <>
      <h3>Congratulations you guessed the right word!</h3>
      <h4>Enter your name for a chance to appear on our high score page</h4>
      <form
        onSubmit={(e) => {
          try {
            sendScore(e);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
        ></input>
        <button type="submit">Send</button>
      </form>
      <button onClick={()=>{resetGame()}}>Skip</button>
    </>
  );
}
