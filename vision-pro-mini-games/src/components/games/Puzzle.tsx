'use client';

import { useState, useEffect, useCallback } from 'react';

interface PuzzleProps {
  onBack: () => void;
}

export function Puzzle({ onBack }: PuzzleProps) {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const puzzleSize = 4;
  const totalTiles = puzzleSize * puzzleSize;

  const initializePuzzle = useCallback(() => {
    const initialTiles = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
    initialTiles.push(0); // 0 represents empty space
    setTiles(initialTiles);
    setMoves(0);
    setIsComplete(false);
  }, [totalTiles]);

  const shufflePuzzle = () => {
    setIsShuffling(true);
    const shuffled = [...tiles];
    
    // Perform random valid moves to shuffle
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const neighbors = getNeighbors(emptyIndex);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      if (randomNeighbor !== undefined) {
        [shuffled[emptyIndex], shuffled[randomNeighbor]] = [shuffled[randomNeighbor], shuffled[emptyIndex]];
      }
    }
    
    setTiles(shuffled);
    setMoves(0);
    setIsComplete(false);
    setIsShuffling(false);
  };

  const getNeighbors = (index: number) => {
    const neighbors = [];
    const row = Math.floor(index / puzzleSize);
    const col = index % puzzleSize;

    if (row > 0) neighbors.push(index - puzzleSize); // Up
    if (row < puzzleSize - 1) neighbors.push(index + puzzleSize); // Down
    if (col > 0) neighbors.push(index - 1); // Left
    if (col < puzzleSize - 1) neighbors.push(index + 1); // Right

    return neighbors;
  };

  const handleTileClick = (index: number) => {
    if (isComplete || isShuffling) return;

    const emptyIndex = tiles.indexOf(0);
    const neighbors = getNeighbors(emptyIndex);

    if (neighbors.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(prev => prev + 1);
    }
  };

  const checkComplete = useCallback(() => {
    const solved = tiles.every((tile, index) => {
      if (index === totalTiles - 1) return tile === 0;
      return tile === index + 1;
    });
    setIsComplete(solved);
  }, [tiles, totalTiles]);

  useEffect(() => {
    initializePuzzle();
  }, [initializePuzzle]);

  useEffect(() => {
    if (tiles.length > 0) {
      checkComplete();
    }
  }, [tiles, checkComplete]);

  const getTilePosition = (index: number) => {
    const row = Math.floor(index / puzzleSize);
    const col = index % puzzleSize;
    return { row, col };
  };

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
          <h1 className="text-4xl font-bold text-white">Slide Puzzle</h1>
          <button
            onClick={shufflePuzzle}
            disabled={isShuffling}
            className="glow-button glass-hover px-6 py-3 rounded-16 text-white font-semibold disabled:opacity-50"
          >
            {isShuffling ? 'Shuffling...' : 'Shuffle'}
          </button>
        </div>

        <div className="mb-8">
          <div className="text-2xl font-semibold text-gray-300">
            Moves: <span className="text-blue-400">{moves}</span>
          </div>
          {isComplete && (
            <div className="text-3xl font-bold mt-4">
              <span className="text-green-400">🎉 Puzzle Solved! Great job!</span>
            </div>
          )}
        </div>

        <div 
          className="inline-block bg-black/30 p-4 rounded-16 border border-gray-600 mb-8"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${puzzleSize}, 1fr)`,
            gap: '8px',
            width: '400px',
            height: '400px',
          }}
        >
          {tiles.map((tile, index) => {
            const { row, col } = getTilePosition(index);
            const isEmpty = tile === 0;
            const emptyIndex = tiles.indexOf(0);
            const canMove = !isEmpty && getNeighbors(emptyIndex).includes(index);

            return (
              <div
                key={index}
                onClick={() => handleTileClick(index)}
                className={`
                  flex items-center justify-center text-2xl font-bold rounded-12 transition-all duration-300 transform-3d
                  ${isEmpty 
                    ? 'bg-transparent' 
                    : canMove 
                      ? 'game-card cursor-pointer hover:scale-105 text-white' 
                      : 'game-card text-gray-400'
                  }
                `}
                style={{
                  transform: `perspective(1000px) rotateX(${row * 2}deg) rotateY(${col * 2}deg)`,
                  background: isEmpty ? 'transparent' : undefined,
                }}
              >
                {!isEmpty && (
                  <span className={isComplete ? 'text-green-400' : ''}>{tile}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-gray-400 text-sm">
          Click on tiles adjacent to the empty space to move them
        </div>
      </div>
    </div>
  );
}