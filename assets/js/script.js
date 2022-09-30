// Esatblish Gloabl Variables
let wordBank =loadStorage();
let ranWordObj;
let ranWord;

let speechPart;
let synOne;
let synTwo;
let hintDef;
let antOne;
let turns = 0
let totalScore;
let hints = [];
let win;


// Access HTML components
let startBtn = document.getElementById('start-btn')
let wbBtn = document.getElementById('wb-btn')
let homeScreenEl = document.getElementById('home-page')
let gamePlayEL = document.getElementById('play-game')
let nextClueBtn = document.getElementById('next-clue')
let hintEl = document.getElementById('hint-area')
let newWordEl = document.getElementById('newWord');


// Function to start game play
function startGame(){
    nextClueBtn.style.display ='block';
    hintEl.textContent = '';
    hintCount=0;
    newHint();
    wordGen();
    console.log("game starting")
    homeScreenEl.style.display='none'
    gamePlayEL.style.display='block'
}

// set up API fetch for random word generator - https://api.api-ninjas.com/v1/randomword'
function wordGen(){
    fetch('https://api.api-ninjas.com/v1/randomword')
    .then(function (response) {
        if(response.ok) {
            return response.json();
        };
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
   // check word bank to see if word already exists, refetch if it does, else continue
    else if (wordBank.includes(ranWord)){
        wordGen()
    }
    else {
        getHints(ranWord)
    }
})}

// function to handle guess input and reveal letters as guessed

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
    if (data.length>10){
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

        synOne ="syn. "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        synTwo ="syn. "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        
        // runs only if word has antonyms
        if (data[wordCat].meta.ants.length>0){
             let hintAnts =data[wordCat].meta.ants[Math.floor(Math.random()*this.length)]
             console.log(hintAnts)
             antOne =  "ant. " + hintAnts[Math.floor(Math.random() * hintAnts.length)]
             console.log(antOne)
            //  hints.push(antOne)
            }

        let speechPart = "Part-of-speech: " + data[wordCat].fl
        hints.push(speechPart, hintDef, antOne, synOne);

        console.log(speechPart)  
        console.log(synOne)
        console.log(synTwo)
        console.log(hintDef)
        // adds hints to an array to be used when revealing hints
        // hints.push(synOne, synTwo)
        console.log("word: "+ ranWord)
        console.log(hints)
        // set s timeout so ap can cycle through non suitable words (due to length or not enough info)
        // setTimeout(newHint,2000)

        ranWordObj = {
            word: ranWord,
            synonym: synOne, synTwo,
            antonym: antOne,
            definition: hintDef,
            // partofSpeech: speechPart
        };

        wordBank.push(ranWordObj);
        console.log(wordBank);
        localStorage.setItem('word-bank', JSON.stringify(wordBank));
    }
    })}

wordGen()

// function to pull clue elements from the word & store clue elements
// function to handle guess input and reveal letters as guessed
    var letterInput = document.querySelector('#letter-input');
    var submit = document.querySelector('#submitform')
    var commonLettersArr = [];

  submit.addEventListener('submit', function(event) {
    event.preventDefault();
    let wordInput = letterInput.value;
    let wordInputArr = wordInput.split("");
    hintCount++;
    
    lettersInRanWord = ranWord.split("");
  
    if (wordInput === ranWord) {
        document.querySelector('#text').textContent = ranWord
        win = true;
        calculateScore(retrievedScore);
  
    } else if (wordInput !== ranWord && hintCount <4){
        newHint();
          //set the common letters;
        let commonLetters = wordInputArr.filter(x => lettersInRanWord.includes(x));
         // push to array and merge it and delete the duplicate letters in array;
        commonLettersArr.push(commonLetters);
        let merged = [].concat.apply([],commonLettersArr);
        let onlyCommonLetters = [...new Set(merged)];
        console.log(onlyCommonLetters)
        document.querySelector('#letterbank').textContent = onlyCommonLetters;
       } else if (hintCount >=4) {
        console.log('You Lose');
       }
       wordInput.textContent ='';
      }
      
      )
  
// function to reveal final answer on win or loss

// function to clear hint and guess area and replace with definition etc.
// function to loop back and pick new word
// function to update stats


// function to get next clue after wrong guess or clue request
// function to reveal first clue
let hintCount=0;
let wordInput


function newHint() {
    let hintHeader = document.createElement('h4');
    hintHeader.textContent = hints[hintCount];
    hintEl.append(hintHeader);
    hintCount++
    if(hintCount>= 4) {
        // wordInput.textContent ='';
        console.log('You Lose')
        nextClueBtn.style.display ='none';
        document.querySelector('#text').textContent = ranWord
        hintEl.textContent = '';
    }
    console.log(hintCount);
}

// newHint();
// hint
function gamePlay(){
    console.log('gameplay')
}
    // document.getElementById('hint-box').textContent = speechPart + "(" + ranWord.length + ")" + hintDef
    

    // function for next hint button or after each wrong play
// function nextHint(){
//     if (turns<5){
//         console.log('next clue button clicked')
//         newHint = document.createElement('h4')
//         newHint.classlist.add('hint')
//         newHint.textContent = hints[0]
//         hintEl.appendChild(newHint)
//         hints.shift()
//         console.log(hints)
//         turns++
//     }
//     // else roundOver()
// }

function loadStorage() {
    let loadedStorage = JSON.parse(localStorage.getItem('word-bank')) || [];
    return loadedStorage;
}


// wbBtn.addEventListener('click', openWB)    
function openWordbank(){
    document.location.href ='wordbank.html'
}

// with event listeners for start game and word bank

// startBtn.addEventListener('click', startGame);
// wbBtn.addEventListener('click', openWB)    

startBtn.addEventListener('click', startGame);
wbBtn.addEventListener('click', openWordbank)   
newWordEl.addEventListener('click', startGame);
nextClueBtn.addEventListener('click', newHint);





// Function to calculate score and save in storage
let score = {
    wins: 0,
    loses: 0,
};


localStorage.setItem('player-score', JSON.stringify(score))

let retrievedScore = JSON.parse(localStorage.getItem('player-score'));
console.log('retrievedScore', retrievedScore);

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

function saveScore(score){
    localStorage.setItem('player-score', JSON.stringify(score))
}

calculateScore(retrievedScore);

