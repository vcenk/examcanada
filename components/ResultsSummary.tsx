interface ResultsSummaryProps {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  passingScore: number;
}

export default function ResultsSummary({
  score,
  total,
  percentage,
  passed,
  passingScore,
}: ResultsSummaryProps) {
  return (
    <div
      className={`text-center p-8 rounded-2xl ${
        passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
      }`}
    >
      <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
      <h2
        className={`text-3xl font-bold mb-2 ${
          passed ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {passed ? 'Congratulations!' : 'Keep Practicing!'}
      </h2>
      <p className="text-gray-600 mb-6">
        {passed
          ? 'You passed the practice test!'
          : `You need ${passingScore}% to pass. Keep studying and try again!`}
      </p>

      <div className="flex justify-center items-center space-x-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{score}</div>
          <div className="text-sm text-gray-500">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div
            className={`text-4xl font-bold ${
              passed ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {percentage}%
          </div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>
    </div>
  );
}
