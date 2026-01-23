import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import FlashcardStudy from '@/components/FlashcardStudy';
import AdUnit from '@/components/AdUnit';
import type { FlashcardDeck, Flashcard } from '@/lib/types';

// Mock data for development
const mockDecks: Record<string, FlashcardDeck> = {
  'icbc-road-signs': {
    id: '1',
    slug: 'icbc-road-signs',
    examId: '1',
    title: 'ICBC Road Signs',
    description: 'Master all BC road signs with these flashcards. Perfect for visual learners preparing for the ICBC knowledge test.',
    cardCount: 10,
    category: 'driving',
    province: 'BC',
    icon: '🚸',
    isActive: true,
    createdAt: new Date(),
  },
  'icbc-rules-of-road': {
    id: '2',
    slug: 'icbc-rules-of-road',
    examId: '1',
    title: 'ICBC Rules of the Road',
    description: 'Learn essential driving rules, right-of-way, and traffic laws for British Columbia.',
    cardCount: 10,
    category: 'driving',
    province: 'BC',
    icon: '📋',
    isActive: true,
    createdAt: new Date(),
  },
  'g1-road-signs': {
    id: '3',
    slug: 'g1-road-signs',
    examId: '2',
    title: 'Ontario G1 Road Signs',
    description: 'Study Ontario road signs and symbols for the G1 written test.',
    cardCount: 10,
    category: 'driving',
    province: 'ON',
    icon: '🛑',
    isActive: true,
    createdAt: new Date(),
  },
  'citizenship-history': {
    id: '4',
    slug: 'citizenship-history',
    examId: '3',
    title: 'Canadian History',
    description: 'Key dates, events, and figures from Canadian history for the citizenship test.',
    cardCount: 10,
    category: 'citizenship',
    province: null,
    icon: '📜',
    isActive: true,
    createdAt: new Date(),
  },
  'citizenship-government': {
    id: '5',
    slug: 'citizenship-government',
    examId: '3',
    title: 'Canadian Government',
    description: 'Learn about Canada\'s government structure, rights, and responsibilities.',
    cardCount: 10,
    category: 'citizenship',
    province: null,
    icon: '🏛️',
    isActive: true,
    createdAt: new Date(),
  },
  'foodsafe-basics': {
    id: '6',
    slug: 'foodsafe-basics',
    examId: '4',
    title: 'FoodSafe Basics',
    description: 'Essential food safety concepts, temperatures, and hygiene practices.',
    cardCount: 10,
    category: 'food',
    province: 'BC',
    icon: '🦠',
    isActive: true,
    createdAt: new Date(),
  },
};

