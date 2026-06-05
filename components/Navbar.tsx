'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/components/LanguageProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:inline">
              College Compass
            </span>
          </Link>

          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                pathname === '/'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/compare"
              className={`font-medium transition-colors ${
                pathname === '/compare'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.compare')}
            </Link>
            <div className="hidden sm:block border-l border-gray-200 dark:border-slate-800 pl-6">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
