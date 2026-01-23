import { db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import type { Exam, Question, Category } from './types';

// Get all active exams
export async function getExams(): Promise<Exam[]> {
  const q = query(
    collection(db, 'exams'),
    where('isActive', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Exam[];
}

// Get exam by slug
export async function getExamBySlug(slug: string): Promise<Exam | null> {
  const q = query(
    collection(db, 'exams'),
    where('slug', '==', slug),
    where('isActive', '==', true)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docData = snapshot.docs[0];
  return {
    id: docData.id,
    ...docData.data(),
    createdAt: docData.data().createdAt?.toDate() || new Date(),
  } as Exam;
}

// Get exam by ID
export async function getExamById(examId: string): Promise<Exam | null> {
  const docRef = doc(db, 'exams', examId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate() || new Date(),
  } as Exam;
}

// Get questions for exam (free only)
export async function getQuestionsByExamId(examId: string): Promise<Question[]> {
  const q = query(
    collection(db, 'questions'),
    where('examId', '==', examId),
    where('isPremium', '==', false)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Question[];
}

// Get exams by category
export async function getExamsByCategory(category: string): Promise<Exam[]> {
  const q = query(
    collection(db, 'exams'),
    where('category', '==', category),
    where('isActive', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Exam[];
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const q = query(collection(db, 'categories'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docData = snapshot.docs[0];
  return {
    id: docData.id,
    ...docData.data(),
  } as Category;
}

// Shuffle array helper (Fisher-Yates algorithm)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Calculate quiz results
export function calculateResults(
  questions: Question[],
  answers: Record<string, string>,
  passingScore: number
): {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  weakTopics: string[];
} {
  let correctAnswers = 0;
  const topicResults: Record<string, { correct: number; total: number }> = {};

  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
      correctAnswers++;
    }

    // Track topic performance
    if (!topicResults[question.topic]) {
      topicResults[question.topic] = { correct: 0, total: 0 };
    }
    topicResults[question.topic].total++;
    if (isCorrect) {
      topicResults[question.topic].correct++;
    }
  });

  const percentage = Math.round((correctAnswers / questions.length) * 100);

  // Find weak topics (less than 60% correct)
  const weakTopics = Object.entries(topicResults)
    .filter(([, stats]) => stats.correct / stats.total < 0.6)
    .map(([topic]) => topic);

  return {
    totalQuestions: questions.length,
    correctAnswers,
    percentage,
    passed: percentage >= passingScore,
    weakTopics,
  };
}
