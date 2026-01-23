'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FlashcardView from './FlashcardView';
import ProgressBar from './ProgressBar';
import type { Flashcard, FlashcardDeck } from '@/lib/types';
import { shuffleArray } from '@/lib/firestore';

interface FlashcardStudyProps {
  deck: FlashcardDeck;
  cards: Flashcard[];
}

export default function FlashcardStudy({ deck, cards: initialCards }: FlashcardStudyProps) {
  const router = useRouter();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  // Shuffle cards on mount
  useEffect(() => {
    setCards(shuffleArray(initialCards));
  }, [initialCards]);

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleKnown = useCallback(() => {
    if (!currentCard) return;

    setKnownCards((prev) => new Set(prev).add(currentCard.id));
    setUnknownCards((prev) => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setIsComplete(true);
    }
  }, [currentCard, currentIndex, cards.length]);

  const handleUnknown = useCallback(() => {
    if (!currentCard) return;

    setUnknownCards((prev) => new Set(prev).add(currentCard.id));
    setKnownCards((prev) => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setIsComplete(true);
    }
  }, [currentCard, currentIndex, cards.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, cards.length]);

  const handleRestart = useCallback(() => {
    setCards(shuffleArray(initialCards));
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setIsComplete(false);
  }, [initialCards]);

  const handleStudyUnknown = useCallback(() => {
    const unknownCardsList = cards.filter((card) => unknownCards.has(card.id));
    if (unknownCardsList.length > 0) {
      setCards(shuffleArray(unknownCardsList));
      setCurrentIndex(0);
      setIsFlipped(false);
      setKnownCards(new Set());
      setUnknownCards(new Set());
      setIsComplete(false);
    }
  }, [cards, unknownCards]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          handleFlip();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '1':
        case 'k':
          if (isFlipped) handleKnown();
          break;
        case '2':
        case 'u':
          if (isFlipped) handleUnknown();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, isFlipped, handleFlip, handlePrevious, handleNext, handleKnown, handleUnknown]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No flashcards available in this deck.</p>
      </div>
    );
  }

  if (isComplete) {
    const percentageKnown = Math.round((knownCards.size / cards.length) * 100);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            {percentageKnown >= 80 ? '🎉' : percentageKnown >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Study Session Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            You've reviewed all {cards.length} cards in this deck.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-success-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-success-600">
                {knownCards.size}
              </div>
              <div className="text-sm text-success-700">Cards Known</div>
            </div>
            <div className="bg-danger-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-danger-600">
                {unknownCards.size}
              </div>
              <div className="text-sm text-danger-700">Need Review</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Mastery</span>
              <span>{percentageKnown}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  percentageKnown >= 80
                    ? 'bg-success-500'
                    : percentageKnown >= 60
                    ? 'bg-amber-500'
                    : 'bg-danger-500'
                }`}
                style={{ width: `${percentageKnown}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Study All Again
            </button>
            {unknownCards.size > 0 && (
              <button
                onClick={handleStudyUnknown}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
              >
                Review Unknown ({unknownCards.size})
              </button>
            )}
            <button
              onClick={() => router.push('/flashcards')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Browse Decks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <ProgressBar current={currentIndex + 1} total={cards.length} />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <div className="flex space-x-4">
            <span className="text-success-600">Known: {knownCards.size}</span>
            <span className="text-danger-600">Review: {unknownCards.size}</span>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      {currentCard && (
        <FlashcardView
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          showHint={!isFlipped}
        />
      )}

      {/* Controls */}
      <div className="mt-8">
        {isFlipped ? (
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleUnknown}
              className="flex-1 max-w-[200px] py-4 bg-danger-100 text-danger-700 rounded-xl hover:bg-danger-200 transition-colors font-medium"
            >
              <span className="block text-2xl mb-1">😕</span>
              Still Learning
            </button>
            <button
              onClick={handleKnown}
              className="flex-1 max-w-[200px] py-4 bg-success-100 text-success-700 rounded-xl hover:bg-success-200 transition-colors font-medium"
            >
              <span className="block text-2xl mb-1">😊</span>
              Got It!
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleFlip}
              className="px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
            >
              Flip Card
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>Keyboard: Space/Enter to flip • Arrow keys to navigate • K for known • U for unknown</p>
      </div>
    </div>
  );
}
