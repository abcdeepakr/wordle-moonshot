import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    word: "",
    guesses:[...Array(6)],
    totalGuessed: 0
}

export const wordleSlice = createSlice({
    name: "wordle", 
    initialState,
    reducers: {
        getWord: (state, action) =>{
            state.word = action.payload;
        },
        updateGuess: (state, action) =>{
             
            state.guesses[state.totalGuessed] = action.payload
        },
        updateGuessed:(state, payload) => {
            state.totalGuessed +=1
        }
    }
})

export const { getWord, updateGuess,updateGuessed } = wordleSlice.actions;
export const wordleState = (state) => state.wordle;

export default wordleSlice.reducer;