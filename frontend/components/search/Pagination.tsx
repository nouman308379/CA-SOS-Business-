'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults?: number;
}

export function Pagination({ currentPage, totalPages, onPageChange, totalResults }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const resultsPerPage = 25;
  const startResult = totalResults ? ((currentPage - 1) * resultsPerPage) + 1 : 0;
  const endResult = totalResults ? Math.min(currentPage * resultsPerPage, totalResults) : 0;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t" style={{ borderColor: '#a7f3d0' }}>
      {/* Results Info */}
      {totalResults !== undefined && totalResults > 0 && (
        <div className="text-sm" style={{ color: '#047857' }}>
          <span className="font-semibold" style={{ color: '#065F46' }}>
            {startResult.toLocaleString()}
          </span>
          {' - '}
          <span className="font-semibold" style={{ color: '#065F46' }}>
            {endResult.toLocaleString()}
          </span>
          {' of '}
          <span className="font-semibold" style={{ color: '#065F46' }}>
            {totalResults.toLocaleString()}
          </span>
          {' results'}
          {' '}
          <span className="text-xs ml-2" style={{ color: '#94a3b8' }}>
            (Page {currentPage} of {totalPages})
          </span>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          style={{
            borderColor: currentPage === 1 ? '#cbd5e1' : '#a7f3d0',
            color: currentPage === 1 ? '#94a3b8' : '#065F46',
            backgroundColor: 'transparent',
          }}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          style={{
            borderColor: currentPage === 1 ? '#cbd5e1' : '#a7f3d0',
            color: currentPage === 1 ? '#94a3b8' : '#065F46',
            backgroundColor: 'transparent',
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm"
                  style={{ color: '#94a3b8' }}
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <motion.button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`h-9 min-w-[36px] px-3 text-sm font-medium rounded-lg border transition-all ${
                  isActive ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: isActive ? '#065F46' : 'transparent',
                  borderColor: isActive ? '#065F46' : '#a7f3d0',
                  color: isActive ? 'white' : '#047857',
                }}
                whileHover={
                  !isActive
                    ? {
                        backgroundColor: '#ecfdf5',
                        borderColor: '#065F46',
                      }
                    : {}
                }
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {pageNum}
              </motion.button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 p-0 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          style={{
            borderColor: currentPage === totalPages ? '#cbd5e1' : '#a7f3d0',
            color: currentPage === totalPages ? '#94a3b8' : '#065F46',
            backgroundColor: 'transparent',
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 p-0 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          style={{
            borderColor: currentPage === totalPages ? '#cbd5e1' : '#a7f3d0',
            color: currentPage === totalPages ? '#94a3b8' : '#065F46',
            backgroundColor: 'transparent',
          }}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

