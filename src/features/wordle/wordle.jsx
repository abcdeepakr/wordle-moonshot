import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRandomWord } from './wordleAPI';
import {
  getWord
} from './wordleSlice';
import './wordle.css';
import WordleGrid from './components/wordleGrid';
function Wordle() {
  const dispatch = useDispatch()
  // getting a word
  useEffect(()=>{
    const selectedWord = getRandomWord()
    dispatch(getWord(selectedWord))
  },[])
  return (
    <section data-section-id ="wordle-layout-container">
        <WordleGrid/>
    </section>
  )
}

export default Wordle