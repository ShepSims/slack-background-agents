'use client';

import { useState } from 'react';

interface TicTacToeProps {
  onBack: () => void;
}

export function TicTacToe({ onBack }: TicTacToeProps) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isDraw = board.every(cell => cell !== null) && !winner;

  return (
    <div className="w-full max-w-4xl mx-auto px-8">
      <div className="glass p-8 rounded-24 text-center">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="glow-button glass-hover px-6 py-3 rounded-16 text-white font-semibold"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-white">Tic Tac Toe</h1>
          <button
            onClick={resetGame}
            className="glow-button glass-hover px-6 py-3 rounded-16 text-white font-semibold"
          >
            Reset
          </button>
        </div>

        <div className="mb-8">
          {winner ? (
            <div className="text-3xl font-bold mb-4">
              <span className="text-green-400">🎉 Player {winner} Wins!</span>
            </div>
          ) : isDraw ? (
            <div className="text-3xl font-bold mb-4">
              <span className="text-yellow-400">🤝 It&apos;s a Draw!</span>
            </div>
          ) : (
            <div className="text-2xl font-semibold text-gray-300">
              Current Player: <span className="text-blue-400">{isXNext ? 'X' : 'O'}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="game-card aspect-square flex items-center justify-center text-4xl font-bold text-white h-24 transform-3d hover:scale-105 transition-all duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${Math.sin(index * 0.5) * 5}deg) rotateY(${Math.cos(index * 0.5) * 5}deg)`,
              }}
            >
              {cell && (
                <span className={cell === 'X' ? 'text-blue-400' : 'text-red-400'}>
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="text-gray-400 text-sm">
          Touch any empty cell to make your move
        </div>
      </div>
    </div>
  );
}