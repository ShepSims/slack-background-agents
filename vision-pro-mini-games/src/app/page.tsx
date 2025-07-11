'use client';

import { useState, useEffect } from 'react';
import { TicTacToe } from '@/components/games/TicTacToe';
import { MemoryGame } from '@/components/games/MemoryGame';
import { Snake } from '@/components/games/Snake';
import { Puzzle } from '@/components/games/Puzzle';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

type GameType = 'menu' | 'tictactoe' | 'memory' | 'snake' | 'puzzle';

export default function Home() {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const games = [
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      description: 'Classic strategy game in 3D space',
      icon: '⭕',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 'memory',
      title: 'Memory Cards',
      description: 'Test your memory with spatial cards',
      icon: '🧠',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 'snake',
      title: 'Snake 3D',
      description: 'Navigate through dimensional space',
      icon: '🐍',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 'puzzle',
      title: 'Slide Puzzle',
      description: 'Solve the spatial puzzle challenge',
      icon: '🧩',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'tictactoe':
        return <TicTacToe onBack={() => setCurrentGame('menu')} />;
      case 'memory':
        return <MemoryGame onBack={() => setCurrentGame('menu')} />;
      case 'snake':
        return <Snake onBack={() => setCurrentGame('menu')} />;
      case 'puzzle':
        return <Puzzle onBack={() => setCurrentGame('menu')} />;
      default:
        return (
          <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vision Pro Mini Games
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Immersive gaming experiences designed for spatial computing
              </p>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {games.map((game, index) => (
                <div
                  key={game.id}
                  className={`game-card float-animation cursor-pointer`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => setCurrentGame(game.id as GameType)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-10 rounded-16`} />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{game.icon}</div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{game.title}</h3>
                    <p className="text-gray-300 mb-4">{game.description}</p>
                    <div className="flex items-center text-blue-400 font-semibold">
                      <span>Play Now</span>
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="glass glass-hover p-8 rounded-24 text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Spatial Gaming Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="text-3xl mb-2">🎮</div>
                  <h3 className="text-lg font-semibold mb-2">Immersive Controls</h3>
                  <p className="text-gray-300 text-sm">Touch and gesture-based interactions</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🌟</div>
                  <h3 className="text-lg font-semibold mb-2">3D Effects</h3>
                  <p className="text-gray-300 text-sm">Depth and spatial awareness</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="text-lg font-semibold mb-2">Optimized Performance</h3>
                  <p className="text-gray-300 text-sm">Smooth 60fps gameplay</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="glass p-8 rounded-24">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-white mt-4 text-center">Loading Vision Pro Games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8">
        {renderGame()}
      </div>
    </div>
  );
}
