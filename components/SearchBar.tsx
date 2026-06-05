'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [minFees, setMinFees] = useState(searchParams.get('minFees') || '');
  const [maxFees, setMaxFees] = useState(searchParams.get('maxFees') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    if (minFees) params.set('minFees', minFees);
    if (maxFees) params.set('maxFees', maxFees);
    params.set('page', '1');

    router.push(`/?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch('');
    setLocation('');
    setMinFees('');
    setMaxFees('');
    router.push('/');
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('nav.search')}
        </label>
        <input
          type="text"
          placeholder={t('search.placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('search.location')}
          </label>
          <input
            type="text"
            placeholder={t('search.location')}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('search.minFees')} (₹)
          </label>
          <input
            type="number"
            placeholder={t('search.minFees')}
            value={minFees}
            onChange={(e) => setMinFees(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('search.maxFees')} (₹)
        </label>
        <input
          type="number"
          placeholder={t('search.maxFees')}
          value={maxFees}
          onChange={(e) => setMaxFees(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {t('search.search')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {t('search.reset')}
        </button>
      </div>
    </form>
  );
}
