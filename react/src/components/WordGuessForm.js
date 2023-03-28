import React from 'react'

export default function WordGuessForm() {
  return (
    <form className='word-guess-form'>
      <input className='word-input' type="text" name="word" id="word"></input>
      <button className='word-input-button' type='submit'>Enter word</button>
    </form>
  )
}
