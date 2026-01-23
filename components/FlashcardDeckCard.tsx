import Link from 'next/link';
import type { FlashcardDeck } from '@/lib/types';

interface FlashcardDeckCardProps {
  deck: FlashcardDeck;
}

export default function FlashcardDeckCard({ deck }: FlashcardDeckCardProps) {
  return (
    <Link
      href={`/flashcards/${deck.slug}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start space-x-4">
          <span className="text-4xl">{deck.icon}</span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {deck.title}
            </h3>
            {deck.province && (
              <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 bg-primary-100 text-primary-700 rounded">
                {deck.province}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {deck.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {deck.cardCount} cards
            </div>
          </div>

          {/* Study Button */}
          <span className="inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
            Study
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
