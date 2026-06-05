import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CollegeDetail } from '@/lib/types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CollegePage({ params }: PageProps) {
  const { id } = params;
  let college: CollegeDetail | null = null;
  let error = '';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/colleges/${id}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    
    if (response.ok) {
      college = data;
    } else {
      error = data.error || 'College not found';
    }
  } catch (err) {
    error = 'Failed to fetch college details';
    console.error(err);
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              College Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'The college you are looking for does not exist.'}
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              Back to Colleges
            </Link>
          </div>
        </main>
      </div>
    );
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

        {/* College Header */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {college.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            {college.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {college.location}
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rating</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ⭐ {college.rating.toFixed(1)}/5
              </p>
            </div>

            <div className="bg-green-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Fees</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{college.fees.toLocaleString()}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Placement Rate</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {college.placements}%
              </p>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Courses Offered
          </h2>

          {college.courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">
                      Course Name
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">
                      Duration
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">
                      Fees (Annual)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {college.courses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      <td className="py-4 px-4 text-gray-900 dark:text-gray-100">
                        {course.name}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {course.duration}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        ₹{course.fees.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No courses information available
            </p>
          )}
        </div>

        {/* Compare Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/compare?colleges=${college.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Compare with Other Colleges
          </Link>
        </div>
      </main>
    </div>
  );
}
