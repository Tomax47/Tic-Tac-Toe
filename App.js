import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button onClick={onSquareClick} className="square">
    {value}
    </button>
  );
}

export default function Board() {

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;

  winner ? status = "Winner : " + winner : status = "Current Turn : " + [xIsNext ? "X" : "O"];

  /** 
  Immudability : Svaing the original data, and doing the edits on a copy of the original data 
  This will help us save the states of a specific component so we can later on come back to it if we desire
  The immudability is used in like photoshop/word/etc... for example, where u can do something and then "undo" it, which will reverse the state to the previous one!
  SO here we applied the concept of immudability, to save the idderent states of the game, so later on we can come back to them 
  */
  
  /** 
   Also, the immudability will help us controll the performace of the application we have
   as by every change done in our case, the whole board is re-rendered, with all of it's child componenets, the thing that means more resources required!
   so if the performance is something we wanna take care of, we will be able to control which component to be re-rendered after updating and so on
   and that will save us tons of resources to perform the same action!
  */ 

  function handleCLick(i) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice() //to cp 

    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (

    /**  
    If we add the brackets to the function handleCLick(), this will invoke the function 
    even without clicking on the button, the thing that will do an update for the squares array
    and then render it, then the whole process will repeat, resulting in an infinite loop!!
    While if we have handleFunction without the brackets (), this won't invoke the function, untill the action onClick is triggered!

    To solve the issue, we will use the arrow function ' () => ' which is typically like us 
    "creating" a function for each of the buttons to handle it's specific index in the squares array and update it "Something like lambda expression" 
    */


    <>
      <div>
        <h3>
          { status }
        </h3>
      </div>

      <div className="board-row">
        <Square onSquareClick={() => handleCLick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleCLick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleCLick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleCLick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleCLick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleCLick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleCLick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleCLick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleCLick(8)} value={squares[8]} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}