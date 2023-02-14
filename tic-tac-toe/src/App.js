 import './App.css';

 import { useState } from 'react';

 import Confetti from 'react-confetti'


function Square({value, onSquareClick}){
  return (<button className="square" onClick={onSquareClick}>{value}</button>)
}
export default function Board(){
  const [squares,setSquare] = useState(Array(9).fill(null));
  let [XIsNext, setXIsNext] = useState(true);

  function handleClick(i){
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    const nextSquare = squares.slice();
    if(XIsNext){
      nextSquare[i] = 'X';
    }else{
      nextSquare[i] = 'O';
    }
    setXIsNext(!XIsNext);
    setSquare(nextSquare);
  }

  const winner = calculateWinner(squares);
  let statusOfTheWinner;
  let celebration = false;
  if(winner){
    statusOfTheWinner = 'Winner: ' + winner;
    celebration = true
  }else{
    statusOfTheWinner = 'Next player: ' + (XIsNext ? 'X' : 'O');
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

  let width = window.innerWidth
  let height = window.innerHeight;


  return (
    // Fragments
    <>  
    {(celebration) ?
     <Confetti  numberOfPieces={150} width={width} height={height}/> : ''
    }
      <div className='status'>{statusOfTheWinner}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

