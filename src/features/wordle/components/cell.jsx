import React from 'react'
import '../wordle.css'
function Cell(props) {
  return (
    <div className={`wordle-cell ${props.class}`}>{props.letter}</div>
  )
}

export default Cell