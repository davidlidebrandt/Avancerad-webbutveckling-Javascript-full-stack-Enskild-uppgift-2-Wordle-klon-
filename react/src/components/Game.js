import React from 'react';
import { useState } from 'react';
import WordGuessForm from './WordGuessForm';
import "../scss/Game.scss";

const letters = [
    {letter: "w", correct: true, misplaced: false},
    {letter: "k", correct: false, misplaced: true},
    {letter: "s", correct: false, misplaced: false},
    {letter: "i", correct: false, misplaced: false},
]

export default function Game() {
  const {correctWord, setCorrectWord} = useState("wind");

  let currentLetters = letters.map((l, i)=> {
    if(l.correct) {
        return <div key={i} className='letter-box correct-letter'>{l.letter}</div>
    }
    else if(l.misplaced) {
        return <div key={i} className='letter-box misplaced-letter'>{l.letter}</div>
    }
    else {
        return <div key={i} className='letter-box'>{l.letter}</div>
    }
  });
  console.log(currentLetters)
  return (
    <div className='game-container'>
        {currentLetters}
        <WordGuessForm></WordGuessForm>
    </div>
  )
}
