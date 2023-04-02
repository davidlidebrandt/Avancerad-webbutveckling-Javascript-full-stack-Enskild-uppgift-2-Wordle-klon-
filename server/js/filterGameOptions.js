export default function filterGameOptions(words, length, duplicateLetters) {
    let filteredWords = words.filter((word)=> {
        return word.length === length;
    });

    if(!duplicateLetters) {
        filteredWords = filteredWords.filter((word)=> {
            return !findDuplicates(word);
        })
    }
  	return selectRandomWord(filteredWords);
}

function findDuplicates(word) {
  let duplicatesFound = false;
  for(let i=0; i<word.length; i++) {
      for(let j=i+1; j<word.length; j++) {
          if(word[i] === word[j]) {
              duplicatesFound = true;
                break;
          }
      }
  }
 return duplicatesFound;
}

function selectRandomWord(words) {
    const randomNumber = Math.floor((Math.random() * (words.length)));
    return words[randomNumber];
}