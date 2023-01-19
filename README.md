## Wordle with CRA + Redux Toolkit

### Components used

- `Wordle.jsx` Component that handles the layout
- `WordleGrid.jsx` to render the wordle grid based on the guesses, initially we populate an array with 6 empty elements, and then render the grid
- `gridRow.jsx` Grid will have 6 rows with 5 columns each. making it a 6x5 Matrix. The gridrow is reponsible for rendering previous guesses, current guess and empty cells
- `modal.jsx` This renders a modal which is fired in following circumstances
    - User click enter without entering 5 letters
    - User clicks on enter and invalid word
    - User clicks on enter but the guess has already been made
    - User clicks on enter and exhausts all chances
    - User clicks on enter and wins

### State management

Using Redux toolkit for state management

- `wordleSlice.js` is responsible for the reducers and our global state
- `wordleAPI.js` contains some helper functions like, check word validity, fetch a random word etc...

### State Variables

```js

const initialState = {
    word: "",
    guesses:[...Array(6)],
    totalGuessed: 0,
    showModal: false,
    modalContent:""
}

```

- word : <String> => The random word which is selected when the browser refreshes
- guesses: <Array> => Guesses is s 2D array, it consists of 6 guesses at max, each guess(array) has 5 hashmaps in it, and the mapping looks like this
```js
[
    {
        "key": "m",
        "color": "grey"
    },
    {
        "key": "a",
        "color": "yellow"
    },
    {
        "key": "g",
        "color": "grey"
    },
    {
        "key": "i",
        "color": "grey"
    },
    {
        "key": "c",
        "color": "yellow"
    }
]
```

- totalGuesses => This variable is used to end game if all guesses are incorrect, and also to enable the current row for user input
- showModal: <boolean> => shows or hides modal
- modalContent : <string> => Renders the content inside the modal