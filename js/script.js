'use strict';

//define
let turnValue = 1;

//create a blank array for the gameBoard
let gameBoardArray = Array(9).fill('')

//define the winning combinations by array positions in a 9x9 grid
let winArrays = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//create a factory to generate each player
const playerFactory = (name, piece, array) => {
    return { name, piece, array };
  };
  
//create two players
const player1 = playerFactory('Player 1', 'X', Array(9).fill(''));
const player2 = playerFactory('Player 2', 'O', Array(9).fill(''));

//for now, let player 1 (X) have the first turn
let selectedPlayer = player1;

// create a module for the gameBoard
const displayController = (() => {
    const grid = document.getElementById('gameBoardGrid');

    const showPlayer = () => {
        const playerIndicator = document.getElementById('playerIndicator');
        playerIndicator.textContent = `Current player: ${selectedPlayer.name} (${selectedPlayer.piece})`;
        };

    const nextTurn = () => {
        const turnIndicator = document.getElementById('turnIndicator');
        turnIndicator.textContent = `Turn: ${turnValue}`;
        turnValue++
            };

    //create a function to render the contents of the gameBoard array
    const create = () => {
        for (let i in gameBoardArray) {
            let singleSquare = document.createElement('div');
            singleSquare.textContent = gameBoardArray[i];
            singleSquare.id = i;
            singleSquare.className = 'gameBoardSquare';
            grid.appendChild(singleSquare);
        };
    };
       
    const switchPlayer = () => {
    if (selectedPlayer.name === 'Player 1') {
        selectedPlayer = player2;
        showPlayer();
    } else {
        selectedPlayer = player1;
        showPlayer();
        };
    };

    const endGame = () => {
        console.log('GAME END')
        };

    const restart = () => {
        displayController.showPlayer();
        displayController.nextTurn();
        let squares = document.querySelectorAll('.gameBoardSquare');
        squares.forEach((square) => {
            square.textContent = '';
        });
    };

    return {   
        create,
        switchPlayer,
        showPlayer,
        nextTurn,
        endGame,
        restart,
    };
})();

displayController.showPlayer();
displayController.nextTurn();

const gameController = (() => {
    let squareCountArray = Array(9).fill(0);
    
    //create a function to check the player's current array against the win combinations
    const checkWin = () => {
        for (let winArray of winArrays) { 
            let checker = (arr, target) => target.every(v => arr.includes(v));
            let winStatus = checker(selectedPlayer.array, winArray)
            if (winStatus === true) {
                winIndicator.textContent = `${selectedPlayer.name} wins in ${turnValue} rounds!`;
                return true;  
            }; 
        };
    };

    //create a function to check the player's current array against the win combinations
    const checkGameEnd = () => {
        if (checkWin() || squareCountArray.every(e => e === 1)) {
            displayController.endGame();
            gameController.restart;
        } else {
            displayController.nextTurn();
            displayController.switchPlayer();
        }
    };

    //create a function to render the contents of the gameBoard array
    const create = () => {
        const grid = document.getElementById('gameBoardGrid');

        //add event listeners to each square in the grid
        grid.addEventListener('click', (event) => {
            let clickedElement = event.target;
            let isSquare = clickedElement.className === 'gameBoardSquare';
            
            if (isSquare && squareCountArray[clickedElement.id] === 0) {
                clickedElement.textContent = selectedPlayer.piece;
                selectedPlayer.array[clickedElement.id] = parseInt(clickedElement.id);
                squareCountArray[clickedElement.id] = 1;

                checkWin();
                checkGameEnd();
            };
        });
    };

    const restart = () => {
        turnValue = 1;
        player1.array = Array(9).fill('');
        player2.array = Array(9).fill('');
        gameBoardArray = Array(9).fill('');
        squareCountArray = Array(9).fill(0);
        selectedPlayer = player1;
    };

    const addButtonEventListener  = () => {
        const button = document.getElementById('newGame');
        button.addEventListener('click', (event) => {
        gameController.restart(); 
        displayController.restart();
         console.log(gameBoardArray)
        });
    };
    
    return {   
        create,
        checkWin,
        restart,
        addButtonEventListener
    };
})();
    
gameController.addButtonEventListener();
displayController.create();
gameController.create();
