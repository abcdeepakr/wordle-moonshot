/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react'
import GridRow from './gridRow'
import { useSelector, useDispatch } from 'react-redux';
import {wordleState, updateGuess,updateGuessed} from '../wordleSlice'
import { checkWordValidity, keyColorHashmap } from '../wordleAPI';
function WordleGrid() {
  const wordleData = useSelector(wordleState);
  const dispatch = useDispatch()
  const [currentGuess, setCurrentGuess] = useState('')
  const [seenWords, setSeenWords] = useState([])
  function handleKeyPress({key}){
    // if clicked enter
    // check if a valid word

    if(key === "Enter"){
      if(currentGuess.length < 5){
        alert("enter 5 letters")
        return
      }
      const isvalidWord = checkWordValidity(currentGuess)
      if(!isvalidWord) {
        alert("not a valid word")
        return
      }
      if(isvalidWord && wordleData.totalGuessed === 5){
        if(currentGuess.toLowerCase() !== wordleData.word){
          alert("you lost")
        }
      }
      if(seenWords.indexOf(currentGuess)!==-1){
        alert("word tried already")
        return
      }
      console.log(wordleData.totalGuessed)
      let cellColorHashmap = keyColorHashmap(currentGuess, wordleData.word)
      let updatedSeenWords = [...seenWords]
      updatedSeenWords.push(currentGuess)
      setSeenWords(updatedSeenWords)
      dispatch(updateGuess(cellColorHashmap))
      dispatch(updateGuessed())
      if(currentGuess.toLowerCase() === wordleData.word){
        console.log("you won")
      }
      setCurrentGuess("")
      return
    }
    if(key === "Backspace"){
      setCurrentGuess(currentGuess => currentGuess.slice(0, -1))
    }
    // if clicked backspace
    // if clicked valid character
    let validCharacterRegex = /^[a-zA-Z]{1}$/;
    if(validCharacterRegex.test(key)){
      if(currentGuess.length !== 5){
        setCurrentGuess(currentGuess => currentGuess+=key)
      }
    }
  }
  useEffect(()=>{
    window.addEventListener('keyup', handleKeyPress)

    return () => window.removeEventListener('keyup', handleKeyPress)
    // document.addEventListener('keydown', function(event){
    //   handleKeyPress(event.key)
    // })    
  },[handleKeyPress])
  return (
    <React.Fragment>
        {/* Creating 6 rows */}
        <h3>{wordleData.word}</h3>
        {wordleData.guesses.map((guess,index) =>{
          if(index === wordleData.totalGuessed){
            return <GridRow key={index} currentGuess={currentGuess}/>   
          } 
          return <GridRow key={index} prevGuess={guess}/> 
        })}
    </React.Fragment>
  )
  }

export  default WordleGrid