// function to get local storage and present stored word buttons
let wordBankEl = document.getElementById('word-bank');

let wordArray = ['Buffy', 'Willow', 'Tara', 'Zander', 'Giles', 'Anya', 'Spike', 'Angel']

// Function to push buttons to page
function showWords(array){
    for(let i=0; i<wordArray.length; i++) {
        let wordButton = document.createElement('button');
        wordButton.classList.add('custom-button');
        wordButton.textContent =wordArray[i];
        wordBankEl.append(wordButton);
    };
}

showWords(wordArray);

// load stats bar (possibly tailwind)
// event listener on each word to get correct info possibly from API fetch - get same word details as at end of each round
// button to go back to home page
// function delete words 

