import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import {wordleState} from '../wordleSlice'
import '../wordle.css'
function Keyboard(props) {

    const wordleData = useSelector(wordleState);
    const [letterColorMapping, setLetterColorMapping] = useState({})

    useEffect(() =>{
        let currentMapping = {...letterColorMapping}
        wordleData.guesses.map(guess =>{
            if(guess){
                guess.map(mapping =>[
                    currentMapping[mapping.key] = mapping.color
                ])
            }
        })
        setLetterColorMapping(currentMapping)
    }, [wordleData.guesses])
    return (
        <div className='keyboard-container'>
            <div className='keyboard-container__row'>
                {"qwertyuiop".split("").map(letter => {
                    return <div className={`${letterColorMapping[letter] ? `${letterColorMapping[letter]}`:""} keyboard-key`} onClick={() => props.handleKeyPress({key:letter})} key={letter}>{letter}</div>
                })}
            </div>

            <div className='keyboard-container__row'>
                {"asdfghjkl".split("").map(letter => {
                    return <div onClick={() => props.handleKeyPress({key:letter})} key={letter} className={`${letterColorMapping[letter] ? `${letterColorMapping[letter]}`:""} keyboard-key`}>{letter}</div>
                })}
            </div>
            <div className='keyboard-container__row'>
                <div key="enter" className={`keyboard-key`} onClick={() =>props.handleKeyPress({key:"Enter"})}>Enter</div>
                    {"zxcvbnm".split("").map(letter => {
                        return <div onClick={() =>props.handleKeyPress({key:letter})} key={letter} className={`${letterColorMapping[letter] ? `${letterColorMapping[letter]}`:""} keyboard-key`}>{letter}</div>
                    })}
                <div key="back" className={`keyboard-key`} onClick={() => props.handleKeyPress({key:"Backspace"})}>Back</div>
            </div>

        </div>
    )
}

export default Keyboard