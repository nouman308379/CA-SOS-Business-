'use client';

import { motion } from 'framer-motion';
import { SearchResult } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, FileText } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  totalResults?: number;
  currentPage?: number;
}

export function SearchResults({ results, query, totalResults, currentPage = 1 }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700 text-lg font-medium mb-2">
          No businesses found matching &quot;{query}&quot;
        </p>
        <p className="text-gray-500 text-sm">
          Try a different search term or check your spelling.
        </p>
      </motion.div>
    );
  }

  const getStatusVariant = (status: string | null) => {
    if (!status) return 'secondary';
    if (status.toLowerCase().includes('active')) return 'success';
    if (status.toLowerCase().includes('terminated') || status.toLowerCase().includes('suspended')) return 'destructive';
    return 'secondary';
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="mb-6 pb-4 border-b"
        style={{ borderColor: '#a7f3d0' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#064E3B' }}>
          Search Results
        </h2>
        <div className="space-y-2">
          <p className="text-base" style={{ color: '#047857' }}>
            {totalResults !== undefined ? (
              <>
                Found <span className="font-bold text-xl" style={{ color: '#065F46' }}>{totalResults.toLocaleString()}</span> {totalResults === 1 ? 'result' : 'results'} for &quot;<span className="font-semibold" style={{ color: '#064E3B' }}>{query}</span>&quot;
              </>
            ) : (
              <>
                Found <span className="font-bold text-xl" style={{ color: '#065F46' }}>{results.length}</span> {results.length === 1 ? 'result' : 'results'} for &quot;<span className="font-semibold" style={{ color: '#064E3B' }}>{query}</span>&quot;
              </>
            )}
          </p>
          
          {/* Refinement Suggestion for Large Result Sets */}
          {totalResults !== undefined && totalResults > 100 && (
            <motion.div
              className="flex items-start gap-3 p-3 rounded-lg border"
              style={{ 
                backgroundColor: '#fef3c7',
                borderColor: '#fde68a'
              }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1" style={{ color: '#92400e' }}>
                  Too many results? Refine your search
                </p>
                <p className="text-xs" style={{ color: '#78350f' }}>
                  Try adding more specific terms to your search (e.g., &quot;{query} medical&quot; or &quot;{query} services&quot;) to find what you&apos;re looking for faster.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="grid gap-3 sm:gap-4">
        {results.map((result, index) => (
          <motion.div
            key={result.entity_number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.div
              className="bg-white rounded-xl border-2 p-4 sm:p-5 hover:shadow-lg overflow-hidden relative"
              style={{ borderColor: '#a7f3d0' }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(209, 250, 229, 0), rgba(209, 250, 229, 0.5), rgba(209, 250, 229, 0))' }}
                initial={false}
              />
              <div className="flex items-start justify-between gap-3 sm:gap-4 relative z-10">
                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm" style={{ background: 'linear-gradient(to bottom right, #d1fae5, #a7f3d0)' }}>
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#065F46' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 transition-colors line-clamp-2" style={{ color: '#064E3B' }}>
                        {result.entity_name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-mono bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-200">
                        Entity #: {result.entity_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm pl-13 sm:pl-16">
                    {result.entity_type && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
                        <FileText className="h-3.5 w-3.5 shrink-0" style={{ color: '#047857' }} />
                        <span className="font-medium" style={{ color: '#064E3B' }}>{result.entity_type}</span>
                      </div>
                    )}
                    {result.formation_date && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
                        <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: '#047857' }} />
                        <span style={{ color: '#047857' }}>Formed: <span className="font-semibold">{formatDate(result.formation_date)}</span></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-3">
                  {result.status && (
                    <Badge variant={getStatusVariant(result.status)} className="text-xs sm:text-sm px-4 py-2 font-semibold">
                      {result.status}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
