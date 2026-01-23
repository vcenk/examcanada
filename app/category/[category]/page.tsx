import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExamCard from '@/components/ExamCard';
import AdUnit from '@/components/AdUnit';
import type { Exam, Category } from '@/lib/types';

// Mock data for development
const mockCategories: Record<string, Category> = {
  driving: {
    id: '1',
    slug: 'driving',
    title: 'Driving Tests',
    description: 'Practice tests for provincial driver\'s license knowledge exams across Canada.',
    icon: '🚗',
    order: 1,
  },
  citizenship: {
    id: '2',
    slug: 'citizenship',
    title: 'Citizenship Tests',
    description: 'Prepare for the Canadian Citizenship test with questions from Discover Canada.',
    icon: '🍁',
    order: 2,
  },
  food: {
    id: '3',
    slug: 'food',
    title: 'Food Safety',
    description: 'Food handler certification practice tests for various provinces.',
    icon: '🍽️',
    order: 3,
  },
  professional: {
    id: '4',
    slug: 'professional',
    title: 'Professional Certifications',
    description: 'Practice tests for professional licenses and certifications.',
    icon: '💼',
    order: 4,
  },
};

const mockExams: Exam[] = [
  {
    id: '1',
    slug: 'icbc',
    title: 'ICBC Knowledge Test',
    description: 'Practice for the BC driver\'s license knowledge test. Covers road signs, rules of the road, and safe driving practices.',
    passingScore: 80,
    questionCount: 50,
    timeLimit: null,
    category: 'driving',
    province: 'BC',
    icon: '🚗',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    slug: 'g1',
    title: 'G1 Written Test',
    description: 'Prepare for the Ontario G1 license written test. Study road signs and traffic rules.',
    passingScore: 80,
    questionCount: 40,
    timeLimit: null,
    category: 'driving',
    province: 'ON',
    icon: '🚙',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    slug: 'citizenship',
    title: 'Canadian Citizenship Test',
    description: 'Study for the Canadian Citizenship test with questions from Discover Canada.',
    passingScore: 75,
    questionCount: 20,
    timeLimit: 30,
    category: 'citizenship',
    province: null,
    icon: '🍁',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    slug: 'foodsafe',
    title: 'FoodSafe Level 1',
    description: 'BC FoodSafe certification practice test for food handlers.',
    passingScore: 70,
    questionCount: 50,
    timeLimit: null,
    category: 'food',
    province: 'BC',
    icon: '🍽️',
    isActive: true,
    createdAt: new Date(),
  },
];

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // TODO: Replace with Firestore query
  const category = mockCategories[resolvedParams.category];

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.title} - Free Practice Tests`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  // TODO: Replace with Firestore queries
  // const category = await getCategoryBySlug(params.category);
  // const exams = await getExamsByCategory(params.category);
  const category = mockCategories[resolvedParams.category];
  const exams = mockExams.filter((e) => e.category === resolvedParams.category);

  if (!category) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{category.title}</h1>
              <p className="text-primary-100 mt-2">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Unit - Top Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="6666666666" format="horizontal" className="max-w-3xl mx-auto" />
      </div>

      {/* Exams Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {exams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No exams available in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>About {category.title}</h2>
          <p>
            ExamCanada offers comprehensive practice tests for {category.title.toLowerCase()}.
            Our free practice tests are designed to help you prepare for the real exam and
            increase your chances of passing on your first attempt.
          </p>
          <h3>Why Practice with ExamCanada?</h3>
          <ul>
            <li>100% free practice tests with no registration required</li>
            <li>Questions based on official study materials</li>
            <li>Instant feedback with detailed explanations</li>
            <li>Track your weak areas and focus your study</li>
            <li>Unlimited practice attempts</li>
          </ul>
        </div>
      </section>

      {/* Ad Unit - Bottom Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="7777777777" format="horizontal" className="max-w-3xl mx-auto" />
      </div>
    </div>
  );
}
