import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CollegeCard from '@/components/CollegeCard';
import Pagination from '@/components/Pagination';
import { prisma } from '@/lib/prisma';
import { College } from '@/lib/types';

interface SearchParams {
  search?: string;
  location?: string;
  minFees?: string;
  maxFees?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1');
  
  const search = resolvedSearchParams.search || '';
  const location = resolvedSearchParams.location || '';
  const minFees = resolvedSearchParams.minFees ? parseInt(resolvedSearchParams.minFees) : undefined;
  const maxFees = resolvedSearchParams.maxFees ? parseInt(resolvedSearchParams.maxFees) : undefined;
  const limit = 10;
  const skip = (page - 1) * limit;

  let colleges: College[] = [];
  let pagination = { total: 0, page, limit, totalPages: 0 };
  let error = '';

  try {
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (minFees !== undefined || maxFees !== undefined) {
      where.fees = {};
      if (minFees !== undefined) where.fees.gte = minFees;
      if (maxFees !== undefined) where.fees.lte = maxFees;
    }

    const [fetchedColleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
      }),
      prisma.college.count({ where }),
    ]);

    colleges = fetchedColleges as unknown as College[];
    const totalPages = Math.ceil(total / limit);
    pagination = { total, page, limit, totalPages };
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
