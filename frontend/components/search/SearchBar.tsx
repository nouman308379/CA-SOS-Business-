'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
}

export function SearchBar({ initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Update query when initialQuery changes (e.g., from URL params)
  useEffect(() => {
    setQuery(initialQuery);
    setIsLoading(false); // Reset loading when query changes
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast('Please enter a business name to search', 'error');
      return;
    }

    setIsLoading(true);
    // Reset to page 1 when performing a new search
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}&page=1`);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
        <motion.div 
          className="relative flex-1"
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
            animate={isLoading ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            <Search className="h-5 w-5 text-gray-400" />
          </motion.div>
          <Input
            type="text"
            placeholder="Enter your business name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11 pr-4 h-12 sm:h-14 text-base sm:text-lg border-border rounded-xl transition-all shadow-md hover:shadow-lg bg-white/95 backdrop-blur-sm"
            style={{ 
              borderColor: '#a7f3d0',
            } as React.CSSProperties}
            onFocus={(e) => {
              e.target.style.borderColor = '#065F46';
              e.target.style.outline = 'none';
              e.target.style.boxShadow = '';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#a7f3d0';
              e.target.style.outline = 'none';
              e.target.style.boxShadow = '';
            }}
            disabled={isLoading}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()} 
            className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap border-0 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            style={{ 
              background: 'linear-gradient(to right, #065F46, #047857)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #047857, #065F46)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #065F46, #047857)';
            }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-1.5 sm:hidden" />
                <span className="hidden sm:inline">Search</span>
                <span className="sm:hidden">Go</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
}

