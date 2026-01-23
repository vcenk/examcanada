'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import QuizQuestion from '@/components/QuizQuestion';
import ProgressBar from '@/components/ProgressBar';
import AdUnit from '@/components/AdUnit';
import type { Question, Exam, AnswerKey } from '@/lib/types';
import { shuffleArray } from '@/lib/firestore';

// Mock data for development
const mockExams: Record<string, Exam> = {
  icbc: {
    id: '1',
    slug: 'icbc',
    title: 'ICBC Knowledge Test',
    description: 'Practice for the BC driver\'s license knowledge test.',
    passingScore: 80,
    questionCount: 5, // Reduced for demo
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
    description: 'Prepare for the Ontario G1 license written test.',
    passingScore: 80,
    questionCount: 5,
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
    description: 'Study for the Canadian Citizenship test.',
    passingScore: 75,
    questionCount: 5,
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
    description: 'BC FoodSafe certification practice test.',
    passingScore: 70,
    questionCount: 5,
    timeLimit: null,
    category: 'food',
    province: 'BC',
    icon: '🍽️',
    isActive: true,
    createdAt: new Date(),
  },
};

const mockQuestions: Question[] = [
  {
    id: 'q1',
    examId: '1',
    questionText: 'What does a yield sign mean?',
    imageUrl: null,
    optionA: 'Stop completely and wait',
    optionB: 'Slow down and yield to traffic',
    optionC: 'Speed up to merge quickly',
    optionD: 'Honk your horn',
    correctAnswer: 'b',
    explanation: 'A yield sign means you must slow down and give way to traffic already on the road you are entering.',
    topic: 'road-signs',
    difficulty: 'easy',
    isPremium: false,
    createdAt: new Date(),
  },
  {
    id: 'q2',
    examId: '1',
    questionText: 'When approaching a stop sign, you must:',
    imageUrl: null,
    optionA: 'Slow down and proceed if clear',
    optionB: 'Stop only if there is traffic',
    optionC: 'Come to a complete stop',
    optionD: 'Honk and proceed',
    correctAnswer: 'c',
    explanation: 'You must always come to a complete stop at a stop sign, regardless of whether there is other traffic.',
    topic: 'road-signs',
    difficulty: 'easy',
    isPremium: false,
    createdAt: new Date(),
  },
  {
    id: 'q3',
    examId: '1',
    questionText: 'What is the speed limit in a school zone unless otherwise posted?',
    imageUrl: null,
    optionA: '20 km/h',
    optionB: '30 km/h',
    optionC: '40 km/h',
    optionD: '50 km/h',
    correctAnswer: 'b',
    explanation: 'The default speed limit in a school zone is 30 km/h in most Canadian provinces.',
    topic: 'speed-limits',
    difficulty: 'medium',
    isPremium: false,
    createdAt: new Date(),
  },
  {
    id: 'q4',
    examId: '1',
    questionText: 'When can you pass a vehicle on the right?',
    imageUrl: null,
    optionA: 'Never',
    optionB: 'When the vehicle ahead is turning left',
    optionC: 'Whenever you want',
    optionD: 'Only on highways',
    correctAnswer: 'b',
    explanation: 'You may pass on the right when the vehicle ahead is making or about to make a left turn.',
    topic: 'right-of-way',
    difficulty: 'medium',
    isPremium: false,
    createdAt: new Date(),
  },
  {
    id: 'q5',
    examId: '1',
    questionText: 'What should you do if an emergency vehicle approaches with flashing lights?',
    imageUrl: null,
    optionA: 'Speed up to get out of the way',
    optionB: 'Stop immediately where you are',
    optionC: 'Pull over to the right and stop',
    optionD: 'Ignore it if you have right of way',
    correctAnswer: 'c',
    explanation: 'When an emergency vehicle approaches with lights/sirens, pull over to the right side of the road and stop.',
    topic: 'emergency-procedures',
    difficulty: 'easy',
    isPremium: false,
    createdAt: new Date(),
  },
];

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const examSlug = params.exam as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with Firestore queries
    const examData = mockExams[examSlug];
    if (examData) {
      setExam(examData);
      const shuffled = shuffleArray(mockQuestions).slice(0, examData.questionCount);
      setQuestions(shuffled);
    }
    setLoading(false);
  }, [examSlug]);

  const handleAnswer = (answer: AnswerKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleSubmit = () => {
    // Store results in sessionStorage for the results page
    const resultsData = {
      examSlug,
      questions,
      answers,
      passingScore: exam?.passingScore || 80,
    };
    sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
    router.push(`/${examSlug}/results`);
  };

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

  if (!exam || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Exam Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find this exam or there are no questions available.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const allAnswered = questions.every((q) => answers[q.id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/${examSlug}`}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Exit Test
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">{exam.title}</h1>
        <div className="w-20"></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      {/* Question */}
      <div className="card mb-8">
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id] || null}
          onAnswer={handleAnswer}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="btn-secondary disabled:opacity-50"
        >
          ← Previous
        </button>

        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                index === currentIndex
                  ? 'bg-primary-600 text-white'
                  : answers[questions[index].id]
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="btn-success disabled:opacity-50"
          >
            Submit Test
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary">
            Next →
          </button>
        )}
      </div>

      {!allAnswered && isLastQuestion && (
        <p className="text-center text-amber-600 mt-4 text-sm">
          Please answer all questions before submitting.
        </p>
      )}

      {/* Ad Unit - Bottom */}
      <div className="mt-12">
        <AdUnit slot="3333333333" format="horizontal" />
      </div>
    </div>
  );
}
