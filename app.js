const cards= document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
        return;
    }
    
    secondCard=this;
    checkForMatch();
    guessTrack();


}

function checkForMatch(){
let isMatch= firstCard.dataset.framework === secondCard.dataset.framework;
isMatch ? disableCards() : unflipCards();
score = score++;
    }


function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function guessTrack(){
    trackText = document.createElement('div');
    trackText.innerText= 'Guesses Made:'+ score;
}

cards.forEach(card => card.addEventListener('click', flipCard));
