import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍁</span>
            <span className="text-xl font-bold text-gray-900">ExamCanada</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/category/driving"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Driving Tests
            </Link>
            <Link
              href="/category/citizenship"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Citizenship
            </Link>
            <Link
              href="/category/food"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Food Safety
            </Link>
            <Link
              href="/category/professional"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Professional
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
