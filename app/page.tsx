import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CollegeCard from '@/components/CollegeCard';
import Pagination from '@/components/Pagination';
import { College } from '@/lib/types';

interface SearchParams {
  search?: string;
  location?: string;
  minFees?: string;
  maxFees?: string;
  page?: string;
}

interface PageProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1');
  
  const params = new URLSearchParams();
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.location) params.set('location', searchParams.location);
  if (searchParams.minFees) params.set('minFees', searchParams.minFees);
  if (searchParams.maxFees) params.set('maxFees', searchParams.maxFees);
  params.set('page', page.toString());

  let colleges: College[] = [];
  let pagination = { total: 0, page, limit: 10, totalPages: 0 };
  let error = '';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/colleges?${params.toString()}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    
    if (response.ok) {
      colleges = data.colleges;
      pagination = data.pagination;
    } else {
      error = data.error || 'Failed to fetch colleges';
    }
  } catch (err) {
    error = 'Failed to fetch colleges. Please try again later.';
    console.error(err);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Find Your Perfect College
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search, compare, and discover the best colleges for your future
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 mb-8">
          <SearchBar />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Results Info */}
        {colleges.length > 0 && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, pagination.total)} of {pagination.total} colleges
          </div>
        )}

        {/* College Cards Grid */}
        {colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {error ? 'Unable to load colleges' : 'No colleges found matching your criteria'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {colleges.length > 0 && (
          <Pagination currentPage={page} totalPages={pagination.totalPages} />
        )}
      </main>
    </div>
  );
}
