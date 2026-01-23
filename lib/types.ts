export interface Exam {
  id: string;
  slug: string;
  title: string;
  description: string;
  passingScore: number;
  questionCount: number;
  timeLimit: number | null;
  category: 'driving' | 'citizenship' | 'food' | 'professional';
  province: string | null;
  icon: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Question {
  id: string;
  examId: string;
  questionText: string;
  imageUrl: string | null;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isPremium: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>;
  isComplete: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  weakTopics: string[];
}

export type AnswerKey = 'a' | 'b' | 'c' | 'd';
