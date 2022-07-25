const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole')
const scoreBoard = document.querySelector('.score');
let lastHole;//To prevent the mole to pop up from the same hole multiple times.
let isTimeUp=false;
let score = 0;

// Function to return the time interval between different mole popups.
function randomTime(min,max){
    return Math.round(Math.random()*(max-min) + min);
}

// Function to tell from which hole the mole will pop up
function randomHole(holes){
    const idx = Math.floor(Math.random()*holes.length);
    const hole = holes[idx];

    if(hole == lastHole){
        return randomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

// function to make a random mole popup
function peep(){
    const time = randomTime(200,1000);// Time interval between each mole popups
    const hole = randomHole(holes);
    hole.classList.add('up');
    
    setTimeout(() => {
        hole.classList.remove('up');
        if(!isTimeUp){
            peep();
        }
    }, time);

}

function startGame(){
    
    scoreBoard.textContent=0;
    score=0;
    isTimeUp = false;
    peep();
    
    // To stop the game after 10 seconds.
    setTimeout(() => {
        isTimeUp=true;
    }, 10000);
}


// function to count the hits on moles.
function bonk(e){
    if(!e.isTrusted) return; // The player faked the click.
    score++;
    this.classList.remove('up');
    scoreBoard.textContent=score;

}

moles.forEach(mole => {
    mole.addEventListener('click',bonk);
});