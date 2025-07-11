'use client';

import { useState, useEffect, useCallback } from 'react';

interface SnakeProps {
  onBack: () => void;
}

interface Position {
  x: number;
  y: number;
}

export function Snake({ onBack }: SnakeProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const gridSize = 20;
  const gameSpeed = 150;

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, generateFood]);

  useEffect(() => {
    if (!isPlaying) return;

    const gameInterval = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, isPlaying]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection(prev => prev.y === 0 ? { x: 0, y: -1 } : prev);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection(prev => prev.y === 0 ? { x: 0, y: 1 } : prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection(prev => prev.x === 0 ? { x: -1, y: 0 } : prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection(prev => prev.x === 0 ? { x: 1, y: 0 } : prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  const handleDirectionButton = (newDirection: Position) => {
    if (!isPlaying) return;
    
    if (newDirection.x !== 0 && direction.x === 0) {
      setDirection(newDirection);
    } else if (newDirection.y !== 0 && direction.y === 0) {
      setDirection(newDirection);
    }
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
          <h1 className="text-4xl font-bold text-white">Snake 3D</h1>
          <button
            onClick={resetGame}
            className="glow-button glass-hover px-6 py-3 rounded-16 text-white font-semibold"
          >
            New Game
          </button>
        </div>

        <div className="mb-8">
          <div className="text-2xl font-semibold text-gray-300">
            Score: <span className="text-green-400">{score}</span>
          </div>
          {gameOver && (
            <div className="text-3xl font-bold mt-4">
              <span className="text-red-400">💀 Game Over!</span>
            </div>
          )}
          {!isPlaying && !gameOver && (
            <div className="text-2xl font-semibold mt-4">
              <span className="text-blue-400">Press &quot;New Game&quot; to start</span>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div 
            className="inline-block bg-black/30 p-4 rounded-16 border border-gray-600"
            style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gap: '1px',
              width: '400px',
              height: '400px',
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, index) => {
              const x = index % gridSize;
              const y = Math.floor(index / gridSize);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`
                    w-full h-full rounded-sm transition-all duration-100
                    ${isSnake 
                      ? isHead 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg' 
                        : 'bg-gradient-to-br from-green-500 to-green-700'
                      : isFood 
                        ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg animate-pulse' 
                        : 'bg-gray-800/50'
                    }
                  `}
                  style={{
                    transform: isSnake || isFood ? 'scale(1.1)' : 'scale(1)',
                    zIndex: isSnake || isFood ? 10 : 1,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-48 mx-auto mb-6">
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: 0, y: -1 })}
            className="glow-button glass-hover p-3 rounded-16 text-white font-bold text-xl"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: -1, y: 0 })}
            className="glow-button glass-hover p-3 rounded-16 text-white font-bold text-xl"
          >
            ←
          </button>
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: 1, y: 0 })}
            className="glow-button glass-hover p-3 rounded-16 text-white font-bold text-xl"
          >
            →
          </button>
          <div></div>
          <button
            onClick={() => handleDirectionButton({ x: 0, y: 1 })}
            className="glow-button glass-hover p-3 rounded-16 text-white font-bold text-xl"
          >
            ↓
          </button>
          <div></div>
        </div>

        <div className="text-gray-400 text-sm">
          Use arrow keys or buttons to control the snake
        </div>
      </div>
    </div>
  );
}