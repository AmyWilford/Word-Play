let wordBank =loadStorage();
let ranWordObj;
let ranWord;
let speechPart
let synOne
let synTwo
let hintDef
let antOne
let turns = 0

let startBtn = document.getElementById('start-btn')
let wbBtn = document.getElementById('wb-btn')
let homeScreenEl = document.getElementById('home-page')
let gamePlayEL = document.getElementById('play-game')
let nextClueBtn = document.getElementById('next-clue')
let hintEl = document.getElementById('hint-area')

// set up home screen
// function to choose random number between 5 & 9
// var randomNumber = Math.floor(Math.random() * 5)+5;
// console.log(randomNumber)

function startGame(){
    wordGen()
    console.log("game starting")
    homeScreenEl.style.display='none'
    gamePlayEL.style.display='block'
}

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

// function to handle guess input and reveal letters as guessed
// display blanks


//API fetch for Dictionary with that word 
// function to pull clue elements from the word & store clue elements
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
        // makes sure all parts of word are taken from same usage
        let hintAnts;
        let speechPart;
        let wordCat = Math.floor(Math.random() * data.length)
        hintDef = "def. "+ data[wordCat].shortdef
        let hintSyns = data[wordCat].meta.syns[Math.floor(Math.random()*this.length)]
        console.log(hintSyns)
        synOne ="syn. "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        synTwo ="syn. "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        let hints = []
        ranWordObj = {
            word: ranWord,
            synonym: 'Synonym: '+ hintSyns,
            antonym: 'Antonym: ' + hintAnts,
            definition: 'Definition: '+ hintDef,
            speechPart: 'Part of Speech: '+ speechPart
        };

        wordBank.push(ranWordObj);
        console.log(wordBank);
    
        localStorage.setItem('word-bank', JSON.stringify(wordBank));

        // runs only if word has antonyms
        if (data[wordCat].meta.ants.length>0){
            hintAnts =data[wordCat].meta.ants[Math.floor(Math.random()*this.length)]
             console.log(hintAnts)
            antOne =  "ant. " + hintAnts[Math.floor(Math.random() * hintAnts.length)]
             console.log(antOne)
             hints.push(antOne)
            }
        speechPart = data[wordCat].fl
        console.log(speechPart)  
        console.log(synOne)
        console.log(synTwo)
        console.log(hintDef)
        // adds hints to an array to be used when revealing hints
        hints.push(synOne, synTwo)
        console.log(hints)
        setTimeout(gamePlay(hints),3000)
        return hints;
    }
    })}

// --------------
// function to create appropriate number of blank spaces based on word picked
var letterInput = document.querySelector('#letter-input');
var textShow = document.querySelector('#showletter');
var submit = document.querySelector('#submitform')
  
  submit.addEventListener('submit', function(event) {
    event.preventDefault();
    var commonLettersArr = [];
    var wordInput = letterInput.value;
    var wordInputArr = wordInput.split("");
    
    lettersInRanWord = ranWord.split("");
  
    if (wordInput === ranWord) {
       textShow.innerHTML = ranWord
  
    } if (wordInput !== ranWord){
      var commonLetters = wordInputArr.filter(x => lettersInRanWord.includes(x));
      // var onlyCommonLetters = [...new Set(commonLetters)];
      console.log(commonLetters);
      
     
      commonLettersArr.push(commonLetters);
      console.log(commonLettersArr)
  
    }
  })
  
// function to reveal final answer on win or loss
// function to clear hint and guess area and replace with definition etc.
// function to loop back and pick new word
// function to update stats
// function to change location to wordbank.html


// function to get next clue after wrong guess or clue request
// function to reveal hint after each guess
function gamePlay(hints){
    document.getElementById('hint-box').textContent =  hintDef
    
    }

    // function for next hint button or after each wrong play
function nextHint(){
    newHint = document.createElement('h4')
    newHint.classlist.add('hint')
    newHint.textContent = hints[0]
    hintEl.appendChild(newHint)
    console.log('next clue button clicked')
    hints.shift()
    console.log(hints)
    turns++
}

function loadStorage() {
    let loadedStorage = JSON.parse(localStorage.getItem('word-bank')) || [];
    return loadedStorage;
}


// with event listeners for start game and word bank
startBtn.addEventListener('click', startGame);
nextClueBtn.addEventListener('click', nextHint)
// wbBtn.addEventListener('click', openWB)    

