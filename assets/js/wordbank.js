// function to get local storage and present stored word buttons
let wordBankEl = document.getElementById('word-bank');
let homeButtonEl = document.getElementById('home-button')

let wordArray = ['Buffy', 'Willow', 'Tara', 'Zander', 'Giles', 'Anya', 'Spike', 'Angel', ['Drucilla']]

// Function to push buttons to page
function showWords(array){
    for(let i=0; i<wordArray.length; i++) {
        let wordButton = document.createElement('button');
        wordButton.classList.add('custom-button');
        wordButton.textContent =wordArray[i];
        wordBankEl.append(wordButton);
    };
}

// function to go back to home page
function goHome() {
    document.location.href ='index.html'
}

showWords(wordArray);
homeButtonEl.addEventListener('click', goHome);

// event listener on each word to get correct info possibly from API fetch - get same word details as at end of each round
// function delete words 

// load stats bar (possibly tailwind)
