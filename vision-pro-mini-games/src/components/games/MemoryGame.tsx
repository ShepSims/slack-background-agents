'use client';

import { useState, useEffect, useCallback } from 'react';

interface MemoryGameProps {
  onBack: () => void;
}

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const symbols = ['🎮', '🌟', '⚡', '🎯', '🎪', '🎨', '🎭', '🎪'];

  const initializeGame = useCallback(() => {
    const cardPairs = symbols.flatMap((symbol, index) => [
      { id: index * 2, symbol, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false },
    ]);
    
    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsGameComplete(false);
  }, [symbols]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameComplete(true);
    }
  }, [cards]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
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
          <h1 className="text-4xl font-bold text-white">Memory Cards</h1>
          <button
            onClick={initializeGame}
            className="glow-button glass-hover px-6 py-3 rounded-16 text-white font-semibold"
          >
            New Game
          </button>
        </div>

        <div className="mb-8">
          <div className="text-2xl font-semibold text-gray-300">
            Moves: <span className="text-blue-400">{moves}</span>
          </div>
          {isGameComplete && (
            <div className="text-3xl font-bold mt-4">
              <span className="text-green-400">🎉 Congratulations! You completed it in {moves} moves!</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`game-card aspect-square flex items-center justify-center text-3xl font-bold h-20 transform-3d transition-all duration-500 ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                  : 'hover:scale-105'
              }`}
              style={{
                transform: `perspective(1000px) rotateX(${Math.sin(index * 0.3) * 3}deg) rotateY(${Math.cos(index * 0.3) * 3}deg) ${
                  card.isFlipped || card.isMatched ? 'rotateY(180deg)' : ''
                }`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {card.isFlipped || card.isMatched ? (
                <span className="text-white">{card.symbol}</span>
              ) : (
                <span className="text-gray-500">?</span>
              )}
            </button>
          ))}
        </div>

        <div className="text-gray-400 text-sm">
          Find matching pairs by flipping two cards at a time
        </div>
      </div>
    </div>
  );
}