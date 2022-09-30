// function to get local storage and present stored word buttons
let wordBankEl = document.getElementById('word-bank');
let homeButtonEl = document.getElementById('home-button')
let modalEl = document.getElementById('wordModal');
let modalTitle = document.getElementById('modal-title');
let wordDeleteBtn = document.getElementById('delete-word')
let modalDefEl = document.getElementById('word-definition');
let modalSynEl = document.getElementById('word-synonym');
let modalAntEl = document.getElementById('word-antonym');
let modalPhraseEl = document.getElementById('word-phrase');
let modalDictLink = document.getElementById('dict-link');

// let wordBank =loadStorage();

let loadedStorage = JSON.parse(localStorage.getItem('word-bank')) || [];

// let wordArray = ['Buffy', 'Willow', 'Tara', 'Zander', 'Giles', 'Anya', 'Spike', 'Angel', 'Drucilla'];
let wordButton;

// Function to push buttons to page
function showWords(array){
    for(let i=0; i<array.length; i++) {
        wordButton = document.createElement('button');
        wordButton.classList.add('wordbutton');
        wordButton.textContent =array[i].word;
        wordBankEl.append(wordButton);
        // add event listener to each button
        // Pull API details into modal
        wordButton.addEventListener('click', function() {
            console.log(array[i] + ' clicked');
            modalTitle.textContent = array[i].word;
            modalDefEl.textContent = array[i].definition;
            modalSynEl.textContent = array[i].synonym;
            modalAntEl.textContent = array[i].antonym;
            modalPhraseEl.textContent = array[i].phrase;
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

showWords(loadedStorage);
homeButtonEl.addEventListener('click', goHome);




// function delete words 
function deleteWord(){
    // wordArray.filter(wordArray => wordArray !== modalTitle.textContent)
    var index = loadedStorage.indexOf(modalTitle.textContent);
    if (index !== -1) {
        wordArray.splice(index, 1);
        }
    console.log("delete clicked")
    console.log(modalTitle.textContent)
    console.log(loadedStorage)
    // resave and load array to from local storage to update the list
}

wordDeleteBtn.addEventListener('click', deleteWord)
// load stats bar (possibly tailwind)
