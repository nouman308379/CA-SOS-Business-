'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/toast';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchBar } from '@/components/search/SearchBar';
import { Pagination } from '@/components/search/Pagination';
import { SearchResult } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, Search as SearchIcon, Sparkles } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    hasMore: false,
  });

  useEffect(() => {
    if (!query) {
      setResults([]);
      setPagination({ page: 1, totalPages: 1, total: 0, hasMore: false });
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${currentPage}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to search');
        }

        const data = await response.json();
        setResults(data.results || []);
        setPagination(data.pagination || { 
          page: currentPage, 
          totalPages: 1, 
          total: 0,
          hasMore: false 
        });
        
        // Scroll to top when results change
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Only show toast if no results found
        if (data.results?.length === 0) {
          toast('No results found. Try a different search term.', 'info');
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred while searching. Please try again.';
        setError(errorMsg);
        toast(errorMsg, 'error');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage, toast]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0FDF4' }}>
      {/* Hero Section with Search */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-[#F0FDF4] to-emerald-100/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a7f3d012_1px,transparent_1px),linear-gradient(to_bottom,#a7f3d012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            {query && (
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#064E3B' }}>
                  Search Business Records
                </h1>
                <p className="text-sm sm:text-base" style={{ color: '#047857' }}>
                  Find and verify California business entities
                </p>
              </motion.div>
            )}

            {/* Search Bar */}
            <motion.div 
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SearchBar initialQuery={query} />
            </motion.div>

            {/* Quick Tips */}
            {!query && !isLoading && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-2" style={{ borderColor: '#a7f3d0', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#065F46' }} />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base" style={{ color: '#064E3B' }}>
                          Search Tips
                        </h3>
                        <ul className="space-y-1.5 text-xs sm:text-sm" style={{ color: '#047857' }}>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>Search by business name (partial matches work)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>Try different variations of the business name</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>Search is case-insensitive</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2" style={{ borderColor: '#a7f3d0' }}>
                <CardContent className="p-12 sm:p-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ 
                        border: '4px solid #d1fae5',
                        borderTopColor: '#065F46'
                      }}
                    />
                    <div>
                      <p className="font-semibold text-base sm:text-lg mb-1" style={{ color: '#064E3B' }}>
                        Searching...
                      </p>
                      <p className="text-sm" style={{ color: '#047857' }}>
                        Finding businesses matching &quot;{query}&quot;
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2" style={{ borderColor: '#fca5a5' }}>
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fee2e2' }}>
                      <AlertCircle className="h-7 w-7" style={{ color: '#dc2626' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-base sm:text-lg mb-2" style={{ color: '#dc2626' }}>
                        {error}
                      </p>
                      <p className="text-sm text-gray-600">
                        Please try again or contact support if the problem persists.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Results */}
          {!isLoading && !error && query && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SearchResults 
                results={results} 
                query={query} 
                totalResults={pagination.total}
                currentPage={pagination.page}
              />
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  totalResults={pagination.total}
                  onPageChange={handlePageChange}
                />
              )}
            </motion.div>
          )}

          {/* Empty State - No Query */}
          {!isLoading && !error && !query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2" style={{ borderColor: '#a7f3d0' }}>
                <CardContent className="p-12 sm:p-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ecfdf5' }}>
                      <SearchIcon className="h-8 w-8" style={{ color: '#065F46' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-base sm:text-lg mb-2" style={{ color: '#064E3B' }}>
                        Start Your Search
                      </p>
                      <p className="text-sm sm:text-base" style={{ color: '#047857' }}>
                        Enter a business name above to search our database of 9+ million records
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#065F46' }} />
          <p className="text-sm" style={{ color: '#047857' }}>Loading...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
