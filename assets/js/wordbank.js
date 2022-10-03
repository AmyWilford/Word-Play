// function to get local storage and present stored word buttons
let wordBankEl = document.getElementById('word-bank');
let homeButtonEl = document.getElementById('home-button')
let modalEl = document.getElementById('wordModal');
let modalTitle = document.getElementById('modal-title');
let wordDeleteBtn = document.getElementById('delete-word')
let modalDefEl = document.getElementById('word-definition');
let modalSynEl = document.getElementById('word-synonym');
let modalAntEl = document.getElementById('word-antonym');
let modalPartSpeech = document.getElementById('part-speech');
let modalDictLink = document.getElementById('dict-link');
let winRateEl = document.getElementById('win-rate')

// Retrieve player scores from localstorage
let playerScore = JSON.parse(localStorage.getItem('player-score')) ||'';
console.log(playerScore)
playerWins = playerScore.wins;
playerLoses = playerScore.loses;
console.log(playerWins)
console.log(playerLoses)

// Function to calculate stats percentages
function statPercents(wins, loses) {
    let totalPlays = wins+loses
    let winPercent;
    let losePercent;
    if(loses == 0) {
        winPercent = 100
        losePercent = 0
    } else if (wins == 0) {
        winPercent =0
        losePercent=100
    } else if (loses !==0 && wins !==0) {
        winPercent = Math.floor((wins/totalPlays)*100);
        console.log(winPercent);
        losePercent = 100 - winPercent;
    }

    console.log(winPercent, losePercent)

    let statusWinEl = document.getElementById('statusbar-win');
    // let statusLoseEl = document.getElementById('statusbar-lose')
    // statusLoseEl.setAttribute('value', losePercent);
    statusWinEl.setAttribute('value', winPercent);
    winRateEl.textContent= winPercent + '% Win Rate ' 
    
}
statPercents(playerWins, playerLoses)

// Retrieve wordbank words from localstorage
let loadedStorage = JSON.parse(localStorage.getItem('word-bank')) || [];

// Function to push buttons to page
function showWords(array){
    let wordButton;
    for(let i=0; i<array.length; i++) {
        wordButton = document.createElement('button');
        wordButton.classList.add('wordbutton');
        wordButton.setAttribute('id', array[i].word)
        wordButton.textContent =array[i].word;
        wordBankEl.append(wordButton);



        // add event listener to each button
        // Pull API details into modal
        wordButton.addEventListener('click', function() {
            console.log(array[i] + ' clicked');
            modalTitle.textContent = array[i].word 
            modalPartSpeech.textContent = array[i].speechPart;
            modalDefEl.textContent = array[i].definition;
            modalSynEl.textContent = 'Synonyms: ' + (array[i].synonym).join(', ');
            modalAntEl.textContent = array[i].antonym;
            modalDictLink.href=array[i].DictionaryLink;
            $(document).ready(function(){
                $("#wordModal").modal("show");
            });
        })
    }
}

// function to go back to home page
function goHome() {
    document.location.href ='index.html'
}
// Function to load wordbank buttons 
showWords(loadedStorage);

// Event Listener to go to home page on 'home' button click
homeButtonEl.addEventListener('click', goHome);

// finds the index of the word in the array and deletes it
function deleteWord(){

    let bankWord = modalTitle.textContent
    let index = loadedStorage.map(object => object.word).indexOf(bankWord);
    console.log(index)
    if (index !== -1) {
        loadedStorage.splice(index, 1);
        }
        console.log("delete clicked")
    console.log(modalTitle.textContent)
    console.log(loadedStorage.length)
    // resave and load array to from local storage to update the list
    localStorage.setItem('word-bank', JSON.stringify(loadedStorage))
    //  $(`${modalTitle.textContent}`).hide(1000)
     $('#delete-word').click(function() {
		$(`#${modalTitle.textContent}`).fadeToggle("slow", "linear");})
    // document.getElementById("word-bank").window.location.reload(true);
}

wordDeleteBtn.addEventListener('click', deleteWord)
