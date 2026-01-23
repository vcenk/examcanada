import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import type { Exam } from '@/lib/types';

// Mock data for development
const mockExams: Record<string, Exam> = {
  icbc: {
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
  g1: {
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
  citizenship: {
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
  foodsafe: {
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
};

interface PageProps {
  params: Promise<{ exam: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // TODO: Replace with Firestore query
  const exam = mockExams[resolvedParams.exam];

  if (!exam) {
    return { title: 'Exam Not Found' };
  }

  return {
    title: `${exam.title} Practice Test - Free Online`,
    description: `Free ${exam.title} practice test. ${exam.questionCount} questions, ${exam.passingScore}% passing score. Start practicing now!`,
  };
}

export default async function ExamLandingPage({ params }: PageProps) {
  const resolvedParams = await params;
  // TODO: Replace with Firestore query
  // const exam = await getExamBySlug(params.exam);
  const exam = mockExams[resolvedParams.exam];

  if (!exam) {
    notFound();
  }

  const topics = [
    'Road Signs and Signals',
    'Right of Way Rules',
    'Safe Driving Practices',
    'Parking Regulations',
    'Speed Limits',
    'Emergency Procedures',
  ];

  return (
    <div>
      {/* Ad Unit - Top Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="1234567890" format="horizontal" className="max-w-3xl mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Exam Header */}
            <div className="card mb-8">
              <div className="flex items-start space-x-4">
                <span className="text-6xl">{exam.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{exam.title}</h1>
                  {exam.province && (
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded mt-2">
                      {exam.province}
                    </span>
                  )}
                  <p className="text-gray-600 mt-4">{exam.description}</p>
                </div>
              </div>
            </div>

            {/* Test Info */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Information</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600">{exam.questionCount}</div>
                  <div className="text-sm text-gray-500">Questions</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600">{exam.passingScore}%</div>
                  <div className="text-sm text-gray-500">Passing Score</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600">
                    {exam.timeLimit ? `${exam.timeLimit}m` : '∞'}
                  </div>
                  <div className="text-sm text-gray-500">Time Limit</div>
                </div>
              </div>

              <Link
                href={`/${exam.slug}/test`}
                className="btn-success w-full mt-6 text-lg py-4"
              >
                Start Practice Test
              </Link>
            </div>

            {/* Topics Covered */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Topics Covered</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topics.map((topic, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SEO Content */}
            <div className="card prose prose-lg max-w-none">
              <h2>About the {exam.title}</h2>
              <p>
                The {exam.title} is an essential step for anyone looking to obtain their
                {exam.category === 'driving' ? ' driver\'s license' : ' certification'}
                {exam.province ? ` in ${exam.province}` : ' in Canada'}. This practice test
                is designed to help you prepare and increase your chances of passing on your
                first attempt.
              </p>

              <h3>What to Expect</h3>
              <p>
                Our practice test includes {exam.questionCount} questions covering all the
                topics you&apos;ll encounter on the real exam. You need to score at least
                {exam.passingScore}% to pass.
                {exam.timeLimit
                  ? ` You&apos;ll have ${exam.timeLimit} minutes to complete the test.`
                  : ' There is no time limit, so take your time and focus on understanding each question.'}
              </p>

              <h3>Study Tips</h3>
              <ul>
                <li>Read the official study guide thoroughly</li>
                <li>Take this practice test multiple times</li>
                <li>Review explanations for questions you get wrong</li>
                <li>Focus on your weak areas identified in the results</li>
                <li>Get a good night&apos;s sleep before the real test</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ad Unit - Sidebar */}
            <AdUnit slot="1111111111" format="rectangle" />

            {/* Quick Links */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Official Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.icbc.com/driver-licensing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    ICBC Official Site →
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Download Study Guide →
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Book Your Test →
                  </a>
                </li>
              </ul>
            </div>

            {/* Ad Unit - Sidebar 2 */}
            <AdUnit slot="2222222222" format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
