'use client';

import Image from 'next/image';
import type { Question, AnswerKey } from '@/lib/types';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswer: (answer: AnswerKey) => void;
  showResult?: boolean;
}

const answerLabels: Record<AnswerKey, string> = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
};

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswer,
  showResult = false,
}: QuizQuestionProps) {
  const options: { key: AnswerKey; text: string }[] = [
    { key: 'a', text: question.optionA },
    { key: 'b', text: question.optionB },
    { key: 'c', text: question.optionC },
    { key: 'd', text: question.optionD },
  ];

  const getOptionClassName = (key: AnswerKey) => {
    const base =
      'w-full p-4 text-left border-2 rounded-lg transition-all flex items-start space-x-3';

    if (showResult) {
      if (key === question.correctAnswer) {
        return `${base} border-green-500 bg-green-50`;
      }
      if (key === selectedAnswer && key !== question.correctAnswer) {
        return `${base} border-red-500 bg-red-50`;
      }
      return `${base} border-gray-200 bg-gray-50 opacity-60`;
    }

    if (key === selectedAnswer) {
      return `${base} border-primary-500 bg-primary-50`;
    }

    return `${base} border-gray-200 hover:border-primary-300 hover:bg-gray-50`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {question.questionText}
        </h2>
        {question.imageUrl && (
          <div className="mt-4 relative w-full max-w-md h-48">
            <Image
              src={question.imageUrl}
              alt="Question image"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        {options.map(({ key, text }) => (
          <button
            key={key}
            onClick={() => !showResult && onAnswer(key)}
            disabled={showResult}
            className={getOptionClassName(key)}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                key === selectedAnswer
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {answerLabels[key]}
            </span>
            <span className="flex-1 pt-1">{text}</span>
          </button>
        ))}
      </div>

      {showResult && (
        <div
          className={`p-4 rounded-lg ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-50 border border-green-200'
              : 'bg-yellow-50 border border-yellow-200'
          }`}
        >
          <p className="font-medium text-gray-900 mb-1">
            {selectedAnswer === question.correctAnswer
              ? '✓ Correct!'
              : `✗ Incorrect. The correct answer is ${answerLabels[question.correctAnswer]}.`}
          </p>
          <p className="text-gray-700 text-sm">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
