import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    word: "",
    guesses:[...Array(6)],
    totalGuessed: 0,
    showModal: false,
    modalContent:""
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
        },
        updateModal:(state, action) =>{
            state.showModal = action.payload.showModal
            state.modalContent = action.payload.modalContent
        }
    }
})

export const { getWord, updateGuess,updateGuessed, updateModal } = wordleSlice.actions;
export const wordleState = (state) => state.wordle;

export default wordleSlice.reducer;