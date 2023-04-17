import React from 'react'
import axios from 'axios';

export default function WordGuessForm({gameOptions, setGameOptions, currentGame, currentGame: {currentWord, guesses}, setCurrentGame}) {
  async function enterWord(e) {
    e.preventDefault();
  
    const gameId = sessionStorage.activeGame;
    const guessedWord = currentWord;
    const res = await axios.post(
      "/api/check-word",
      {
        gameId,
        guessedWord
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    await setCurrentGame({
        ...currentGame,
        checkedLetters: res.data.data,
        guesses: [...guesses, currentWord]
    });

    const gameIsWon = res.data.data.finished;
    console.log(gameIsWon)

    if(gameIsWon) {
      await setGameOptions({
        ...gameOptions,
        gameHasFinished: true,
        test: "test"
      });
      sessionStorage.removeItem("activeGame");
      console.log(gameOptions)
    }

  }
  return (
    <form onSubmit={(e)=> {try {
      enterWord(e)
    } catch (error) {
      console.log(error)
    }}} className='word-guess-form'>
      <input value={currentWord} onChange={((e)=> { setCurrentGame({
        ...currentGame,
        currentWord: e.target.value
      })})} className='word-input' type="text" name="word" id="word"></input>
      <button className='word-input-button' type='submit'>Enter word</button>
    </form>
  )
}
