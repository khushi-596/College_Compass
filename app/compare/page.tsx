import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CompareForm from '@/components/CompareForm';
import { CollegeDetail } from '@/lib/types';

interface PageProps {
  searchParams: Promise<{
    colleges?: string | string[];
  }>;
}

export default async function ComparePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  let allColleges: CollegeDetail[] = [];
  let selectedColleges: CollegeDetail[] = [];
  let error = '';

  // Fetch all colleges for the selection form
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/colleges?limit=100`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    
    if (response.ok) {
      // Get first college's details to retrieve full college data
      allColleges = data.colleges;
    }
  } catch (err) {
    error = 'Failed to fetch colleges';
    console.error(err);
  }

  // Fetch selected colleges if provided
  const collegeIds = resolvedSearchParams.colleges
    ? Array.isArray(resolvedSearchParams.colleges)
      ? resolvedSearchParams.colleges
      : [resolvedSearchParams.colleges]
    : [];

  if (collegeIds.length > 0) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/compare?${collegeIds
          .map((id) => `ids=${id}`)
          .join('&')}`,
        { cache: 'no-store' }
      );
      const data = await response.json();
      
      if (response.ok) {
        selectedColleges = data;
      }
    } catch (err) {
      console.error('Failed to fetch comparison data:', err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <span>←</span> Back to Colleges
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Compare Colleges
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select up to 3 colleges to compare their features, fees, and placements
          </p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Selection Form */}
        {allColleges.length > 0 && <CompareForm colleges={allColleges} />}

        {/* Comparison Table */}
        {selectedColleges.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Comparison Results
            </h2>

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                      <th className="text-left py-4 px-6 font-bold text-gray-900 dark:text-white">
                        Attribute
                      </th>
                      {selectedColleges.map((college) => (
                        <th
                          key={college.id}
                          className="text-left py-4 px-6 font-bold text-gray-900 dark:text-white"
                        >
                          {college.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        Location
                      </td>
                      {selectedColleges.map((college) => (
                        <td
                          key={college.id}
                          className="py-4 px-6 text-gray-600 dark:text-gray-400"
                        >
                          {college.location}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        Annual Fees
                      </td>
                      {selectedColleges.map((college) => (
                        <td
                          key={college.id}
                          className="py-4 px-6 text-gray-600 dark:text-gray-400"
                        >
                          ₹{college.fees.toLocaleString()}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        Rating
                      </td>
                      {selectedColleges.map((college) => (
                        <td
                          key={college.id}
                          className="py-4 px-6 text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-yellow-500">⭐</span> {college.rating.toFixed(1)}/5
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        Placement Rate
                      </td>
                      {selectedColleges.map((college) => (
                        <td
                          key={college.id}
                          className="py-4 px-6 text-gray-600 dark:text-gray-400"
                        >
                          {college.placements}%
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-800">
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        View Details
                      </td>
                      {selectedColleges.map((college) => (
                        <td key={college.id} className="py-4 px-6">
                          <Link
                            href={`/college/${college.id}`}
                            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View →
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedColleges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Select colleges from the form above to see a detailed comparison
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
