import React, {useState, useEffect} from 'react'
import { checkWordValidity } from '../wordleAPI'
import Cell from './cell'
function GridRow({currentGuess, prevGuess}) {
	if(prevGuess){
		return (
			<div className='row-container'>
				{prevGuess.map((mapping, index) =>{
					return(<Cell key={index} letter={mapping.key} class={mapping.color} />)
				})}
			</div>
		)
	}
	if(currentGuess){
		return (
			<div className='row-container'>
				{currentGuess.split("").map((letter, index) =>{
					return(<Cell key={index} letter={letter} />)
				})}

				{[...Array(5 - currentGuess.length)].map((emptyCell,index) =>{
					return(<Cell key={index} letter={""} />)
				})}
				
			</div>
		)
	}
  return (
    <div className='row-container'>
        {[1,2,3,4,5].map(cellIndex => {
            return( 
			<Cell key={cellIndex} />
				)
        })}
    </div>
  )
}

export default GridRow