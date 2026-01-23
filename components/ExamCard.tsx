import Link from 'next/link';
import type { Exam } from '@/lib/types';

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <Link href={`/${exam.slug}`} className="card-hover block">
      <div className="flex items-start space-x-4">
        <span className="text-4xl">{exam.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {exam.title}
          </h3>
          {exam.province && (
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded mt-1">
              {exam.province}
            </span>
          )}
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {exam.description}
          </p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <span>{exam.questionCount} questions</span>
            <span>Pass: {exam.passingScore}%</span>
            {exam.timeLimit && <span>{exam.timeLimit} min</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
