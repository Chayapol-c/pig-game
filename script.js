'use strict';

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")
const diceEl = document.querySelector(".dice")
const newGameBtn = document.querySelector(".btn--new"); 
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing

const init =() =>{
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true; 

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    diceEl.classList.add("hidden")
}

const switchPlayer = () =>{
    document.getElementById(`current--${activePlayer}`).textContent = 0 ;
    activePlayer = activePlayer === 0 ? 1 : 0 ; 
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

const rollDice = () =>{
    if (playing){
        const dicePoint = Math.trunc(Math.random() * 6 ) + 1;
        console.log(`roll dice  ${dicePoint}`);
        diceEl.classList.remove("hidden");
        diceEl.src = `./images/dice-${dicePoint}.png`
        if (dicePoint !== 1 ){
            currentScore += dicePoint;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            currentScore = 0 ;
            switchPlayer();
        }
    }
}

const holding = () =>{
    console.log("holding score")
    if(playing){
        scores[activePlayer] += currentScore;
        currentScore = 0 
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
        }else{
            switchPlayer();
        }
    }
}

init();
newGameBtn.addEventListener("click", init);
rollDiceBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holding)