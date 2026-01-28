import type { Metadata } from 'next';
import FlashcardDeckCard from '@/components/FlashcardDeckCard';
import AdUnit from '@/components/AdUnit';
import type { FlashcardDeck } from '@/lib/types';

// Mock data for development - replace with Firestore queries
const mockDecks: FlashcardDeck[] = [
  {
    id: '1',
    slug: 'icbc-road-signs',
    examId: '1',
    title: 'ICBC Road Signs',
    description: 'Master all BC road signs with these flashcards. Perfect for visual learners preparing for the ICBC knowledge test.',
    cardCount: 50,
    category: 'driving',
    province: 'BC',
    icon: '🚸',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    slug: 'icbc-rules-of-road',
    examId: '1',
    title: 'ICBC Rules of the Road',
    description: 'Learn essential driving rules, right-of-way, and traffic laws for British Columbia.',
    cardCount: 75,
    category: 'driving',
    province: 'BC',
    icon: '📋',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    slug: 'g1-road-signs',
    examId: '2',
    title: 'Ontario G1 Road Signs',
    description: 'Study Ontario road signs and symbols for the G1 written test.',
    cardCount: 60,
    category: 'driving',
    province: 'ON',
    icon: '🛑',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    slug: 'citizenship-history',
    examId: '3',
    title: 'Canadian History',
    description: 'Key dates, events, and figures from Canadian history for the citizenship test.',
    cardCount: 40,
    category: 'citizenship',
    province: null,
    icon: '📜',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '5',
    slug: 'citizenship-government',
    examId: '3',
    title: 'Canadian Government',
    description: 'Learn about Canada\'s government structure, rights, and responsibilities.',
    cardCount: 35,
    category: 'citizenship',
    province: null,
    icon: '🏛️',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '6',
    slug: 'foodsafe-basics',
    examId: '4',
    title: 'FoodSafe Basics',
    description: 'Essential food safety concepts, temperatures, and hygiene practices.',
    cardCount: 45,
    category: 'food',
    province: 'BC',
    icon: '🦠',
    isActive: true,
    createdAt: new Date(),
  },
];

export const metadata: Metadata = {
  title: 'Flashcards - Study Canadian Exam Topics',
  description: 'Free flashcards to help you study for Canadian exams. Road signs, driving rules, citizenship facts, and more.',
};

export default async function FlashcardsPage() {
  // TODO: Replace with Firestore query
  // const decks = await getFlashcardDecks();
  const decks = mockDecks;

  // Group decks by category
  const decksByCategory = decks.reduce((acc, deck) => {
    if (!acc[deck.category]) {
      acc[deck.category] = [];
    }
    acc[deck.category].push(deck);
    return acc;
  }, {} as Record<string, FlashcardDeck[]>);

  const categoryInfo: Record<string, { title: string; icon: string }> = {
    driving: { title: 'Driving Tests', icon: '🚗' },
    citizenship: { title: 'Citizenship', icon: '🍁' },
    food: { title: 'Food Safety', icon: '🍽️' },
    professional: { title: 'Professional', icon: '💼' },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🗂️</span>
            <h1 className="text-4xl font-bold mb-4">Study Flashcards</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Reinforce your knowledge with our free flashcard decks. Perfect for quick review sessions and visual learning.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Unit - Top Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="8888888888" format="horizontal" className="max-w-3xl mx-auto" />
      </div>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How Flashcards Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <span className="text-4xl mb-3 block">👆</span>
              <h3 className="font-semibold text-gray-900 mb-2">Flip to Learn</h3>
              <p className="text-sm text-gray-600">
                Click or tap the card to reveal the answer on the back.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <span className="text-4xl mb-3 block">✅</span>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">
                Mark cards as &quot;Got It&quot; or &quot;Still Learning&quot; to track your mastery.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <span className="text-4xl mb-3 block">🔄</span>
              <h3 className="font-semibold text-gray-900 mb-2">Review & Repeat</h3>
              <p className="text-sm text-gray-600">
                Focus on cards you&apos;re still learning until you master them all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flashcard Decks by Category */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(decksByCategory).map(([category, categoryDecks]) => (
            <div key={category} className="mb-12 last:mb-0">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">{categoryInfo[category]?.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">
                  {categoryInfo[category]?.title || category}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDecks.map((deck) => (
                  <FlashcardDeckCard key={deck.id} deck={deck} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>Why Use Flashcards?</h2>
          <p>
            Flashcards are one of the most effective study methods, backed by cognitive science.
            The technique of active recall—trying to remember information before seeing the answer—
            strengthens memory retention far more than passive reading.
          </p>
          <h3>Benefits of Our Flashcard System</h3>
          <ul>
            <li><strong>Spaced repetition:</strong> Focus on cards you don&apos;t know yet</li>
            <li><strong>Visual learning:</strong> Road signs and images included where relevant</li>
            <li><strong>Mobile friendly:</strong> Study anywhere on any device</li>
            <li><strong>Progress tracking:</strong> See your mastery percentage after each session</li>
            <li><strong>100% free:</strong> No registration required</li>
          </ul>
          <h3>Tips for Effective Flashcard Study</h3>
          <ol>
            <li>Study in short sessions (15-20 minutes) for better retention</li>
            <li>Always try to recall the answer before flipping the card</li>
            <li>Be honest with yourself—only mark &quot;Got It&quot; if you really knew it</li>
            <li>Review cards you marked as &quot;Still Learning&quot; until you master them</li>
            <li>Combine flashcards with practice tests for best results</li>
          </ol>
        </div>
      </section>

      {/* Ad Unit - Bottom Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="9999999999" format="horizontal" className="max-w-3xl mx-auto" />
      </div>
    </div>
  );
}
