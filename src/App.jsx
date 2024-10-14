import { useState } from "react"

function Square({value, onSquareClick}) {
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   setValue('X');
  // }

  return (
    <button onClick={onSquareClick} className="bg-slate-600 border border-gray-400 h-24 w-24 m-1 text-white leading-9 text-3xl font-bold rounded-md hover:bg-slate-900">{value}</button>
  )
}

function Board({xIsNext, squares, onPlay}) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner is : ${winner}`
  } else {
    status = `Next Player is ` + (xIsNext ? 'X' : 'O')
  }

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    // console.log("Clicked!!!")
    const nextSquares = squares.slice()
    // nextSquares[index] = 'X';
    if (xIsNext) {
      nextSquares[index] = 'X'
    } else {
      nextSquares[index] = 'O'
    }

    onPlay(nextSquares)
  }

  return (
    <>
      <div>
        <div>{ status }</div>
        {/* First Row */}
        <div className="flex">
          <Square value={ squares[0] } onSquareClick={() => handleClick(0)}/>
          <Square value={ squares[1] } onSquareClick={() => handleClick(1)}/>
          <Square value={ squares[2] } onSquareClick={() => handleClick(2)}/>
        </div>

        {/* Second Row */}
        <div className="flex">
          <Square value={ squares[3] } onSquareClick={() => handleClick(3)}/>
          <Square value={ squares[4] } onSquareClick={() => handleClick(4)}/>
          <Square value={ squares[5] } onSquareClick={() => handleClick(5)}/>
        </div>
        
        {/* Third Row */}
        <div className="flex">
          <Square value={ squares[6] } onSquareClick={() => handleClick(6)}/>
          <Square value={ squares[7] } onSquareClick={() => handleClick(7)}/>
          <Square value={ squares[8] } onSquareClick={() => handleClick(8)}/> 
        </div>
      </div>
    </>
  )
}


export default function Game() {
  // const [squares, setSquares] = useState(Array(9).fill(null))
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [xIsNext, setXIsNext] = useState(true)

  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext)
    const nextHistory = [...history.slice(0, currentMove +  1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setCurrentMove(move)
    setXIsNext(move % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the game`;
    }

    return (
      <li key={move} className="bg-gray-700 text-white mb-1">
        <button onClick={() => jumpTo(move)}>{ description }</button>
      </li>
    )
  })

  return (
    <div className="flex bg-slate-950 text-white h-screen items-center justify-center gap-6">
      <div>
        <Board xIsNext={ xIsNext } squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="border border-indigo-600 p-6">
        <ol className="border border-gray-300 p-1 text-lg mb-1">{ moves }</ol>
      </div>
    </div>
  )
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