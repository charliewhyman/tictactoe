"use strict";

//create a test array for the gameBoard
const gameBoardArray = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O','X']

// create a module for the gameBoard
const gameBoard = (() => {
    //create a function to render the contents of the gameBoard array
    const create = () => {
        const container = document.getElementById('gameBoardContainer');
        const grid = document.getElementById('gameBoardGrid');
        for (let i in gameBoardArray) {
            let singleSquare = document.createElement('div');
            singleSquare.textContent = gameBoardArray[i];
            singleSquare.id = i;
            singleSquare.className = 'gameBoardSquare';
            grid.appendChild(singleSquare);
        };
    };

    return {   
        create
    };
})();

gameBoard.create();

//create a factory to generate each player
let player1Name = 'Player1';
let player2Name = 'Player2';


const playerFactory = (name) => {
    const sayHello = () => console.log('hello!');
    return { name, sayHello };
  };
  
  const player1 = playerFactory(player1Name);
  const player2 = playerFactory(player2Name);

  console.log(player1.name);
  console.log(player2.name);
  
  player1.sayHello(); // calls the function and logs 'hello!'
  player2.sayHello(); // calls the function and logs 'hello!'

  