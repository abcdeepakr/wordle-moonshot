import words from '../../app/words.json'


export const getRandomWord = () =>{
    let totalWords = words.length
    let index = Math.floor(Math.random() * (totalWords - 0) + 0)
    let word = words[index]
    return word
}


export const checkWordValidity = (word) =>{
    if(words.indexOf(word)!==-1){
        return true
    }
    return false
    
}

export const keyColorHashmap = (guess, answer) =>{
    let currentGuess = [...guess]
    let ansArray = [...answer]
    let colorMapping = currentGuess.map((letter, index) =>{
        if(ansArray[index] === currentGuess[index]){
            return {key: letter, color:"green"}    
        }
        if(ansArray.includes(letter) && ansArray[index] !== currentGuess[index]){
            return {key: letter, color:"yellow"}    
        }
        return {key: letter, color:"grey"}
    })
    return colorMapping
}