'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ResultsSummary from '@/components/ResultsSummary';
import ReviewAnswers from '@/components/ReviewAnswers';
import ShareButtons from '@/components/ShareButtons';
import AdUnit from '@/components/AdUnit';
import { calculateResults } from '@/lib/firestore';
import type { Question, QuizResult } from '@/lib/types';

interface StoredResults {
  examSlug: string;
  questions: Question[];
  answers: Record<string, string>;
  passingScore: number;
}

// Mock exam titles for display
const examTitles: Record<string, string> = {
  icbc: 'ICBC Knowledge Test',
  g1: 'G1 Written Test',
  citizenship: 'Canadian Citizenship Test',
  foodsafe: 'FoodSafe Level 1',
};

export default function ResultsPage() {
  const params = useParams();
  const examSlug = params.exam as string;

  const [results, setResults] = useState<QuizResult | null>(null);
  const [storedData, setStoredData] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults');
    if (stored) {
      const data: StoredResults = JSON.parse(stored);
      if (data.examSlug === examSlug) {
        setStoredData(data);
        const calculatedResults = calculateResults(
          data.questions,
          data.answers,
          data.passingScore
        );
        setResults(calculatedResults);
      }
    }
    setLoading(false);
  }, [examSlug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!results || !storedData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h1>
        <p className="text-gray-600 mb-8">
          It looks like you haven&apos;t completed a test yet, or your session has expired.
        </p>
        <Link href={`/${examSlug}`} className="btn-primary">
          Start Practice Test
        </Link>
      </div>
    );
  }

  const examTitle = examTitles[examSlug] || 'Practice Test';
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + `/${examSlug}` : '';
  const shareText = `I scored ${results.percentage}% on the ${examTitle} practice test at ExamCanada! Try it yourself:`;

  return (
    <div>
      {/* Ad Unit - Top Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot="1234567890" format="horizontal" className="max-w-3xl mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Results Summary */}
            <ResultsSummary
              score={results.correctAnswers}
              total={results.totalQuestions}
              percentage={results.percentage}
              passed={results.passed}
              passingScore={storedData.passingScore}
            />

            {/* Weak Areas */}
            {results.weakTopics.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Areas to Improve
                </h3>
                <p className="text-gray-600 mb-4">
                  Focus your study on these topics to improve your score:
                </p>
                <ul className="space-y-2">
                  {results.weakTopics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-center space-x-2 text-amber-700"
                    >
                      <span>⚠️</span>
                      <span className="capitalize">{topic.replace(/-/g, ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Review Answers */}
            <ReviewAnswers
              questions={storedData.questions}
              answers={storedData.answers}
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${examSlug}/test`} className="btn-success flex-1 text-center">
                Try Again
              </Link>
              <Link href={`/${examSlug}`} className="btn-secondary flex-1 text-center">
                Back to Exam Page
              </Link>
            </div>

            {/* Share */}
            <div className="card">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-600">Share your results with friends:</p>
                <ShareButtons
                  title={`${examTitle} Results`}
                  text={shareText}
                  url={shareUrl}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ad Unit - Sidebar */}
            <AdUnit slot="4444444444" format="rectangle" />

            {/* Next Steps */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
              <ul className="space-y-3 text-sm">
                {results.passed ? (
                  <>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>You&apos;re ready for the real test!</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Book your official test appointment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Review the official study guide one more time</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-500">→</span>
                      <span>Review the questions you got wrong</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-500">→</span>
                      <span>Study the official guide for weak areas</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-500">→</span>
                      <span>Take the practice test again</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Book Test CTA */}
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="font-semibold text-primary-900 mb-2">
                Ready for the Real Test?
              </h3>
              <p className="text-primary-700 text-sm mb-4">
                Book your official test appointment now.
              </p>
              <a
                href="https://www.icbc.com/driver-licensing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                Book Now →
              </a>
            </div>

            {/* Ad Unit - Sidebar 2 */}
            <AdUnit slot="5555555555" format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
