'use strict';

//create a factory to generate each player
let XPiece = 'X';
let OPiece = 'O';
let turnValue = 1;

let selectedPiece = XPiece;

//create a test array for the gameBoard
const gameBoardArray = Array(9).fill('')
let XArray = Array(9).fill('')
let OArray = Array(9).fill('')

let selectedArray = XArray;

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


const playerFactory = (name, piece) => {
    return { name, piece };
  };
  
const player1 = playerFactory('player1', 'X');
const player2 = playerFactory('player2', 'X');



// create a module for the gameBoard
const displayController = (() => {
    //create a function to render the contents of the gameBoard array
    const create = () => {
        const grid = document.getElementById('gameBoardGrid');
        for (let i in gameBoardArray) {
            let singleSquare = document.createElement('div');
            singleSquare.textContent = gameBoardArray[i];
            singleSquare.id = i;
            singleSquare.className = 'gameBoardSquare';
            grid.appendChild(singleSquare);
        };
    };
        const showPlayer = () => {
        const playerIndicator = document.getElementById('playerIndicator');
        playerIndicator.textContent = `Current player: ${selectedPiece}`;
        };

        const switchPlayer = () => {
        if (selectedPiece === 'X') {
            selectedPiece = 'O';
            selectedArray = OArray;
        } else {
            selectedPiece = 'X'
            selectedArray = XArray;
        };
        };

        const nextTurn = () => {
        const turnIndicator = document.getElementById('turnIndicator');
        turnIndicator.textContent = `Turn: ${turnValue}`;
        switchPlayer();
        showPlayer();
            };

    return {   
        create,
        switchPlayer,
        showPlayer,
        nextTurn
    };
})();

displayController.create();
displayController.nextTurn();


const gameBoard = (() => {
    let squareCountArray = Array(9).fill(0);
    const checkWin = () => {
        for (const winArray of winArrays) { // You can use `let` instead of `const` if you like
            let checker = (arr, target) => target.every(v => arr.includes(v));
            let winStatus = checker(selectedArray, winArray)
            if (winStatus === true) {
                console.log('true')
                winIndicator.textContent = `${selectedPiece} WINS!`;
                
            } else {
                console.log('false')
            }
        };
    };
    const create = () => {
        //create a function to render the contents of the gameBoard array
        const grid = document.getElementById('gameBoardGrid');
        grid.addEventListener('click', (event) => {
            let clickedElement = event.target;
            let isSquare = clickedElement.className === 'gameBoardSquare';
            
            if (isSquare && squareCountArray[clickedElement.id] === 0) {
                clickedElement.textContent = selectedPiece;
                selectedArray[clickedElement.id] = parseInt(clickedElement.id);
                console.log('id: '+clickedElement.id);
                console.log(selectedPiece);
                console.log(selectedArray);
                squareCountArray[clickedElement.id] = 1;

                checkWin();
                displayController.nextTurn();
                turnValue++;
            };
        });
    };
    return {   
        create,
        checkWin
        ///messages
    };
    }

)();
    
    gameBoard.create();





//logic 
//wins: 
    //0,1,2
    //3,4,5
    //6,7,8
    //0,3,6
    //1,4,7
    //2,5,8
    //0,4,8
    //2,4,6
    

//a player can only place one piece in their turn
// a player can only place their piece
//players cannot place a piece in a used square

// the game finishes when:
  //pieces have been placed in all nine squares
  // a player has three of their pieces in a row