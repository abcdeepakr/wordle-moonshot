import React from 'react';
import Wordle from './features/wordle/wordle';
import './App.css';
import Modal from './features/wordle/components/modal';
import { useSelector, useDispatch } from 'react-redux';
import { updateModal, wordleState } from './features/wordle/wordleSlice';
function App() {
  const wordleData = useSelector(wordleState);
  const dispatch = useDispatch()
  return (
    <div className="App">
      <header className="App-header">
        {wordleData.showModal ? <Modal /> : null}
        <Wordle />
      </header>
    </div>
  );
}

export default App;
