'use client';

import Link from 'next/link';
import { College } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {college.name}
        </h3>
        
        <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center gap-2">
            <span className="text-gray-400">📍</span> {college.location}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-gray-400">⭐</span> {college.rating.toFixed(1)}/5
          </p>
          <p className="flex items-center gap-2">
            <span className="text-gray-400">💰</span> ₹{college.fees.toLocaleString()} / {t('college.fees').toLowerCase()}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-gray-400">📊</span> {college.placements}% {t('college.placements').toLowerCase()}
          </p>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {college.description}
        </p>

        <Link
          href={`/college/${college.id}`}
          className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          {t('college.viewDetails')}
        </Link>
      </div>
    </div>
  );
}
