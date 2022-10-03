// Esatblish Gloabl Variables
let wordBank =loadStorage();
let ranWordObj;
let ranWord;
let speechPart;
let synOne;
let synTwo;
let hintDef;
let antOne;
let firstLetter;
let lastLetter;
// let turns = 0
// let totalScore;
let hints = [];
let win;
let hintCount=0;
// let hintHeader = document.createElement('h5');

let hintHeader;
let score = loadScores();

// Access HTML components
let startBtn = document.getElementById('start-btn')
let wbBtn = document.getElementById('wb-btn')
let rulesBtn = document.getElementById('rules-btn')

let homeScreenEl = document.getElementById('home-page')
let gamePlayEL = document.getElementById('play-game')
let nextClueBtn = document.getElementById('next-clue')
let hintEl = document.getElementById('hint-area')
let newWordEl = document.getElementById('newWord');
let letterInput = document.querySelector('#letter-input');
let submit = document.querySelector('#submitform')
let letterbankEl = document.querySelector('#letterbank')
let bankAreaEl = document.querySelector('#bank-area')
let gameplayWordButton = document.getElementById('gameplay-wordbankbutton');
let gameBox = document.querySelector('.container')
let guessedWordEl = document.querySelector('#guessed-word');
// Function to start game play and reset styles

function startGame(){
    gameBox.style.borderWidth = '10px'
    letterInput.style.display = 'none';
    letterbankEl.style.display = 'none';
    nextClueBtn.style.display ='none';
    newWordEl.style.display ='none';
    bankAreaEl.style.display = 'block';
    document.getElementById('hint-box').textContent= '';
    if (!score) {
         score = {
            wins: 0,
           loses: 0,
        };
    } else;
    score;
    document.querySelector('h3').style.display ='block'
    document.getElementById('input-alert').textContent = '';
    gameplayWordButton.style.display = 'none';
    hints =[];

    letterbankEl.textContent = '';
    guessedWordEl.textContent = '';
    document.querySelector('#text').textContent = '';
    hintCount=0;
    homeScreenEl.style.display='none'
    gamePlayEL.style.display='block'
    commonLettersArr = [];
    wordGen();
    setTimeout(newHint,4000)
    setTimeout(showButtons,4000)
}

function showButtons(){
    nextClueBtn.style.display ='block';
    newWordEl.style.display ='block';
    letterInput.style.display = 'block';
    letterbankEl.style.display = 'block';
}

// set up API fetch for random word generator - https://api.api-ninjas.com/v1/randomword'
function wordGen(){
    fetch('https://api.api-ninjas.com/v1/randomword')
    .then(function (response) {
        if(response.ok) {
            return response.json();
        };
        if(!response.ok) {
            $('h3').text="No word found. Please Try again"
        };
    })
    .then(function (data) {
    console.log(data)
    // console.log(data[0])
    ranWord = data.word;
    ranWord = ranWord.toLowerCase();
    console.log(ranWord)
    console.log(ranWord.length)
    // check to see if word is between 5 & 9 letters
    if (ranWord.length < 5){
        wordGen()
    } else if (ranWord.length > 7) {
        wordGen()
    }
    // }  if (ranWord.length>9){
    //     wordGen()
    // }
   // check word bank to see if word already exists, refetch if it does, else continue
    else if (wordBank.includes(ranWord)){
        wordGen()
    }
    else {
        getHints(ranWord)
    }
})}


//API fetch for Dictionary with that word 
// function to pull clue elements from the word & store clue elements
function getHints(ranWord){
    fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ranWord}?key=443eb124-d026-41e8-a7c7-3e38052485a4`)
    .then(function (response) {
        if(response.ok) {
            return response.json();
        };
    })
    .then(function (data) {
    console.log(data)
    console.log(data.length)
    // makes sure it is a word with usable values in the dictionary
    if (!data[0].meta){
        wordGen()
    }
    else {
        // parse data into hints and choose one from each array of synonyms and antonyms
        // makes sure all parts of word are taken from same usage
        let wordCat = Math.floor(Math.random() * data.length)
        hintDef = "def. "+ data[wordCat].shortdef
        // hints.push(hintDef);
        let hintSyns = data[wordCat].meta.syns[Math.floor(Math.random()*this.length)]
        console.log(hintSyns)
        firstLetter = "It begins with " + ranWord.charAt(0).toUpperCase();
        lastLetter = "This is your last guess. It ends with " + ranWord.charAt(ranWord.length-1).toUpperCase()
        synOne ="syn.1: "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        synTwo ="syn.2: "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        
        // runs only if word has antonyms
        if (data[wordCat].meta.ants.length>0){
             let hintAnts =data[wordCat].meta.ants[Math.floor(Math.random()*this.length)]
             console.log(hintAnts)
             antOne =  "antonym: " + hintAnts[Math.floor(Math.random() * hintAnts.length)]
             console.log(antOne)
            //  hints.push(antOne)
            }

        let speechPart = data[wordCat].fl
        // Push all elements to hints array

        console.log(speechPart)  
        console.log(synOne)
        console.log(synTwo)
        console.log(hintDef)
        console.log(firstLetter)
        console.log(lastLetter)

        // adds hints to an array to be used when revealing hints
        // hints.push(synOne, synTwo)
        console.log("word: "+ ranWord)
        // set s timeout so ap can cycle through non suitable words (due to length or not enough info)
        // setTimeout(newHint,2000)

        ranWordObj = {
            word: ranWord,
            speechPart: speechPart,
            synonym: hintSyns,
            antonym: antOne,
            definition: hintDef,
            DictionaryLink: `https://www.merriam-webster.com/dictionary/${ranWord}`       
         };

        wordBank.push(ranWordObj);
        console.log(wordBank);
        localStorage.setItem('word-bank', JSON.stringify(wordBank));
        // let hintSynonyms = synOne + ', '+ synTwo;
        let firstClue = speechPart + " ( " + ranWord.length + " ) \n"  + hintDef;
        // Push all items into hints array
        hints.push(firstClue, synOne, synTwo, firstLetter, lastLetter);
        // Console log all available hints
        console.log(hints)
    };
})}

