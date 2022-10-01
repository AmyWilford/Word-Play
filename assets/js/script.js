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
let hintCount=0;
let warning;



// Access HTML components
let startBtn = document.getElementById('start-btn')
let wbBtn = document.getElementById('wb-btn')
let homeScreenEl = document.getElementById('home-page')
let gamePlayEL = document.getElementById('play-game')
let nextClueBtn = document.getElementById('next-clue')
let hintEl = document.getElementById('hint-area')
let newWordEl = document.getElementById('newWord');
let letterInput = document.querySelector('#letter-input');
let submit = document.querySelector('#submitform')
let letterbankEl = document.querySelector('#letterbank')



// Function to start game play and reset styles

function startGame(){
    if (warning) {
        warning.remove();      
    };
    hints =[];
    letterInput.style.display = 'block';
    letterbankEl.style.display = 'block';
    letterbankEl.textContent = '';
    nextClueBtn.style.display ='block';
    document.querySelector('#text').textContent = '';
    hintCount=0;
    homeScreenEl.style.display='none'
    gamePlayEL.style.display='block'
    wordGen();
    setTimeout(newHint,3000)
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

        synOne ="first synonym: "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        synTwo ="second synonym: "+  hintSyns[Math.floor(Math.random() * hintSyns.length)]
        
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
        // adds hints to an array to be used when revealing hints
        // hints.push(synOne, synTwo)
        console.log("word: "+ ranWord)
        // set s timeout so ap can cycle through non suitable words (due to length or not enough info)
        // setTimeout(newHint,2000)

        ranWordObj = {
            word: ranWord,
            synonym: synOne + ' , ' + synTwo,
            antonym: antOne,
            definition: hintDef,
        };

        wordBank.push(ranWordObj);
        console.log(wordBank);
        localStorage.setItem('word-bank', JSON.stringify(wordBank));
        // let hintSynonyms = synOne + ', '+ synTwo;
        let firstClue = speechPart + "  ( " + ranWord.length + " ) " + hintDef;
        // Push all items into hints array
        hints.push(firstClue, synOne, synTwo, antOne);
        // Console log all available hints
        console.log(hints)
    };
})}

// Function to handle guess input - and reveal correct letters in letter bank
let commonLettersArr = [];
  submit.addEventListener('submit', function(event) {
    event.preventDefault();
    let wordInput = letterInput.value;
    let wordInputArr = wordInput.split("");    
    lettersInRanWord = ranWord.split("");
  
    if (wordInput.length !== ranWord.length){
        document.getElementById('input-alert').textContent = 'Your guess is not the right length - guess again';
        console.log('this word is not long enough');
    } else if (wordInput.length === ranWord.length && wordInput !== ranWord){
        document.getElementById('input-alert').textContent = '';
        newHint();
          //set the common letters;
        let commonLetters = wordInputArr.filter(x => lettersInRanWord.includes(x));
         // push to array and merge it and delete the duplicate letters in array;
        commonLettersArr.push(commonLetters);
        let merged = [].concat.apply([],commonLettersArr);
        let onlyCommonLetters = [...new Set(merged)];
        console.log(onlyCommonLetters)
        letterbankEl.textContent = onlyCommonLetters;
       } 
       else if (wordInput === ranWord) {
        document.querySelector('#text').textContent = ranWord;
        nextClueBtn.style.display ='none';
        letterInput.style.display = 'none';
        letterbankEl.style.display = 'none';
        win = true;
        calculateScore(retrievedScore);

        }
       letterInput.value = '';
      }
    )
  
// function to clear hint and guess area and replace with definition etc.
// function to loop back and pick new word
// function to update stats


// function to get next clue after wrong guess or clue request
// function to reveal first clue on page load - and progressively after on text input or clue request click

function newHint() {
    document.querySelector('h3').style.display ='none'

    console.log(hintCount);
    let hintHeader = document.createElement('h4');
    hintHeader.textContent = hints[hintCount];
    hintEl.append(hintHeader);
    if(hintCount === 3) {
        warning = document.createElement('button');
        warning.setAttribute('disabled', '')
        warning.classList.add('warning-button');
        warning.textContent = 'final guess'
        nextClueBtn.style.display = 'none';
        document.getElementById('game-button-area').prepend(warning);     
       
    } else if (hintCount === 4) {
        console.log('You Lose')
        letterInput.style.display = 'none';
        letterbankEl.style.display = 'none';
        warning.style.display = 'none';
        document.querySelector('#text').textContent = ranWord
        hintHeader.textContent ='';
    }
    // warning.replaceWith(nextClueBtn);
    hintCount++
    console.log(hintCount);
    return;
    }
   


// function gamePlay(){
//     console.log('gameplay')
// }

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

function openWordbank(){
    document.location.href ='wordbank.html'
}

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

