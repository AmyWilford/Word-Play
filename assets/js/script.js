let wordBank =loadStorage();
let ranWordObj;
let ranWord;

let startBtn = document.getElementById('start-btn')
let wbBtn = document.getElementById('wb=btn')

// set up home screen
// function to choose random number between 5 & 9
// var randomNumber = Math.floor(Math.random() * 5)+5;
// console.log(randomNumber)

// set up API fetch for random word generator - https://api.api-ninjas.com/v1/randomword'
function wordGen(){
    fetch('https://api.api-ninjas.com/v1/randomword')
// fetch(`https://random-word-api.herokuapp.com/word?length=${randomNumber}`)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data)
    // console.log(data[0])
    ranWord = data.word
    console.log(ranWord)
    console.log(ranWord.length)
    // check to see if word is between 5 & 9 letters
    if (ranWord.length<5){
        wordGen()
    }  if (ranWord.length>9){
        wordGen()
    }
   // check word bank to see if word alread exists, refetch if it does, else continue
    else if (wordBank.includes(ranWord)){
        wordGen()
    }
    else {
        getHints(ranWord)
    }
})}

//API fetch for Dictionary with that word - 
function getHints(ranWord){
    fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ranWord}?key=443eb124-d026-41e8-a7c7-3e38052485a4`)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data)
    console.log(data.length)
    // makes sure it is a word with usable values in the dictionary
    if (data.length>10){
        wordGen()
    }
    else {
        // parse data into hints and choose one from each array of synonyms and antonyms
        // makes sureall parts of word are taken from same usage
        let wordCat = Math.floor(Math.random() * data.length)
        let hintDef = "Short Definition: " + data[wordCat].shortdef
        let hintSyns = data[wordCat].meta.syns[Math.floor(Math.random()*this.length)]
        console.log(hintSyns)
        let synOne =  "Synonym: " + hintSyns[Math.floor(Math.random() * hintSyns.length)]

        ranWordObj = {
            word: ranWord,
            synonym: hintSyns,
            // antonym: antOne,
            definition: hintDef,
            // partofSpeech: speechPart
        };

        wordBank.push(ranWordObj);
        console.log(wordBank);
    
        localStorage.setItem('word-bank', JSON.stringify(wordBank));

        // runs only if word has antonyms
        if (data[wordCat].meta.ants.length>0){
             let hintAnts =data[wordCat].meta.ants[Math.floor(Math.random()*this.length)]
             console.log(hintAnts)
            antOne =  "Antonym: " + hintAnts[Math.floor(Math.random() * hintAnts.length)]
             console.log(antOne)
             hints.push(antOne)
            }
        let speechPart = "Part-of-speech: " + data[wordCat].fl
        console.log(speechPart)  
        console.log(synOne)
        console.log(hintDef)
        // adds hints to an array to be used when revealing hints
        hints.push(speechPart, synOne, hintDef)
        console.log(hints)
    }
    })}


wordGen()
// function to create appropriate number of blank spaces based on word picked
function randerBlanks() {
    lettersInRanWord = ranWord.split("");
    numerOfBlanks = lettersInRanWord.length;
    console.log(lettersInRanWord)
    
    blanks = [];
    for (i=0; i<numerOfBlanks; i++) {
      blanks.push("_");
      console.log(blanks);
      document.querySelector('#text').textContent = blanks.join(" ");
    }
  }
  randerBlanks();
// function to pull clue elements from the word & store clue elements


// function to handle guess input and reveal letters as guessed
    var letterInput = document.querySelector('#letter-input');
    var result = document.querySelector('#winOrLoss');
    var submit = document.querySelector('#submitform')
    var commonLettersArr = [];
  
  submit.addEventListener('submit', function(event) {
    event.preventDefault();
    var wordInput = letterInput.value;
    var wordInputArr = wordInput.split("");
    
    lettersInRanWord = ranWord.split("");
  
    if (wordInput === ranWord) {
        document.querySelector('#text').textContent = ranWord
        result.innerHTML = 'YOU WIN'
  
    } if (wordInput !== ranWord){
          //set the common letters;
        var commonLetters = wordInputArr.filter(x => lettersInRanWord.includes(x));
         // push to array and merge it and delete the duplicate letters in array;
        commonLettersArr.push(commonLetters);
        var merged = [].concat.apply([],commonLettersArr);
        var onlyCommonLetters = [...new Set(merged)];
        console.log(onlyCommonLetters)
        document.querySelector('#text').textContent = onlyCommonLetters;
       }
      })
  
// function to reveal final answer on win or loss

// function to clear hint and guess area and replace with definition etc.
// function to get next clue after wrong guess or clue request
// function to loop back and pick new word
// function to update stats
// function to change location to wordbank.html

function loadStorage() {
    let loadedStorage = JSON.parse(localStorage.getItem('word-bank')) || [];
    return loadedStorage;
}


// with event listeners for start game and word bank
// startBtn.addEventListener('click', startGame);
// wbBtn.addEventListener('click', openWB)    

