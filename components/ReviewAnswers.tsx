'use client';

import { useState } from 'react';
import type { Question, AnswerKey } from '@/lib/types';
import QuizQuestion from './QuizQuestion';

interface ReviewAnswersProps {
  questions: Question[];
  answers: Record<string, string>;
}

export default function ReviewAnswers({ questions, answers }: ReviewAnswersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="btn-secondary w-full"
      >
        Review Your Answers
      </button>
    );
  }

  const currentQuestion = questions[currentIndex];
  const userAnswer = answers[currentQuestion.id] as AnswerKey | undefined;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">
          Review - Question {currentIndex + 1} of {questions.length}
        </h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕ Close
        </button>
      </div>

      <QuizQuestion
        question={currentQuestion}
        selectedAnswer={userAnswer || null}
        onAnswer={() => {}}
        showResult={true}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="btn-secondary disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          onClick={() =>
            setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
          }
          disabled={currentIndex === questions.length - 1}
          className="btn-secondary disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
