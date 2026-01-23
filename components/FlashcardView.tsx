'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Flashcard } from '@/lib/types';

interface FlashcardViewProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  showHint?: boolean;
}

export default function FlashcardView({
  card,
  isFlipped,
  onFlip,
  showHint = false,
}: FlashcardViewProps) {
  const [showHintText, setShowHintText] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div
        className="relative h-80 cursor-pointer perspective-1000"
        onClick={onFlip}
      >
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="h-full bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 flex flex-col items-center justify-center">
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-4">
                Front
              </div>
              {card.imageUrl && (
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={card.imageUrl}
                    alt="Flashcard image"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <p className="text-xl text-center text-gray-800 font-medium">
                {card.front}
              </p>
              <p className="text-sm text-gray-400 mt-6">
                Click to flip
              </p>
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="h-full bg-primary-50 rounded-2xl shadow-lg border-2 border-primary-200 p-8 flex flex-col items-center justify-center">
              <div className="text-xs uppercase tracking-wider text-primary-400 mb-4">
                Back
              </div>
              <p className="text-xl text-center text-gray-800 font-medium">
                {card.back}
              </p>
              <p className="text-sm text-gray-400 mt-6">
                Click to flip back
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hint Section */}
      {showHint && card.hint && (
        <div className="mt-4 text-center">
          {showHintText ? (
            <p className="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg inline-block">
              Hint: {card.hint}
            </p>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHintText(true);
              }}
              className="text-sm text-amber-600 hover:text-amber-700 underline"
            >
              Show hint
            </button>
          )}
        </div>
      )}

      {/* Topic Badge */}
      <div className="mt-4 flex justify-center">
        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
          {card.topic}
        </span>
      </div>
    </div>
  );
}