// Mock flashcards for ICBC Road Signs deck
const mockFlashcards: Record<string, Flashcard[]> = {
  '1': [
    {
      id: 'f1',
      deckId: '1',
      front: 'What does a STOP sign mean?',
      back: 'Come to a complete stop, yield to traffic and pedestrians, then proceed when safe.',
      imageUrl: null,
      hint: 'This is a red octagonal sign',
      topic: 'regulatory-signs',
      difficulty: 'easy',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f2',
      deckId: '1',
      front: 'What does a YIELD sign mean?',
      back: 'Slow down and give the right-of-way to traffic in the intersection or approaching from another direction.',
      imageUrl: null,
      hint: 'This is an upside-down triangle',
      topic: 'regulatory-signs',
      difficulty: 'easy',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f3',
      deckId: '1',
      front: 'What does a yellow diamond-shaped sign indicate?',
      back: 'Warning signs - they alert you to potential hazards or changes in road conditions ahead.',
      imageUrl: null,
      hint: 'Think about the color and shape',
      topic: 'warning-signs',
      difficulty: 'easy',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f4',
      deckId: '1',
      front: 'What does a circular sign with a green border indicate?',
      back: 'A permitted or compulsory movement (e.g., turn right only, proceed straight).',
      imageUrl: null,
      hint: 'Green means go or allowed',
      topic: 'regulatory-signs',
      difficulty: 'medium',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f5',
      deckId: '1',
      front: 'What does a white rectangular sign typically indicate?',
      back: 'Regulatory information such as speed limits, parking rules, or traffic regulations.',
      imageUrl: null,
      hint: 'These often have numbers or text',
      topic: 'regulatory-signs',
      difficulty: 'easy',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f6',
      deckId: '1',
      front: 'What does a circular sign with a red border indicate?',
      back: 'A prohibited action or restriction (e.g., no U-turn, no left turn, no parking).',
      imageUrl: null,
      hint: 'Red means stop or not allowed',
      topic: 'regulatory-signs',
      difficulty: 'easy',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f7',
      deckId: '1',
      front: 'What does a pentagon-shaped sign indicate?',
      back: 'School zone or school crossing ahead - reduce speed and watch for children.',
      imageUrl: null,
      hint: 'Five-sided sign near schools',
      topic: 'warning-signs',
      difficulty: 'medium',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f8',
      deckId: '1',
      front: 'What does a blue rectangular sign with white symbols indicate?',
      back: 'Information or services available, such as hospital, gas station, or rest area.',
      imageUrl: null,
      hint: 'These help you find amenities',
      topic: 'information-signs',
      difficulty: 'easy',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f9',
      deckId: '1',
      front: 'What does a flashing yellow light mean?',
      back: 'Proceed with caution - slow down and be prepared to stop if necessary.',
      imageUrl: null,
      hint: 'Not as urgent as red, but still be careful',
      topic: 'traffic-signals',
      difficulty: 'easy',
      isPremium: false,
      createdAt: new Date(),
    },
    {
      id: 'f10',
      deckId: '1',
      front: 'What does a flashing red light mean?',
      back: 'Treat it as a stop sign - come to a complete stop, yield, then proceed when safe.',
      imageUrl: null,
      hint: 'Same as another common red sign',
      topic: 'traffic-signals',
      difficulty: 'medium',
      isPremium: false,
      createdAt: new Date(),
    },
  ],
  // Add more mock flashcards for other decks as needed
};

interface PageProps {
  params: Promise<{ deck: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // TODO: Replace with Firestore query
  const deck = mockDecks[resolvedParams.deck];

  if (!deck) {
    return { title: 'Flashcard Deck Not Found' };
  }

  return {
    title: `${deck.title} Flashcards - Study & Memorize`,
    description: deck.description,
  };
}

export default async function FlashcardDeckPage({ params }: PageProps) {
  const resolvedParams = await params;
  // TODO: Replace with Firestore queries
  // const deck = await getFlashcardDeckBySlug(params.deck);
  // const cards = deck ? await getFlashcardsByDeckId(deck.id) : [];
  const deck = mockDecks[resolvedParams.deck];
  const cards = deck ? (mockFlashcards[deck.id] || mockFlashcards['1'] || []) : [];

  if (!deck) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-primary-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/flashcards" className="hover:text-white transition-colors">
                  Flashcards
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{deck.title}</li>
            </ol>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-5xl">{deck.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{deck.title}</h1>
              <p className="text-primary-100 mt-1">{deck.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-primary-200">
                <span>{cards.length} cards</span>
                {deck.province && (
                  <span className="px-2 py-0.5 bg-primary-500/30 rounded">
                    {deck.province}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Area */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlashcardStudy deck={deck} cards={cards} />
        </div>
      </section>

      {/* Ad Unit - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="1010101010" format="horizontal" className="max-w-3xl mx-auto" />
      </div>

      {/* Related Resources */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Continue Your Study
          </h2>
          <div className="flex flex-wrap gap-4">
            {deck.examId && (
              <Link
                href={`/${mockDecks[resolvedParams.deck]?.slug?.split('-')[0] || 'icbc'}`}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <span className="mr-2">📝</span>
                Take Practice Test
              </Link>
            )}
            <Link
              href="/flashcards"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <span className="mr-2">🗂️</span>
              Browse All Flashcard Decks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
