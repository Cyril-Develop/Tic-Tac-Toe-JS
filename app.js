const cases = Array.from(document.querySelectorAll('.game_case'));
const winMessage = document.querySelector('.restart_content');
const gameMessage = document.querySelector('.message');
const restart = document.querySelector('.restart');

let count = 0;
let playerOne = true;
let playerTwo = false;
let playerOneChoices = [];
let playerTwoChoices = [];

let patternForWin = [
    ['c1', 'c2', 'c3'],
    ['c1', 'c3', 'c9'],
    ['c1', 'c4', 'c7'],
    ['c1', 'c5', 'c9'],
    ['c2', 'c5', 'c8'],
    ['c3', 'c6', 'c9'],
    ['c4', 'c5', 'c6'],
    ['c7', 'c8', 'c9'],
    ['c7', 'c5', 'c3']
]

cases.forEach((item) => {
    item.addEventListener('click', () => {   
        if (item.getAttribute('data-click') === 'validate') {
            return;
        };
        changePlayer(item);
    });
});

function changePlayer(item) {
    const caseNumber = item.getAttribute('data');
    item.setAttribute('data-click', 'validate');
    count++;

    if (playerOne) {
        item.classList.add('cross')
        
        playerOneChoices.push(caseNumber);

        gameMessage.innerHTML = 'Au tour du joueur 2 (O)';
        
        playerOne = false;
        playerTwo = true;
    } else {
        item.classList.add('circle')

        playerTwoChoices.push(caseNumber);

        gameMessage.innerHTML = 'Au tour du joueur 1 (X)';

        playerOne = true;
        playerTwo = false;
    }

    compareChoices();
};

function compareChoices(){
    
    patternForWin.forEach((item) => {
        if (playerOneChoices.includes(item[0]) && playerOneChoices.includes(item[1]) && playerOneChoices.includes(item[2])) {
            restart.classList.add('display_restart')
            winMessage.innerHTML =  'Le Joueur 1 (X) Gagne !';
        } else if (playerTwoChoices.includes(item[0]) && playerTwoChoices.includes(item[1]) && playerTwoChoices.includes(item[2])) {
            restart.classList.add('display_restart')
            winMessage.innerHTML = 'Le Joueur 2 (O) Gagne !';
        } else if (count === 9) {
            restart.classList.add('display_restart')
            winMessage.innerHTML = 'Match Nul !';
        } 

    });   
}

function showWhoPlay() {
    playerOne ? gameMessage.innerHTML = 'Au tour du joueur 1 (X)' : gameMessage.innerHTML = 'Au tour du joueur 2 (O)'; 
};

showWhoPlay();

document.querySelector('.btn-reload').addEventListener('click', () => {
    location.reload();
});