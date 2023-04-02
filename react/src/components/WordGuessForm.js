import React from 'react'

export default function WordGuessForm({currentGame, currentGame: {current, guesses}, setCurrentGame}) {
  function enterWord(e) {
    e.preventDefault();
    setCurrentGame({
        ...currentGame,
        guesses: [...guesses, current]
    });

  }
  return (
    <form onSubmit={(e)=> {enterWord(e)}} className='word-guess-form'>
      <input value={current} onChange={((e)=> { setCurrentGame({
        ...currentGame,
        currentWord: e.target.value
      })})} className='word-input' type="text" name="word" id="word"></input>
      <button className='word-input-button' type='submit'>Enter word</button>
    </form>
  )
}
