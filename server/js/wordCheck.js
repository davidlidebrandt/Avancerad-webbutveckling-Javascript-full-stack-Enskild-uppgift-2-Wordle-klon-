export default function wordCheck(inputWord, correctWord){
    const checkedLetters = Array(inputWord.length).fill({});
    correctWord = correctWord.split("");
    inputWord = inputWord.split("");
    
    // Find all letters at correct positions and mark them as 'found'
    // to ensure they won't be counted more than once.
    inputWord.forEach((letter, index) => {
        const currentLetter = letter;
        if(correctWord[index] === inputWord[index]) {
            const letterAndValue = {};
            letterAndValue[currentLetter.toUpperCase()] = "correct";
            checkedLetters[index] = letterAndValue;
            inputWord[index] = null;
            correctWord[index] = null;
        }
    });

    // Find misplaced letters and mark them as 'found'
    // to ensure they won't be counted more than once.
    // Mark all other letters as incorrect.
    inputWord.forEach((letter, index)=> {
        const currentLetter = letter;
        if(letter != null && correctWord.includes(letter)) {
            const letterAndValue = {};
            letterAndValue[currentLetter.toUpperCase()] = "misplaced";
            checkedLetters[index] = letterAndValue;
            inputWord[index] = null;
            correctWord[correctWord.indexOf(letter)] = null;
        }
        else if(letter != null) {
            const letterAndValue = {};
            letterAndValue[currentLetter.toUpperCase()] = "incorrect";
            checkedLetters[index] = letterAndValue;
        }
    });
    
    return checkedLetters;
}