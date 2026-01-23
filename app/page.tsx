import Link from 'next/link';
import ExamCard from '@/components/ExamCard';
import AdUnit from '@/components/AdUnit';
import type { Exam, Category } from '@/lib/types';

// Mock data for development (replace with Firestore queries when connected)
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

const mockCategories: Category[] = [
  { id: '1', slug: 'driving', title: 'Driving Tests', description: 'Provincial driving knowledge tests', icon: '🚗', order: 1 },
  { id: '2', slug: 'citizenship', title: 'Citizenship', description: 'Canadian citizenship exam prep', icon: '🍁', order: 2 },
  { id: '3', slug: 'food', title: 'Food Safety', description: 'Food handler certifications', icon: '🍽️', order: 3 },
  { id: '4', slug: 'professional', title: 'Professional', description: 'Professional certifications', icon: '💼', order: 4 },
];

export default async function HomePage() {
  // TODO: Replace with actual Firestore queries
  // const exams = await getExams();
  // const categories = await getCategories();
  const exams = mockExams;
  const categories = mockCategories;

  const examsByCategory = categories.map((category) => ({
    ...category,
    exams: exams.filter((exam) => exam.category === category.slug),
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Practice Tests for Canadian Exams
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Prepare for your ICBC, G1, Citizenship, and professional certification
            exams with our free practice tests.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/icbc" className="btn-success text-lg px-8 py-4">
              Start ICBC Practice Test
            </Link>
            <Link href="/g1" className="btn-secondary text-lg px-8 py-4">
              Start G1 Practice Test
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Unit - Top Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="1234567890" format="horizontal" className="max-w-3xl mx-auto" />
      </div>

      {/* Popular Exams */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Practice Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.slice(0, 6).map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {examsByCategory.map((category) => (
        category.exams.length > 0 && (
          <section key={category.id} className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.icon} {category.title}
                  </h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.exams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </div>
          </section>
        )
      ))}

      {/* SEO Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>Why Use ExamCanada for Your Practice Tests?</h2>
          <p>
            ExamCanada.online provides free, high-quality practice tests for
            Canadian government and professional certification exams. Whether
            you&apos;re preparing for your ICBC knowledge test in British Columbia,
            the G1 written test in Ontario, the Canadian Citizenship test, or
            FoodSafe certification, we have you covered.
          </p>
          <h3>100% Free Practice Tests</h3>
          <p>
            All our practice tests are completely free. No registration required,
            no hidden fees. Just start practicing and improve your chances of
            passing on your first try.
          </p>
          <h3>Realistic Test Experience</h3>
          <p>
            Our practice tests are designed to simulate the real exam experience.
            Questions are based on official study materials and cover all the
            topics you need to know.
          </p>
          <h3>Instant Feedback</h3>
          <p>
            Get immediate results and detailed explanations for every question.
            Learn from your mistakes and focus on areas that need improvement.
          </p>
        </div>
      </section>

      {/* Ad Unit - Bottom Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="0987654321" format="horizontal" className="max-w-3xl mx-auto" />
      </div>
    </div>
  );
}