// let wordInput;
// Function to handle guess input - and reveal correct letters in letter bank
let commonLettersArr = [];
let guessWordArr = [];
  submit.addEventListener('submit', function(event) {
    event.preventDefault();
    let wordInput = letterInput.value.toLowerCase();
    let wordInputArr = wordInput.split("");    
    lettersInRanWord = ranWord.split("");
  
    if (wordInput.length !== ranWord.length){
        document.getElementById('input-alert').textContent = 'Your word is ' +ranWord.length + ' letters long - guess again';
    } 
    else if (wordInput.length === ranWord.length && wordInput !== ranWord){
        document.getElementById('input-alert').textContent = '';
        newHint();
          //set the common letters;
        let commonLetters = wordInputArr.filter(x => lettersInRanWord.includes(x));
         // push to array and merge it and delete the duplicate letters in array;
        commonLettersArr.push(commonLetters);
        let merged = [].concat.apply([],commonLettersArr);
        let onlyCommonLetters = [...new Set(merged)];
        letterbankEl.textContent = onlyCommonLetters;

        guessWordArr.push(wordInput);
        console.log(guessWordArr)
        guessedWordEl.textContent = guessWordArr;
       } 
       else if (wordInput === ranWord) {
        document.querySelector('#text').textContent = ranWord;
        nextClueBtn.style.display ='none';
        letterInput.style.display = 'none';
        letterbankEl.style.display = 'none';
        guessedWordEl.style.display = 'none';
        bankAreaEl.style.display = 'none';
        gameplayWordButton.style.display = 'block';
        win = true;
        calculateScore(score);
        } 
       letterInput.value = '';
      }
    )
  
// function to clear hint and guess area and replace with definition etc.

// Function to generate hints (and adjust displayed items through game play)
function newHint() {
    document.querySelector('h3').style.display ='none'
    let hintHeader = document.createElement('h5');
    hintHeader.textContent = hints[hintCount]
    let hintMax = hints.length
    console.log(hintMax)
    document.getElementById('hint-box').append(hintHeader)
    if(hintCount === hintMax-1 && !win) {
        nextClueBtn.style.display = 'none';
       
    } else if (hintCount === hintMax ) {
        console.log('You Lose')
        letterInput.style.display = 'none';
        letterbankEl.style.display = 'none';
        guessedWordEl.style.display = 'none';
        bankAreaEl.style.display = 'none';
        document.querySelector('#text').textContent = ranWord
        hintHeader.textContent ='';
        gameplayWordButton.style.display = 'block';
        !win;
        calculateScore(score);
    }
    hintCount++
    return;
}

// Function to calculate score
function calculateScore(scoreObj) {
    if(win) {
        let newWin = scoreObj.wins+1;
        scoreObj.wins = newWin;
        console.log(scoreObj.wins);
    } else if(!win) {
        let newLose = scoreObj.loses+1;
        scoreObj.loses = newLose;
        console.log(scoreObj.loses);
    };
    saveScore(scoreObj);
    console.log(scoreObj);
}
// function save current scores to local storage
function saveScore(score){
    localStorage.setItem('player-score', JSON.stringify(score))
}

// Function to load storedscores on each game play so that scores can update each game
function loadScores() {
    let loadedScores = JSON.parse(localStorage.getItem('player-score'));
    return loadedScores;
}

// function to load stored wordbank words on game replay
function loadStorage() {
    let loadedStorage = JSON.parse(localStorage.getItem('word-bank')) || [];
    return loadedStorage;
}
// function to open wordbank page
function openWordbank(){
    document.location.href ='wordbank.html'
}
function openRulesPage(){
    document.location.href = 'rules.html'
}

// Event Listeners - page buttons
startBtn.addEventListener('click', startGame);
wbBtn.addEventListener('click', openWordbank)   
gameplayWordButton.addEventListener('click', openWordbank);
newWordEl.addEventListener('click', startGame);
nextClueBtn.addEventListener('click', newHint);
wbBtn.addEventListener('click', openRulesPage)   




