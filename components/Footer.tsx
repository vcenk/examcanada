import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍁</span>
              <span className="text-xl font-bold text-white">ExamCanada</span>
            </div>
            <p className="text-sm">
              Free practice tests for Canadian government and professional
              certification exams.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Driving Tests</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/icbc" className="hover:text-white transition-colors">
                  ICBC Knowledge Test (BC)
                </Link>
              </li>
              <li>
                <Link href="/g1" className="hover:text-white transition-colors">
                  G1 Written Test (Ontario)
                </Link>
              </li>
              <li>
                <Link href="/class5" className="hover:text-white transition-colors">
                  Class 5 (Alberta)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Other Exams</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/citizenship"
                  className="hover:text-white transition-colors"
                >
                  Canadian Citizenship Test
                </Link>
              </li>
              <li>
                <Link
                  href="/foodsafe"
                  className="hover:text-white transition-colors"
                >
                  FoodSafe (BC)
                </Link>
              </li>
              <li>
                <Link href="/nppe" className="hover:text-white transition-colors">
                  NPPE Engineering
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ExamCanada.online. All rights reserved.</p>
          <p className="mt-2">
            This site is not affiliated with any government agency. Practice tests
            are for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
