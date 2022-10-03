// function to get home button
let homeButtonEl = document.getElementById('home-btn')



// function to go back to home page
function goHome() {
    document.location.href ='index.html'
}




// Event Listener to go to home page on 'home' button click
homeButtonEl.addEventListener('click', goHome);
