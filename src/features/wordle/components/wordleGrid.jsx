/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react'
import GridRow from './gridRow'
import { useSelector, useDispatch } from 'react-redux';
import {wordleState, updateGuess,updateGuessed, updateModal} from '../wordleSlice'
import { checkWordValidity, keyColorHashmap } from '../wordleAPI';
import Keyboard from './keyboard';

function WordleGrid() {
  const wordleData = useSelector(wordleState);
  const dispatch = useDispatch()
  const [currentGuess, setCurrentGuess] = useState('')
  const [seenWords, setSeenWords] = useState([])
  const [gameEnd, setGameEnd] = useState(false)

  function updateModalData(show, content){
    dispatch(updateModal({showModal: show, modalContent: content}))
  }

  function handleKeyPress({key}){
    // If game has ended stop taking any more key inputs
    if(gameEnd){
      return
    }

    // If user clicks on enter, perform the following operations
    if(key === "Enter"){
      
      // check if the use entered 5 letters and show modal
      if(currentGuess.length < 5){
        updateModalData(true, "Enter 5 alphabets")
        setTimeout(()=>{
          updateModalData(false, "")    
        },3000)
        return
      }

      // check validity of the word and show modal
      const isvalidWord = checkWordValidity(currentGuess)
      if(!isvalidWord) {
        updateModalData(true, "Not a valid word")
        
        setTimeout(()=>{
          updateModalData(false, "")    
        },3000)
        return
      }

      // all guesses exhausted
      if(isvalidWord && wordleData.totalGuessed === 5){
        if(currentGuess.toLowerCase() !== wordleData.word){
          updateModalData(true, "Word is : "+wordleData.word.toUpperCase())
        setTimeout(()=>{
          updateModalData(false, "")    
        },3000)
          setGameEnd(true)
        }
      }

      // find word in previous tried
      if(seenWords.indexOf(currentGuess)!==-1){
        updateModalData(true, "You've tried this guess already")
        setTimeout(()=>{
          updateModalData(false, "")    
        },3000)
        return
      }

      // create a hashmap of the keys and values
      let cellColorHashmap = keyColorHashmap(currentGuess, wordleData.word)
      let updatedSeenWords = [...seenWords]
      updatedSeenWords.push(currentGuess)
      setSeenWords(updatedSeenWords)
      dispatch(updateGuess(cellColorHashmap))
      dispatch(updateGuessed())

      // game end, user guessed correct word
      if(currentGuess.toLowerCase() === wordleData.word){
        updateModalData(true, wordleData.word.toUpperCase())
        setTimeout(()=>{
          updateModalData(false, "")    
        },3000)
        setGameEnd(true)
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
    console.log("Word: ",wordleData.word)
    return () => window.removeEventListener('keyup', handleKeyPress)
    // document.addEventListener('keydown', function(event){
    //   handleKeyPress(event.key)
    // })    
  },[handleKeyPress])
  
  return (
    <React.Fragment>
        {/* Creating 6 rows */}
        <h3>Wordle from wish.com</h3>
        {wordleData.guesses.map((guess,index) =>{
          if(index === wordleData.totalGuessed){
            return <GridRow key={index} currentGuess={currentGuess}/>   
          } 
          return <GridRow key={index} prevGuess={guess}/> 
        })}
      <Keyboard handleKeyPress = {(e) => handleKeyPress(e)} />
    </React.Fragment>
  )
  }

export  default WordleGrid