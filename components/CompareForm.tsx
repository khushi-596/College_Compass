'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CollegeDetail } from '@/lib/types';

interface CompareFormProps {
  colleges: CollegeDetail[];
}

export default function CompareForm({ colleges }: CompareFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedColleges, setSelectedColleges] = useState<string[]>(
    searchParams.getAll('colleges')
  );

  const handleSelectionChange = (id: string) => {
    if (selectedColleges.includes(id)) {
      setSelectedColleges(selectedColleges.filter((c) => c !== id));
    } else {
      if (selectedColleges.length < 3) {
        setSelectedColleges([...selectedColleges, id]);
      }
    }
  };

  const handleCompare = () => {
    if (selectedColleges.length > 0) {
      const params = new URLSearchParams();
      selectedColleges.forEach((id) => params.append('colleges', id));
      router.push(`/compare?${params.toString()}`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Select Colleges to Compare (Max 3)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {colleges.map((college) => (
          <label
            key={college.id}
            className="flex items-start gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedColleges.includes(college.id)}
              onChange={() => handleSelectionChange(college.id)}
              disabled={
                !selectedColleges.includes(college.id) && selectedColleges.length >= 3
              }
              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">
                {college.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {college.location}
              </p>
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={handleCompare}
        disabled={selectedColleges.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Compare Selected ({selectedColleges.length})
      </button>
    </div>
  );
}
