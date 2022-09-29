// function to get local storage and present stored word buttons
let wordBankEl = document.getElementById('word-bank');
let homeButtonEl = document.getElementById('home-button')
let modalEl = document.getElementById('wordModal');

let wordArray = ['Buffy', 'Willow', 'Tara', 'Zander', 'Giles', 'Anya', 'Spike', 'Angel', 'Drucilla'];
let wordButton;

// Function to push buttons to page
function showWords(array){
    for(let i=0; i<wordArray.length; i++) {
        wordButton = document.createElement('button');
        wordButton.classList.add('custom-button');
        wordButton.textContent =wordArray[i];
        wordBankEl.append(wordButton);
        // add event listener to each button
        // Pull API details into modal
        wordButton.addEventListener('click', function() {
            console.log(wordArray[i] + ' clicked');
        })
    }
}
    

// function to go back to home page
function goHome() {
    document.location.href ='index.html'
}

showWords(wordArray);
homeButtonEl.addEventListener('click', goHome);

// wordButton.addEventListener('click', showModal);

// event listener on each word to get correct info possibly from API fetch - get same word details as at end of each round

// function delete words 

// load stats bar (possibly tailwind)
