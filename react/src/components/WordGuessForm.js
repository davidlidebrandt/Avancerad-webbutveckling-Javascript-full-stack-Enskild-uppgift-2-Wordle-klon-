import React from 'react'
import axios from 'axios';

export default function WordGuessForm({currentGame, currentGame: {currentWord, guesses}, setCurrentGame}) {
  async function enterWord(e) {
    e.preventDefault();
    console.log(currentWord)
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
    console.log(res);
  
    setCurrentGame({
        ...currentGame,
        checkedLetters: res.data.data,
        guesses: [...guesses, currentWord]
    });

    console.log("h")

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
