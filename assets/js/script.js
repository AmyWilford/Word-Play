// set up home screen
// with event listeners for start game and word bank
// function to choose random number between 5 & 9
function randomNumber () {
    var randomNumber = Math.floor(Math.random() * 5)+5;
    console.log(randomNumber);
  }
// set up API fetch for random word generator - https://random-word-api.herokuapp.com/word?length=
function wordGen(){
fetch(`https://random-word-api.herokuapp.com/word?length=6`)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data)
    console.log(data[0])
    let ranWord = data[0]
    console.log(ranWord)
})}
wordGen()
// check word bank to see if word alread exists, refetch if it does, else continue
// set up API fetch for Dictionary with that word - 
// function to create appropriate number of blank spaces based on word picked
// function to pull clue elements from the word & store clue elements
// function to handle guess input and reveal letters as guessed
// function to reveal final answer on win or loss
// function to clear hint and guess area and replace with definition etc.
// function to localstorage.setItem word bank (array)
// function to get next clue after wrong guess or clue request
// function to loop back and pick new word
// function to update stats
// function to change location to wordbank.html


