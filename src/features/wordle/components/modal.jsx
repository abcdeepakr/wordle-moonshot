import React from 'react'
import '../wordle.css'
import { useSelector, useDispatch } from 'react-redux';
import {wordleState} from '../wordleSlice'
function Modal() {
    const wordleData = useSelector(wordleState);
  return (
    <div className='modal'>{wordleData.modalContent}</div>
  )
}

export default Modal